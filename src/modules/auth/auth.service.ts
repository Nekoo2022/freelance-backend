import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../core/prisma/prisma.service.js';
import { RedisService } from '../../core/redis/redis.service.js';
import { LoginInput } from './inputs/login.input.js';
import { CreateUserInput } from '../user/inputs/create-user.input.js';
import { AuthResponse } from './model/auth-response.model.js';
import { UserModel } from '../user/model/user.model.js';
import { User } from '../../../generated/prisma/client.js';

@Injectable()
export class AuthService {
  private readonly REFRESH_TOKEN_EXPIRATION = 60 * 60 * 24 * 7; // 7 days

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async login(input: LoginInput): Promise<AuthResponse> {
    const { email, password } = input;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if account is locked
    if (user.lockUntil && user.lockUntil > new Date()) {
      throw new UnauthorizedException('Account is temporarily locked');
    }

    // Check if account is active
    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Account is not active');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // Increment failed login attempts
      await this.handleFailedLogin(user.id);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Reset failed login attempts on successful login
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockUntil: null,
        online: true,
        lastSeenAt: new Date(),
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email);
    const userModel = this.mapToUserModel(user);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: userModel,
    };
  }

  async register(input: CreateUserInput): Promise<AuthResponse> {
    const { email, username, password, name } = input;

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email or username already exists',
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email);
    const userModel = this.mapToUserModel(user);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: userModel,
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      // Verify refresh token
      const payload = this.jwtService.verify<{ sub: string; email: string }>(
        refreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
        },
      );

      // Check if refresh token exists in Redis
      const storedToken = await this.redisService.get(
        `refresh_token:${payload.sub}`,
      );

      if (!storedToken || storedToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Get user
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || user.status !== 'ACTIVE') {
        throw new UnauthorizedException('User not found or inactive');
      }

      // Generate new tokens
      const tokens = await this.generateTokens(user.id, user.email);
      const userModel = this.mapToUserModel(user);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: userModel,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string): Promise<boolean> {
    // Remove refresh token from Redis
    await this.redisService.del(`refresh_token:${userId}`);

    // Update user online status
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        online: false,
        lastSeenAt: new Date(),
      },
    });

    return true;
  }

  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
      expiresIn: '7d',
    });

    // Store refresh token in Redis
    await this.redisService.setWithExpiration(
      `refresh_token:${userId}`,
      refreshToken,
      this.REFRESH_TOKEN_EXPIRATION,
    );

    return { accessToken, refreshToken };
  }

  private async handleFailedLogin(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return;

    const maxAttempts = 5;
    const lockTime = 60 * 60 * 1000; // 1 hour in milliseconds

    const newFailedAttempts = user.failedLoginAttempts + 1;

    if (newFailedAttempts >= maxAttempts) {
      // Lock account
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          failedLoginAttempts: newFailedAttempts,
          lockUntil: new Date(Date.now() + lockTime),
        },
      });
    } else {
      // Increment attempts
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          failedLoginAttempts: newFailedAttempts,
        },
      });
    }
  }

  private mapToUserModel(user: User): UserModel {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name || undefined,
      avatarUrl: user.avatarUrl || undefined,
      phoneNumber: user.phoneNumber || undefined,
      description: user.description || undefined,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      failedLoginAttempts: user.failedLoginAttempts,
      gigs: [],
      hiddenGigs: [],
      lockUntil: user.lockUntil || undefined,
      role: user.role,
      status: user.status,
      balance: user.balance,
      country: user.country || undefined,
      city: user.city || undefined,
      locale: user.locale || undefined,
      rating: user.rating,
      completedJobs: user.completedJobs,
      online: user.online,
      lastSeenAt: user.lastSeenAt || undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

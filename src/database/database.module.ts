import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from 'src/config/validation.schema';
import databaseConfig from 'src/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
        load: [databaseConfig], // Load only the database config
        validationSchema, // Use the Joi schema for validation
        envFilePath: ['.env'], // Use the environment file
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to use its services
      inject: [ConfigService], // Inject ConfigService to access env variables
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        synchronize: configService.get<string>('NODE_ENV') === 'development', // Enable synchronize in development only
      }),
    }),
  ],
})
export class DatabaseModule {}

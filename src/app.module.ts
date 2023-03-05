import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { TypeOrmConfigService } from './db/database';
import { UserModule } from './user/user.module';
import { REQUEST } from '@nestjs/core';
import { User } from './user/user.model';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: (options: { tenant: string }) => ({
        port: 5432,
        type: 'postgres',
        host: 'localhost',
        password: 'example',
        username: 'postgres',
        database: 'postgres',
        schema: options.tenant,
        entities: [User],
      }),
      inject: [REQUEST],
    }),
  ],
})
export class AppModule {}

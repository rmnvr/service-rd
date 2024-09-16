import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.la4he.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`),
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

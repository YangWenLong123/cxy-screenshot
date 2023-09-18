/*
 * @,@Author: ,: your name
 * @,@Date: ,: 2022-04-29 15:47:11
 * @LastEditTime: 2023-09-14 15:40:56
 * @LastEditors: along
 * @,@Description: ,: In User Settings Edit
 * @FilePath: /cook-puppeteer-to-images/src/module.ts
 */
import { Module } from '@nestjs/common';
import { AppController } from './controller/file.controller';
import { AppService } from './service/service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

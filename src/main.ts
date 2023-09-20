/*
 * @Author: along
 * @Date: 2022-04-28 10:28:25
 * @LastEditTime: 2023-09-20 09:04:01
 * @LastEditors: along
 * @Description: 入口文件
 * @FilePath: /cxy-screenshot/src/main.ts
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import { globalService } from './utils/global.service';
import { creatBrowser } from './utils/browser.server';
import * as cors from 'cors';

(async () => {
  const app = await NestFactory.create(AppModule);

  // # -----------------全局变量配置
  globalService.MAX_WSE = 2; //默认设置启动浏览器个数
  globalService.ENV = 43365; //默认端口配置(不在打包文件中运行，端口号手动修改)

  app.use(
    cors({
      // origin: ['http://www.alongweb.top'],
      // methods: ['GET', 'POST', 'PUT'],
    }),
  );
  await app.listen(process?.env?.PORT ?? globalService.ENV);

  new creatBrowser();
})();

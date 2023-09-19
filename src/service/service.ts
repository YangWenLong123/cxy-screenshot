/*
 * @Author: along
 * @Date: 2022-04-28 10:28:25
 * @LastEditTime: 2023-09-19 18:04:17
 * @LastEditors: along
 * @Description: 接口业务逻辑
 * @FilePath: /cxy-screenshot/src/service/service.ts
 */

import { Injectable } from '@nestjs/common';
const puppeteer = require('puppeteer');
import { Request, Response } from 'express';
import { globalService } from '../utils/global.service';

@Injectable()
export class AppService {
  async pdfHandler(req: Request, res: Response) {
    try {
      console.log('query', req.body);

      const tourl = req.body?.url;

      console.log('tourl', tourl);

      //从连接池里获取浏览器实例
      const tmp = Math.floor(Math.random() * globalService.MAX_WSE);
      const browserWSEndpoint = globalService.WSE_LIST[tmp];

      //连接浏览器
      const browser = await puppeteer.connect({ browserWSEndpoint });

      // 打开浏览器页面tab
      const page = await browser.newPage();

      //设置页面cookie
      // await page.setCookie({
      //   name: 'Authorization',
      //   value: token,
      //   domain: url,
      // });

      // 设置截图可视窗带下
      // await page.setViewport({ width, height });

      // 打开url地址
      await page.goto(tourl, {});

      if (req.body?.className) {
        await page.waitForSelector(`.${req.body?.className}`);
      }

      await page.waitForTimeout(500);

      // 开始截图
      const base64Str = await page.screenshot({
        type: 'webp',
        quality: 100,
        encoding: 'base64',
        fullPage: true,
      });

      // 返回给前端
      res.json({
        code: 200,
        data: `data:image/png;base64,${base64Str}`,
        msg: '生成成功',
      });

      // 关闭tab
      await page.close();
    } catch (error) {
      res.status(500).json({
        message: error.message,
        errors: error.stack,
      });
    }
  }
}

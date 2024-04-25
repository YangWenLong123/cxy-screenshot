/*
 * @Author: along
 * @Date: 2022-04-28 10:28:25
 * @LastEditTime: 2023-10-23 17:10:33
 * @LastEditors: along
 * @Description: 接口业务逻辑
 * @FilePath: /cxy-screenshot/src/service/service.ts
 */

import { Injectable } from '@nestjs/common';
const puppeteer = require('puppeteer');
import { Request, Response } from 'express';
import { globalService } from '../utils/global.service';

const Qs = require('qs');

@Injectable()
export class AppService {
  async pdfHandler(req: Request, res: Response) {
    try {
      console.log('query', req.query);
      console.log('body', req.body);

      const list = req.body?.list;

      const s = [];

      for (let key = 0; key < list.length; key++) {
        //从连接池里获取浏览器实例
        const tmp = Math.floor(Math.random() * globalService.MAX_WSE);
        const browserWSEndpoint = globalService.WSE_LIST[tmp];

        //连接浏览器
        const browser = await puppeteer.connect({ browserWSEndpoint });

        // 打开浏览器页面tab
        const page = await browser.newPage();

        const tourl = req.body?.url + '?title=' + list[key]; //打开页面url
        const fullPage = req.query?.fullPage ? req.query?.fullPage : true; //是否为滚动截图，默认true

        // 设置截图可视窗带下
        const viewport: any = {};
        if (req.query?.width) {
          viewport.width = req.query?.width;
        }
        if (req.query?.height) {
          viewport.height = req.query?.height;
        }

        if (Object.keys(viewport).length) await page.setViewport(viewport);

        // 打开url地址
        console.log('tourl', tourl);
        await page.goto(tourl);

        await page.waitForSelector(`.title`);

        // 开始截图
        const base64Str = await page.screenshot({
          type: 'webp',
          quality: 80,
          encoding: 'base64',
          fullPage: fullPage,
        });

        s.push(`data:image/png;base64,${base64Str}`);

        // 关闭tab
        await page.close();
      }

      // 返回给前端
      res.json({
        code: 200,
        data: s,
        msg: '生成成功',
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        errors: error.stack,
      });
    }
  }
}

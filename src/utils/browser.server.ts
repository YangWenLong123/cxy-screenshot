/*
 * @Author: along
 * @Description:
 * @Date: 2023-09-18 17:58:19
 * @LastEditors: along
 * @LastEditTime: 2023-09-18 17:59:53
 * @FilePath: /cxy-screenshot/src/utils/browser.server.ts
 */
import { globalService } from './global.service';
const puppeteer = require('puppeteer');

export class creatBrowser {
  constructor() {
    const WSE_LIST = []; //存储browserWSEndpoint列表
    let browserWSEndpoint = null; //浏览器对象
    (async () => {
      for (let i = 0; i < globalService.MAX_WSE; i++) {
        const browser = await puppeteer.launch({
          headless: true,
          args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process',
          ],
        });
        browserWSEndpoint = await browser.wsEndpoint();
        WSE_LIST[i] = browserWSEndpoint;
      }
      globalService.WSE_LIST = WSE_LIST;
      console.log('创建浏览器成功:' + WSE_LIST);
      console.log('端口号:' + globalService.ENV);
    })();
  }
}

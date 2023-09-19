/*
 * @Author: along
 * @Date: 2022-04-28 10:28:25
 * @LastEditTime: 2023-09-19 18:00:30
 * @LastEditors: along
 * @Description: 控制器，路由
 * @FilePath: /cxy-screenshot/src/controller/file.controller.ts
 */

import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from '../service/service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('screenshot')
  pdfHandler(@Req() request: Request, @Res() response: Response) {
    return this.appService.pdfHandler(request, response);
  }
}

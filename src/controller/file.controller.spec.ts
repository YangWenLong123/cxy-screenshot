/*
 * @Author: along
 * @Date: 2022-04-28 10:28:25
 * @LastEditTime: 2022-04-28 10:45:57
 * @LastEditors: along
 * @Description: test
 * @FilePath: /edc_pdf_generator/src/filecontroller/app.controller.spec.ts
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './file.controller';
import { AppService } from '../service/service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

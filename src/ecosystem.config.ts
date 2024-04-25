/*
 * @Author: along
 * @Description:
 * @Date: 2023-03-31 11:05:33
 * @LastEditors: along
 * @LastEditTime: 2023-10-23 17:08:47
 * @FilePath: /cxy-screenshot/src/ecosystem.config.ts
 */
module.exports = {
  apps: [
    {
      name: 'Cxy.screenshot', //项目名称
      script: './main.js', //入口文件
      watch: true,
      instances: 4, //分配到4个cpu上 取决于cpu数量 可设置max,所有cpu
      exec_mode: 'cluster', //个实例之间进行负载平衡
      max_memory_restart: '30720M', //堆内存30G自动重启，不会中断服务，已测试
      env: {
        //dev环境
        PORT: 43367,
        NODE_ENV: 'dev',
      },
      env_test: {
        //测试环境
        PORT: 43367,
        NODE_ENV: 'test',
      },
      env_uat: {
        //uat环境
        PORT: 43367,
        NODE_ENV: 'uat',
      },
      env_prod: {
        //生产环境
        PORT: 43367,
        NODE_ENV: 'prod',
      },
    },
  ],
};

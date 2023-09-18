# cxy-screenshot

一个 demo，提供一个截图服务，基于 puppeteer 生成屏幕快照

## 安装

```bash
pnpm i
```

## 本地运行

```bash
pnpm dev
```

## 打包

```bash
pnpm build
```

## 服务器运行 dist/

```bash
# development
pm2 start ecosystem.config.js --env dev

#test
pm2 start ecosystem.config.js --env test

#uat
pm2 start ecosystem.config.js --env uat

#production
pm2 start ecosystem.config.js --env prod
```

## 教程

```bash
api地址：http://service.alongweb.top:43367/screenshot
参数(query): url 页面地址 path 页面路由 hash 是否是hash token token数据，需要在页面处理免登录 
```

例:http://service.alongweb.top:43367/screenshot?url=http://www.alongweb.top


# HaHow 專案

## 說明
此專案需要從HaHow提供的API抓取資料，將其整進行整理，產生新的API。

最基本的功能為抓取創建API。

如果cache裡面沒有資料，會接跟DB拿取資料。
如果DB沒有資料，則會使用預設的資料。
每30分鐘，修改一次DB的資料。

## 如何啟動
```
npm install
node index.js
```

## test
```
npm test
```

## 未來功能
* 加入docker
* 新增偽API資料
* 加入DB，NoSQL，如果API沒有提供資料，可以拿取上一筆Hero Data。

## 好想要玩
專案有很多的英雄，不來一點互相傷害怎麼說得過去！！
* socket
* canvas

## 使用工具
* express
* linter
* node-fetch
* express-rate-limit
* node-cache
* node-cron
* dotenv
* mongoDB
* mocha / chai / http-chai

**專案版本: 1.7**
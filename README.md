# HaHow 專案

## 說明
這是一個小專案，此專案的需要從HaHow的API抓取資料，然後用裡面的資料製作做一個API，讓使用可以透過此專案的API抓取HaHow API的資料。

最基本的功能為抓取創建API。

目前會儲存最新的API資料，如果cache裡面沒有資料，會接跟DB拿取資料。
如果DB沒有資料，則會使用預設的資料。

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
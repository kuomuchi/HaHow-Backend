# HaHow 專案

## 說明
此專案需要從HaHow提供的API抓取資料，將其整進行整理，產生新的API。

最基本的功能為抓取創建API。

如果cache裡面沒有資料，會接跟DB拿取資料。

要是DB沒有資料，則會使用預設的資料。

預設的資料在放在[這裡](./util/hero_default_data.js)

```
~ /util/hero_default_data.js
```

server啟動後每30分鐘，修改一次DB的資料。





## 如何啟動
先把這份專案給clone下來
```
git clone https://github.com/kuomuchi/HaHow-Backend.git
```
接下來需要新增一個 .evn 檔案。
複製一份「.env_template」
將檔名改成「.env」

此專案有使用到MongoDB

.env 內部格式：
```
mongodbURL: <MongoDB 連線url>
mongodbDatabases: <MongoDB Databases>
mongodbTestDatabaese = "test" <MongoDB 測試用的 databases>
port = "3000" <目前3000>
```

接下來就可以開始跑這個專案

```
npm install   // 安裝套件
node index.js // 執行 index.js
```

## test
使用的工具是 mocha
測試過程會將mongoDB的 collection 清除，這有相當的危險性。 怕爆.jpg
在測試之前，到「package.json」裡：
「mongodbDatabases」預設是 test，可以將其換成前面設定 「mongodbTestDatabaese」設置的 databases。
確保在測試過程當中，使用的Databases是 測試用的 databases。

```
// 預設是test
"scripts": {
    "test": "mongodbDatabases='test' mocha"
}
```

準備好之後，就可以開始跑測試了。

```
npm test
```


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
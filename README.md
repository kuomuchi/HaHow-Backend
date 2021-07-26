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
抓到HaHow的資料後，會直接存到Cache與DB裡面。

用戶請求API時，優先與Cache互動。

![api_image](https://user-images.githubusercontent.com/42135910/126902609-26d5305f-8fdf-426c-8344-4c15542cacc6.gif)


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
* socket io

**專案版本: 1.8**


**超過時間の本版;D，預計一段時間後才會margin到main**

*****

## 額外的socket io
好想要玩socket.io！

目前從Hahow call 存取了一些資料，這些英雄不分DC、Marvel。

一直以來都想要做一個多人小遊戲，不久前知道了socket.io room，針對特定的房間發送訊息，聽起來很酷。

所以就想要試試看，使用socket.io room 做一個即時多人遊戲。

「主體遊戲是一個 1v1 下指令的遊戲」，「回合制」或是「即時」有待確認。

目前一共有3個頁面:
- home page (選擇角色)
- room page (選擇房間)
- fight page (互相傷害)

頁面順序如下：
```
home page -> room page -> fight page -> room page
```

## 額外的socket io到底在幹嘛？
front end:
1. 進入`home page`選擇角色，將資料存入LocalStorage後，進入`room page`。
2. 在`room page`可以選擇房間進入，點擊「加入」傳送請求到`server`，回傳值為 true 則跳轉 `fight page`，
3. 進入`fight room`發送請求給`server`....<正在做遊戲本體 orz>


socket io:
- 收到來自「room」的請求: 
  - 確認此user id 是否重複加入，房間空間是否足夠。
  - 沒問題回傳 true，否則 err msg
- 收到來自「fight」的請求:
  - 確認 user 身份:
  - 身份確認，將其加入 socket io 的 room。

## 額外的socket io 後續..
- [x] 加入房間
- [ ] 遊戲本體
- [ ] 流量限制
- [ ] 測試 ;D

*****

好像還有docker要先架上去... 誒嘿:D
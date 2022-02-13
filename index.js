const express = require('express');  // expressを利用することを定義
const app = express();               // expressをappと定義

const mysql = require('mysql');      // 今回はMySQLを利用する
const connection = mysql.createConnection({  // 以下、各自のMySQLへの接続情報を書く
  host     : 'localhost',
  user     : 'ユーザーＩＤ',
  password : 'パスワード',
  database : 'データベース名'
});

app.get('/', function (req, res) {                 // app.get...(expressの構文)、req=request。 res=response
  res.set({ 'Access-Control-Allow-Origin': '*' }); // この記載により、※1：CORSを許可する
  connection.query('select *,DATE_FORMAT(IssueDate,"%Y-%m-%d") AS GDATE from booklog', function (error, results) { // booklogテーブルから全てのカラムを取得する
    if (error) throw error;                        // エラー処理
    res.send(results);                             // results[0]により、一番目のデータを返答する
  });
});

app.listen(5000, function () { // port 5000をlistenする
  console.log('Example app listening on port 5000!'); // console.logによりファイル実行時にコンソールに文字表示させる
});
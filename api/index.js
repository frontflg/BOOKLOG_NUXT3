const express = require('express'); // expressを利用することを定義
const app = express();              // expressをappと定義
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mysql = require('mysql');     // 今回はMySQLを利用する
const connection = mysql.createConnection({  // 以下、各自のMySQLへの接続情報を書く
  host     : 'localhost',
  user     : '(ユーザＩＤ)',
  password : '(パスワード)',
  database : '(データベース名)'
});

app.get('/', function (req, res) { // app.get...(expressの構文)、req=request。 res=response
  res.set({ 'Access-Control-Allow-Origin': '*' }); // この記載により、※1：CORSを許可する
  connection.query('select *,DATE_FORMAT(IssueDate,"%Y-%m-%d") AS GDATE,ROW_NUMBER() OVER (ORDER BY ISBN13) AS line from booklog', function (error, results) { // booklogテーブルから全てのカラムを取得する
    if (error) throw error; // エラー処理
    res.send(results);      // resultsにより、検索データを返答する
  });
});

app.get('/search', function (req, res) { // app.get...(expressの構文)、req=request。 res=response
  const id = req.query.id;
  console.log('SEARCH ID' + id);
  res.set({ 'Access-Control-Allow-Origin': '*' }); // この記載により、※1：CORSを許可する
  connection.query('select * from booklog where ISBN13 = ?', id, function (error, results) { // booklogテーブルから指定のカラムを取得する
    if (error) throw error; // エラー処理
    res.send(results);      // results[0]により、一番目のデータを返答する
  });
});

app.get('/insert', function (req, res) { // app.get...(expressの構文)、req=request。 res=response
  const id = req.query.id;
  console.log('INSERT ID' + id);
  res.set({ 'Access-Control-Allow-Origin': '*' }); // この記載により、※1：CORSを許可する
  connection.query('insert into booklog (ISBN13,BookName) values (?,"書名を入力")', id, function (error, results) { // booklogテーブルから指定の行を追加する
    if (error) {
      throw error; // エラー処理
    } else {
      res.status(200).send();
    }
  });
});

app.get('/delete', function (req, res) { // app.get...(expressの構文)、req=request。 res=response
  const id = req.query.id;
  console.log('DELETE ID=' + id);
  res.set({ 'Access-Control-Allow-Origin': '*' }); // この記載により、※1：CORSを許可する
  connection.query('delete from booklog where ISBN13 = ?', id, function (error, results) { // booklogテーブルから指定の行を削除取得する
    if (error) {
      throw error; // エラー処理
    } else {
      res.status(200).send();
    }
  });
});

app.post('/update', function (req, res) { // app.post...(expressの構文)、req=request。 res=response
  const isbn13    = req.body.ISBN13;
  if (isbn13.trim().length > 13) {
    console.log('UPDATE ID FAILER:' + isbn13);
    throw error; // エラー処理
  }
  const isbn10    = req.body.ISBN10;
  const bookName  = req.body.BookName;
  const author    = req.body.Author;
  const publisher = req.body.Publisher;
  const genre     = req.body.Genre;
  let issueDate = '0000/00/00';
  if (req.body.IssueDate !== '') {
    issueDate = req.body.IssueDate;
  }
  let getDate = '0000/00/00';
  if (req.body.GetDate !== '') {
    getDate = req.body.GetDate;
  }
  let readDate = '0000/00/00';
  if (req.body.ReadDate !== '') {
    readDate = req.body.ReadDate;
  }
  const ownership = req.body.Ownership;
  const purchase  = req.body.Purchase;
  const library   = req.body.Library;
  const overview  = req.body.Overview;
  const impress   = req.body.Impressions;
  const state     = req.body.State;
  const coverImg  = req.body.CoverImg;
  const sql = 'UPDATE booklog SET ISBN10 = ?, BookName = ?, Author = ?, Publisher = ?, Genre = ?,' +
              ' IssueDate = ?,GetDate = ?, ReadDate = ?, Ownership = ?, Purchase = ?, Library = ?,' +
              ' Overview  = ?, Impressions = ?, State = ?, CoverImg = ? where ISBN13 = ?';
  res.set({ 'Access-Control-Allow-Origin': '*' }); // この記載により、※1：CORSを許可する
  connection.query(sql,[isbn10, bookName, author, publisher, genre, issueDate, getDate, readDate,
                ownership, purchase, library, overview, impress, state, coverImg, isbn13],
                function (error, results) { // booklogテーブルから指定の行を削除取得する
    if (error) {
      throw error; // エラー処理
    } else {
      res.status(200).send();
    }
  });
});

app.listen(5000, function () { // port 5000をlistenする
  console.log('Example app listening on port 5000!'); // console.logによりファイル実行時にコンソールに文字表示させる
});

<template>
  <p class="mb-10">読書履歴（{{ book.isbn13 }}）&nbsp;&nbsp;
    <v-btn @click="refresh">再読込</v-btn>&nbsp;&nbsp;
    <v-btn nuxt :to="`../${book.isbn13}`" color="secondary">戻る</v-btn>&nbsp;&nbsp;
    <v-btn v-on:click="updBook" color="error">変更</v-btn>
  </p>
  <table width="1000">
    <tr><th width="75">ISBN13</th><td width="425">&nbsp;{{ book.isbn13 }}</td><th width="500">変更入力</th></tr>
    <tr><th>ISBN10</th><td>&nbsp;{{ book.isbn10 }}</td>
        <td><input type="text" v-model="inp.isbn10" maxlength="10" /></td></tr>
    <tr><th>書　名</th><td>&nbsp;{{ book.bookname }}</td>
        <td><input type="text" v-model="inp.bookname" maxlength="50" size="50" /></td></tr>
    <tr><th>著　者</th><td>&nbsp;{{ book.author }}</td>
        <td><input type="text" v-model="inp.author" maxlength="25" size="40" /></td></tr>
    <tr><th>出版社</th><td>&nbsp;{{ book.publisher }}</td>
        <td><input type="text" v-model="inp.publisher" maxlength="25" size="25" /></td></tr>
    <tr><th>分　類</th><td>&nbsp;{{ book.genre }}</td>
        <td><input type="text" v-model="inp.genre" maxlength="25" size="25" /></td></tr>
    <tr><th>発行日</th><td><div v-if="book.issuedate !== null">&nbsp;{{ book.issuedate.slice(0,10) }}</div></td>
        <td><input type="date" v-model="inp.issuedate" /></td></tr>
    <tr><th>取得日</th><td><div v-if="book.getdate !== null">&nbsp;{{ book.getdate.slice(0,10) }}</div></td>
        <td><input type="date" v-model="inp.getdate" /></td></tr>
    <tr><th>読了日</th><td><div v-if="book.readdate !== null">&nbsp;{{ book.readdate.slice(0,10) }}</div></td>
        <td><input type="date" v-model="inp.readdate" /></td></tr>
    <tr><th>所　有</th><td><div v-if="book.ownership == '1'">&nbsp;所有</div></td>
        <td><select v-model="inp.ownership">
              <option value=0 >非所有</option>
              <option value=1 >所有</option>
            </select></td></tr>
    <tr><th>価　格</th><td><div v-if="book.purchase == 0">&nbsp;図書館</div><div v-if="book.purchase !== 0">&nbsp;\{{ book.purchase }}-</div></td>
        <td><input type="number" v-model="inp.purchase" /></td></tr>
    <tr><th>取得元</th><td>&nbsp;{{ book.library }}</td>
        <td><input type="text" v-model="inp.library" maxlength="25" size="25" /></td></tr>
    <tr><th>概　要</th><td>&nbsp;{{ book.overview }}</td>
        <td><textarea v-model="inp.overview" rows="3" cols="52" maxlength="255" /></td></tr>
    <tr><th>感　想</th><td>&nbsp;{{ book.impressions }}</td>
        <td><input type="text" v-model="inp.impressions" size="50" /></td></tr>
    <tr><th>状　態</th><td>&nbsp;{{ book.state }}</td>
        <td><input type="text" v-model="inp.state" maxlength="10" size="10" /></td></tr>
  </table>
</template>

<script setup>
  const route = useRoute();
  const id = route.params.id;
  const { data: book, refresh } = useLazyFetch('/api/booklog', {
    method: 'POST',
    body: { mode: 'find', isbn13: id },
  });
  const inp = ({
    isbn10:      '',
    bookname:    '',
    author:      '',
    publisher:   '',
    genre:       '',
    issuedate:   '',
    getdate:     '',
    readdate:    '',
    ownership:   '',
    purchase:    '',
    library:     '',
    overview:    '',
    impressions: '',
    state:       '',
  });
  if (book.value !== null ) {
    inp.isbn10      = book.value.isbn10;
    inp.bookname    = book.value.bookname;
    inp.author      = book.value.author;
    inp.publisher   = book.value.publisher;
    inp.genre       = book.value.genre;
    inp.issuedate   = book.value.issuedate.slice(0,10);
    inp.getdate     = book.value.getdate.slice(0,10);
    inp.readdate    = book.value.readdate.slice(0,10);
    inp.ownership   = book.value.ownership;
    inp.purchase    = book.value.purchase;
    inp.library     = book.value.library;
    inp.overview    = book.value.overview;
    inp.impressions = book.value.impressions;
    inp.state       = book.value.state;
    inp.coverimg    = book.value.coverimg;
  }
  const updBook = () => {
    const result = window.confirm('更新しますか？：' + id);
    if( result ) {
      const date_issuedate = new Date(inp.value.issuedate);
      const date_getdate   = new Date(inp.value.getdate);
      const date_readdate  = new Date(inp.value.readdate);
      const data = useFetch('/api/booklog', {
        method: 'PUT',          // ※PUT であることに注意
        body: {
          mode:        'update',
          targetId:    id,
          isbn10:      inp.value.isbn10,
          genre:       inp.value.genre,
          bookname:    inp.value.bookname,
          author:      inp.value.author,
          publisher:   inp.value.publisher,
          state:       inp.value.state,
          issuedate:   date_issuedate,
          getdate:     date_getdate,
          readdate:    date_readdate,
          ownership:   parseInt(inp.value.ownership),
          purchase:    parseInt(inp.value.purchase),
          library:     inp.value.library,
          overview:    inp.value.overview,
          impressions: inp.value.impressions
        },
      })
      alert('更新されました：' + id);
      router.push('/booklog');
    }
  };
</script>

<style>
  th{ color:#fff; background:#005ab3; position:sticky; top:0; }
  table tr:nth-child(odd){ background:#e6f2ff; }
  tbody { overflow-x: hidden; overflow-y: scroll; height: 100px; }
  input { border:none; outline: none; padding: 0 0 0 10px; }
  textarea { border:none; outline: none; padding: 0 0 0 10px; }
  select { border:none; outline: none; padding: 0 0 0 10px; }
</style>

<template>
  <p class="mb-10">読書履歴（{{ book.isbn13 }}）&nbsp;&nbsp;
    <v-btn nuxt :to="`update/${book.isbn13}`" color="primary">変更</v-btn>&nbsp;&nbsp;
    <v-btn v-on:click="delBook" color="error">削除</v-btn></p>
  <table>
    <tr><th width="75">ISBN13</th><td width="600">&nbsp;{{ book.isbn13 }}</td><th width="300">表　紙</th></tr>
    <tr><th>ISBN10</th><td>&nbsp;{{ book.isbn10 }}</td>
        <td rowspan="14" align="center"><v-img max-height="500" max-width="300" :src="`https://images-fe.ssl-images-amazon.com/images/P/${book.isbn10}.09.LZZZZZZZ`" /></td></tr>
    <tr><th>書　名</th><td>&nbsp;{{ book.bookname }}</td></tr>
    <tr><th>著　者</th><td>&nbsp;{{ book.author }}</td></tr>
    <tr><th>出版社</th><td>&nbsp;{{ book.publisher }}</td></tr>
    <tr><th>分　類</th><td>&nbsp;{{ book.genre }}</td></tr>
    <tr><th>発行日</th><td><div v-if="book.issuedate !== null">&nbsp;{{ book.issuedate.slice(0,10) }}</div></td></tr>
    <tr><th>取得日</th><td><div v-if="book.getdate !== null">&nbsp;{{ book.getdate.slice(0,10) }}</div></td></tr>
    <tr><th>読了日</th><td><div v-if="book.readdate !== null">&nbsp;{{ book.readdate.slice(0,10) }}</div></td></tr>
    <tr><th>所　有</th><td><div v-if="book.ownership == '1'">&nbsp;所有</div></td></tr>
    <tr><th>価　格</th><td><div v-if="book.purchase == 0">&nbsp;図書館</div><div v-if="book.purchase !== 0">&nbsp;\{{ book.purchase }}-</div></td></tr>
    <tr><th>取得元</th><td>&nbsp;{{ book.library }}</td></tr>
    <tr><th>概　要</th><td>&nbsp;{{ book.overview }}</td></tr>
    <tr><th>感　想</th><td>&nbsp;{{ book.impressions }}</td></tr>
    <tr><th>状　態</th><td>&nbsp;{{ book.state }}</td></tr>
  </table>
</template>

<script setup>
  const route = useRoute();
  const id = route.params.id;
  const { data: book, refresh } = useLazyFetch('/api/booklog', {
    method: 'POST',
    body: { mode: 'find', isbn13: id },
  });
  const delBook = () => {
    const result = window.confirm('削除しますか？：' + id);
    if( result ) {
      const data = useFetch('../booklog', {
        method: 'DELETE',
        body: { mode: 'delete', targetId: id },
      })
      alert('削除されました：' + id);
      router.push('/booklog');
    }
  };
</script>

<style>
  th{ color:#fff; background:#005ab3; position:sticky; top:0; }
  table tr:nth-child(odd){ background:#e6f2ff; }
  tbody { overflow-x: hidden; overflow-y: scroll; height: 100px; }
</style>

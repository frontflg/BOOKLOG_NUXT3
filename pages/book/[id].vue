<template>
  <v-app>
    <p class="mb-10">読書履歴（{{ books.isbn13 }}）</p>
    <table>
      <tr><th width="75">ISBN13</th><td width="600">&nbsp;{{ books.isbn13 }}</td><th width="300">表　紙</th></tr>
      <tr><th>ISBN10</th><td>&nbsp;{{ books.isbn10 }}</td>
          <td rowspan="14" align="center"><v-img max-height="500" max-width="300" :src="`https://images-fe.ssl-images-amazon.com/images/P/${books.isbn10}.09.LZZZZZZZ`" /></td></tr>
      <tr><th>書　名</th><td>&nbsp;{{ books.bookname }}</td></tr>
      <tr><th>著　者</th><td>&nbsp;{{ books.author }}</td></tr>
      <tr><th>出版社</th><td>&nbsp;{{ books.publisher }}</td></tr>
      <tr><th>分　類</th><td>&nbsp;{{ books.genre }}</td></tr>
      <tr><th>発行日</th><td><div v-if="books.issuedate !== null">&nbsp;{{ books.issuedate.slice(0,10) }}</div></td></tr>
      <tr><th>取得日</th><td><div v-if="books.getdate !== null">&nbsp;{{ books.getdate.slice(0,10) }}</div></td></tr>
      <tr><th>読了日</th><td><div v-if="books.readdate !== null">&nbsp;{{ books.readdate.slice(0,10) }}</div></td></tr>
      <tr><th>所　有</th><td><div v-if="books.ownership == '1'">&nbsp;所有</div></td></tr>
      <tr><th>価　格</th><td><div v-if="books.purchase == 0">&nbsp;図書館</div><div v-if="books.purchase !== 0">&nbsp;\{{ books.purchase }}-</div></td></tr>
      <tr><th>取得元</th><td>&nbsp;{{ books.library }}</td></tr>
      <tr><th>概　要</th><td>&nbsp;{{ books.overview }}</td></tr>
      <tr><th>感　想</th><td>&nbsp;{{ books.impressions }}</td></tr>
      <tr><th>状　態</th><td>&nbsp;{{ books.state }}</td></tr>
    </table>
  </v-app>
</template>

<script setup>
  const route = useRoute();
  const id = route.params.id;
  const book = ref('');
  const { data: books, refresh } = useFetch('/api/booklog', {
    method: 'POST',
    body: { mode: 'find', isbn13: id },
  });
</script>

<style>
  th{ color:#fff; background:#005ab3; position:sticky; top:0; }
  table tr:nth-child(odd){ background:#e6f2ff; }
</style>

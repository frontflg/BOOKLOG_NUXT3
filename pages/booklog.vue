<template>
  <v-app>
    <p class="mb-10">読書履歴</p>
    <table>
      <thead>
        <tr>
          <th width= "26px">No.</th>
          <th width="131px">ISBN13</th>
          <th width="361px" align="left">書籍名</th>
          <th width="221px" align="left">著者</th>
          <th width="151px" align="left">出版社</th>
          <th width="81px"  align="left">価格</th>
          <th width="151px" align="left">分類</th>
          <th width="111px" align="left">発行日</th>
        </tr></thead>
      <tbody>
        <tr v-for="(book,i) in books" :key="book.isbn13">
          <td width= "25px" align="right">{{ i + 1 }}　</td>
          <td width="130px">{{ book.isbn13 }}　</td>
          <td width="360px">{{ book.bookname }}</td>
          <td width="220px">{{ book.author }}</td>
          <td width="150px">{{ book.publisher }}</td>
          <td v-if="book.purchase > 0" width= "60px">\{{ book.purchase }}-</td>
          <td v-if="book.purchase == 0" width= "60px">図書館</td>
          <td v-if="book.purchase == null" width= "60px">　</td>
          <td>{{ book.genre }}</td>
          <td v-if="book.getdate !== null" width="110px">{{ book.getdate.slice(0,10) }}</td>
          <td v-if="book.getdate == null" width="110px">　</td>
        </tr>
      </tbody>
    </table>
  </v-app>
</template>

<script setup>
  const book = ref('');
  const { data: books, refresh } = useFetch('/api/booklog');
</script>

<style>
  th{ color:#fff; background:#005ab3; }
  table tr:nth-child(odd){ background:#e6f2ff; }
</style>

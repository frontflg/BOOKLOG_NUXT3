<template>
  <p class="mb-5">読書履歴</p>
  <div style="height:480px; overflow-y:scroll;">
    <table>
      <thead>
        <tr>
          <th width= "26px">No.</th>
          <th width="131px">&nbsp;ISBN13</th>
          <th width="361px" align="left">書籍名</th>
          <th width="221px" align="left">著者</th>
          <th width="151px" align="left">出版社</th>
          <th width="81px">&nbsp;価格</th>
          <th width="151px" align="left">分類</th>
          <th width="126px" align="left">&nbsp;発行日</th>
        </tr></thead>
      <tbody>
        <tr v-for="(book,i) in books" :key="book.isbn13">
          <td align="right">{{ i + 1 }}&nbsp;</td>
          <td><NuxtLink event="" :to="`/book/${book.isbn13}`" @click.native="onClick">&nbsp;{{ book.isbn13 }}</NuxtLink>&nbsp;</td>
          <td>{{ book.bookname }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.publisher }}</td>
          <td v-if="book.purchase > 0" align="right">\{{ book.purchase }}-&nbsp;</td>
          <td v-if="book.purchase == 0">&nbsp;図書館</td>
          <td v-if="book.purchase == null">&nbsp;</td>
          <td>{{ book.genre }}</td>
          <td v-if="book.issuedate !== null">&nbsp;{{ book.issuedate.slice(0,10) }}</td>
          <td v-if="book.issuedate == null">&nbsp;</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  const book = ref('');
  const { data: books, refresh } = useFetch('/api/booklog');
</script>

<style>
  th{ color:#fff; background:#005ab3; position:sticky; top:0; }
  table tr:nth-child(odd){ background:#e6f2ff; }
  tbody { overflow-x: hidden; overflow-y: scroll; height: 100px; }
</style>

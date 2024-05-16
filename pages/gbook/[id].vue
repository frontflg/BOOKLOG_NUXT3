<template>
  <form>
    <div class="d-flex flex-row">
      <p class="mb-5">書籍検索：&nbsp;{{ skey }}&nbsp;&nbsp;&nbsp;
        <v-btn nuxt :to="`../booklog`" color="secondary">戻る</v-btn>
      </p>
      <p>&nbsp;&nbsp;&nbsp;</p>
      <p align="right">AMAZON検索&nbsp;&nbsp;
        <input v-model="AZkey" size="30">&nbsp;
        <v-btn @click="redirectToPage" color="secondary">検索</v-btn>
      </p>
    </div>
  </form>
  <div style="height:480px; overflow-y:scroll;">
    <table>
      <thead>
        <tr>
          <th width= "26px">No.</th>
          <th width="131px">&nbsp;ISBN13</th>
          <th width="361px" align="left">&nbsp;書籍名</th>
          <th width="221px" align="left">&nbsp;著者</th>
          <th width="151px" align="left">&nbsp;出版社</th>
          <th width="81px">&nbsp;価格</th>
          <th width="151px" align="left">&nbsp;分類</th>
          <th width="126px" align="left">&nbsp;発行日</th>
        </tr>
        </thead>
      <tbody>
        <tr v-for="(book,i) in books.items" :key="books.items.id">
          <td align="right">{{ i + 1 }}&nbsp;</td>
          <template v-if="book.volumeInfo.industryIdentifiers">
            <template v-if="book.volumeInfo.industryIdentifiers[0].type==='ISBN_10'">
              <td>&nbsp;<a :href="`/gbook/insbook/${book.volumeInfo.industryIdentifiers[1].identifier}`">{{ book.volumeInfo.industryIdentifiers[1].identifier.slice(0,13) }}</a>&nbsp;</td>
            </template>
            <template v-else>
              <template v-if="book.volumeInfo.industryIdentifiers[0].type==='ISBN_13'">
                <td>&nbsp;<a :href="`/gbook/insbook/${book.volumeInfo.industryIdentifiers[0].identifier}`">{{ book.volumeInfo.industryIdentifiers[0].identifier.slice(0,13) }}</a>&nbsp;</td>
              </template>
              <template v-else>
                <td></td>
              </template>
            </template>
          </template>
          <template v-else>
            <td></td>
          </template>
          <td>{{ book.volumeInfo.title }}</td>
          <template v-if="book.volumeInfo.authors">
            <td>{{ book.volumeInfo.authors[0] }}&nbsp;
                {{ book.volumeInfo.authors[1] }}&nbsp;
                {{ book.volumeInfo.authors[2] }}
            </td>
          </template>
          <template v-else>
            <td></td>
          </template>
          <td>{{ book.volumeInfo.publisher }}</td>
          <template v-if="book.saleInfo.listPrice">
            <template v-if="book.saleInfo.listPrice.amount">
              <td>￥{{ book.saleInfo.listPrice.amount }}－</td>
            </template>
            <template v-else>
              <td></td>
            </template>
          </template>
          <template v-else>
            <td></td>
          </template>
          <template v-if="book.volumeInfo.categories">
            <td>{{ book.volumeInfo.categories[0] }}</td>
          </template>
          <template v-else>
            <td></td>
          </template>
          <td>{{ book.volumeInfo.publishedDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  const book = ref('');
  const AZkey = ref('');
  const route = useRoute();
  const skey = ref(route.params.id);
  const url = "https://www.googleapis.com/books/v1/volumes?&maxResults=20&q=intitle:" + route.params.id;
  const { data: books, refresh } = await useFetch(url);
  const redirectToPage = () => {
    const AZurl = 'https://www.amazon.co.jp/s?i=stripbooks&k=' + AZkey;
    window.open(AZurl, '_blank')
  };
</script>

<style>
  th{ color:#fff; background:#005ab3; position:sticky; top:0; }
  table tr:nth-child(odd){ background:#e6f2ff; }
  tbody { overflow-x: hidden; overflow-y: scroll; height: 100px; }
  input { outline: solid 2px #005ab3; }
</style>

<template>
  <div style="height:480px;">
    <p class="mb-10">書籍登録&nbsp;&nbsp;
      <v-btn nuxt :to="`../../booklog`" color="secondary">戻る</v-btn>&nbsp;&nbsp;
      <v-btn v-on:click="inpBook" color="warning">登録</v-btn>
    </p>
    <form>
    <table>
      <tr>
        <th width="70px">&nbsp;ISBN13</th>
        <td colspan="3">&nbsp;{{ id }}</td>
        <th width="70px">&nbsp;ISBN10</th>
        <template v-if="book.items[0].volumeInfo.industryIdentifiers[0].type==='ISBN_10'">
          <td>&nbsp;{{ book.items[0].volumeInfo.industryIdentifiers[0].identifier }}
          </td>
        </template>
        <template v-else>
          <td>&nbsp;{{ book.items[0].volumeInfo.industryIdentifiers[1].identifier.slice(0,10) }}
          </td>
        </template>
        <th>表　紙</th>
      </tr>
      <tr>
        <th>書籍名</th>
        <td colspan="5">&nbsp;{{ book.items[0].volumeInfo.title }}
        </td>
        <td rowspan="14" align="center">&nbsp;
          <template v-if="book.items[0].volumeInfo.imageLinks">
            <img height="300" event="" :src="`${book.items[0].volumeInfo.imageLinks.Thumbnail}`" alt="`${id}`" />&nbsp;
          </template>
          <template v-else>NO IMEGE
          </template>
        </td>
      </tr>
      <tr>
        <th>著　者</th>
        <template v-if="book.items[0].volumeInfo.authors">
          <td colspan="5">&nbsp;{{ book.items[0].volumeInfo.authors[0] }}
              &nbsp;{{ book.items[0].volumeInfo.authors[1] }}
              &nbsp;{{ book.items[0].volumeInfo.authors[2] }}
          </td>
        </template>
        <template v-else>
          <td colspan="5"></td>
        </template>
      </tr>
      <tr>
        <th>出版社</th>
        <td colspan="3">&nbsp;{{ book.items[0].volumeInfo.publisher }}
        </td>
        <th>価　格</th>
        <template v-if="book.items[0].saleInfo.listPrice">
          <template v-if="book.items[0].saleInfo.listPrice.amount">
            <td>&nbsp;￥{{ book.items[0].saleInfo.listPrice.amount }}－
            </td>
          </template>
          <template v-else>
            <td></td>
          </template>
        </template>
        <template v-else>
          <td></td>
        </template>
      </tr>
      <tr>
        <th>分　類</th>
        <template v-if="book.items[0].volumeInfo.categories">
          <td colspan="5">&nbsp;{{ book.items[0].volumeInfo.categories[0] }}
          </td>
        </template>
        <template v-else>
          <td colspan="5"></td>
        </template>
      </tr>
      <tr>
        <th>発行日</th>
        <td width="120px">&nbsp;&nbsp;&nbsp;{{ book.items[0].volumeInfo.publishedDate }}
        </td>
        <th width="70px">取得日</th>
        <td><input type="date" v-model="inp.getdate" /></td>
        <th>読了日</th>
        <td><input type="date" v-model="inp.readdate" /></td>
      </tr>
      <tr><th>取得元</th>
        <td colspan="5">
          <v-text-field clearable density="compact" hide-details="auto"
            v-model="inp.library" dense>
          </v-text-field>
        </td>
      </tr>
      <tr><th>所　有</th>
        <td>
          <select v-model="inp.ownership">
            <option value=0 >非所有</option>
            <option value=1 >所有</option>
          </select>
        </td>
      </tr>
      <tr><th>概　要</th>
        <td colspan="5">
          <v-text-field clearable hide-details="auto" v-model="inp.overview" rows="1" dense>
          </v-text-field>
        </td>
      </tr>
      <tr><th>感　想</th>
        <td colspan="5">
          <v-textarea clearable density="compact" hide-details="auto" outlined="false" v-model="inp.impressions" rows="2" dense>
          </v-textarea>
        </td>
      </tr>
      <tr><th>状　態</th>
        <td colspan="5">
          <v-text-field clearable density="compact" hide-details="auto" v-model="inp.state">
          </v-text-field>
        </td>
      </tr>
    </table>
    </form>
  </div>
</template>

<script setup>
  const route = useRoute();
  const id = route.params.id;
  const url = "https://www.googleapis.com/books/v1/volumes?&maxResults=10&q=isbn:" + id;
  const { data: book, refresh } = await useFetch(url);
  const inp = ref({
    isbn13:      id,
    isbn101:     book.value.items[0].volumeInfo.industryIdentifiers[0].identifier,
    isbn102:     book.value.items[0].volumeInfo.industryIdentifiers[1].identifier,
    genre:       book.value.items[0].volumeInfo.categories ? book.value.items[0].volumeInfo.categories[0] : '',
    bookname:    book.value.items[0].volumeInfo.title,
    author1:     book.value.items[0].volumeInfo.authors ? book.value.items[0].volumeInfo.authors[0] : '',
    author2:     book.value.items[0].volumeInfo.authors ? book.value.items[0].volumeInfo.authors[1] : '',
    author3:     book.value.items[0].volumeInfo.authors ? book.value.items[0].volumeInfo.authors[2] : '',
    publisher:   book.value.items[0].volumeInfo.publisher ? book.value.items[0].volumeInfo.publisher : '',
    purchase:    book.value.items[0].saleInfo ? book.value.items[0].saleInfo.listPrice : 0,
    issuedate:   book.value.items[0].volumeInfo.publishedDate,
    getdate:     new Date().toISOString().substring(0, 10),
    readdate:    new Date().toISOString().substring(0, 10),
    ownership:   '',
    library:     '',
    overview:    book.value.items[0].volumeInfo.description ? book.value.items[0].volumeInfo.description : '',
    impressions: '',
    state:       '',
  });
  const inpBook = () => {
    const result = window.confirm('登録しますか？');
    if( result ) {
      const date_issuedate = new Date(inp.value.issuedate);
      const date_getdate   = new Date(inp.value.getdate);
      const date_readdate  = new Date(inp.value.readdate);
      const inpAuthor = ( inp.value.author1 ? inp.value.author1 : '' )
                      + ( inp.value.author2 ? ',' + inp.value.author2 : '' )
                      + ( inp.value.author3 ? ',' + inp.value.author3 : '' );
      const { data, refresh } = useFetch('/api/booklog', {
        method: 'POST',          // ※POST であることに注意
        body: { 
          mode:        'create',
          isbn13:      inp.value.isbn13,
          isbn10:      inp.value.isbn101===id ? inp.value.isbn102 : inp.value.isbn101,
          bookname:    inp.value.bookname,
          author:      inpAuthor,
          publisher:   inp.value.publisher ? inp.value.publisher : '',
          genre:       inp.value.genre ? inp.value.genre : '',
          issuedate:   date_issuedate,
          getdate:     date_getdate,
          readdate:    date_readdate,
          ownership:   parseInt(inp.value.ownership),
          purchase:    inp.value.purchase ? parseInt(inp.value.purchase) : 0,
          library:     inp.value.library,
          overview:    inp.value.overview,
          impressions: inp.value.impressions,
          state:       inp.value.state
        },
      });
      alert('登録しました：' + inp.value.isbn13);
      return data;             // awaitしてるので何か返してあげる
    } else {
      alert('キャンセルしました！');
    }
  };
</script>

<style>
  th{ color:#fff; background:#005ab3; position:sticky; top:0; }
  table tr:nth-child(odd){ background:#e6f2ff; vertical-align: top; }
  tbody { overflow-x: hidden; overflow-y: scroll; height: 100px; }
  input { border:none; outline: none; padding: 0 0 0 10px; vertical-align: top; }
  textarea { border:none; outline: none; padding: 0 0 0 10px; vertical-align: top; }
  select { border:none; outline: none; padding: 0 0 0 10px; }
</style>

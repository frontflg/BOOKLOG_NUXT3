<template>
  <div v-if="pending">
    Loading ...
  </div>
  <div v-else>
    <p class="mb-10">読書履歴（{{ book.isbn13 }}）&nbsp;&nbsp;
      <v-btn @click="refresh">再読込</v-btn>&nbsp;&nbsp;
      <v-btn nuxt :to="`../${book.isbn13}`" color="secondary">戻る</v-btn>&nbsp;&nbsp;
      <v-btn v-on:click="updBook" color="warning">更新</v-btn></p>
    <table>
      <tr height="40px">
        <th width="75">ISBN13</th><td width="160">&nbsp;&nbsp;&nbsp;{{ book.isbn13 }}</td>
        <th width="75">ISBN10</th>
        <td width="170">
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.isbn10" :label="`${book.isbn10}`">
          </v-text-field>
        </td>
        <th width="75">分　類</th>
        <td width="250">
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.genre" :label="`${book.genre}`">
          </v-text-field>
        </td>
        <th width="300">表　紙</th>
      </tr>
      <tr height="40px">
        <th>書　名</th>
        <td colspan="5">
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.bookname" :label="`${book.bookname}`">
          </v-text-field>
        </td>
        <td rowspan="7" align="center" style="padding: 10px;">
          <v-img max-height="500" max-width="350" :src="`https://images-fe.ssl-images-amazon.com/images/P/${book.isbn10}.09.LZZZZZZZ`" />
        </td>
      </tr>
      <tr height="40px">
        <th>著　者</th>
        <td colspan="5">
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.author" :label="`${book.author}`">
          </v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>出版社</th>
        <td colspan="3">
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.publisher" :label="`${book.publisher}`">
          </v-text-field>
        </td>
        <th>状　態</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.state" :label="`${book.state}`">
          </v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>発行日</th>
        <td>
          <div v-if="`${book.issuedate}` !== null">
            <v-text-field clearable density="compact" hide-details="auto" v-model="input.issuedate" :label="`${book.issuedate}`.slice(0,10)"></v-text-field>
          </div>
            <div v-else>
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.issuedate"></v-text-field>
          </div>
        </td>
        <th>取得日</th>
        <td>
          <div v-if="`${book.getdate}` !== null">
            <v-text-field clearable density="compact" hide-details="auto" v-model="input.getdate" :label="`${book.getdate}`.slice(0,10)"></v-text-field>
          </div>
          <div v-else>
            <v-text-field clearable density="compact" hide-details="auto" v-model="input.getdate"></v-text-field>
          </div>
        </td>
        <th>読了日</th>
        <td>
          <div v-if="`${book.readdate}` !== null">
            <v-text-field clearable density="compact" hide-details="auto" v-model="input.readdate" :label="`${book.readdate}`.slice(0,10)"></v-text-field>
          </div>
          <div v-else>
            <v-text-field clearable density="compact" hide-details="auto" v-model="input.readdate"></v-text-field>
          </div>
        </td>
      </tr>
      <tr height="40px">
        <th>所　有</th>
        <td>
          <div v-if="`${book.ownership}` == 1" style="padding-left: 20px;">
            <v-checkbox density="compact" v-model="input.ownership" color="indigo" :label="`&nbsp;&nbsp;所有：${book.ownership}`" v-bind:true-value="1" hide-details></v-checkbox>
          </div>
          <div v-else style="padding-left: 20px;">
            <v-checkbox density="compact" v-model="input.ownership" color="indigo" :label="`&nbsp;&nbsp;非所有：${book.ownership}`" v-bind:true-value="1" hide-details></v-checkbox>
          </div>
        </td>
        <th>価　格</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.purchase" :label="`${book.purchase}`" prefix="\">
          </v-text-field>
        </td>
        <th>取得元</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.library" :label="`${book.library}`">
          </v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>概　要</th>
        <td colspan="5">
          <v-text-field clearable hide-details="auto" v-model="input.overview" :label="`${book.overview}`">
          </v-text-field>
        </td>
      </tr>
      <tr height="120px">
        <th>感　想</th>
        <td colspan="5">
          <v-textarea clearable density="compact" hide-details="auto" outlined="false"
            v-model="input.impressions" :label="`${book.impressions}`"
          >
          </v-textarea>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
  const route = useRoute();
  const id = route.params.id;
    const { data: book, pending, refresh } = useFetch('/api/booklog', {
    method: 'POST',
    body: { mode: 'find', isbn13: id },
    async onResponse({ request, response, options }) {
      console.log('[fetch response]', request, response.status)
      for (const header of response.headers.entries()) {
        console.log('HEADER', header)
      }
    },
  });
  const input = ref({
    isbn10:      '',
    genre:       '',
    bookname:    '',
    author:      '',
    publisher:   '',
    state:       '',
    issuedate:   '',
    getdate:     '',
    readdate:    '',
    ownership:   '',
    purchase:    '',
    library:     '',
    overview:    '',
    impressions: '',
  });
  // 非同期検索の取得値がセット出来ない(タイミング)
  watchEffect(book, () => {
    input.isbn10.value      = book.value.isbn10;
    input.genre.value       = book.value.genre;
    input.bookname.value    = book.value.bookname;
    input.author.value      = book.value.author;
    input.publisher.value   = book.value.publisher;
    input.state.value       = book.value.state;
    input.issuedate.value   = book.value.issuedate;
    input.getdate.value     = book.value.getdate;
    input.readdate.value    = book.value.readdate;
    input.ownership.value   = book.value.ownership;
    input.purchase.value    = book.value.purchase;
    input.library.value     = book.value.library;
    input.overview.value    = book.value.overview;
    input.impressions.value = book.value.impressions;
  });
  const updBook = () => {
    const result = window.confirm('更新しますか？：' + input.bookname);
    if( result ) {
    // const data = useFetch('/api/booklog', {
    //   method: 'PUT',                       // ※PUTであることに注意
    //   body: { mode:        'update',
    //           targetId:    id,
    //           isbn10:      input.isbn10,
    //           genre:       input.genre,
    //           bookname:    input.bookname,
    //           author:      input.author,
    //           publisher:   input.publisher,
    //           state:       input.state,
    //           issuedate:   input.issuedate,
    //           getdate:     input.getdate,
    //           readdate:    input.readdate,
    //           ownership:   input.ownership,
    //           purchase:    input.purchase,
    //           library:     input.library,
    //           overview:    input.overview,
    //           impressions: input.impressions,
    //         },
    // });
    // await refreshNuxtData(); // データのリフレッシュ
       alert('更新機能は未実装：' + id);
    // return data;             // awaitしてるので何か返してあげる
    }
  };
</script>

<style>
  th{ color:#fff; background:#005ab3; position:sticky; top:0; }
  table tr:nth-child(odd){ background:#e6f2ff; }
  tbody { overflow-x: hidden; overflow-y: scroll; height: 100px; }
</style>

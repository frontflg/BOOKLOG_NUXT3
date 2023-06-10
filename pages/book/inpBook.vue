<template>
  <div>
    <p class="mb-10">読書履歴&nbsp;&nbsp;
      <v-btn nuxt :to="`../booklog`" color="success">戻る</v-btn>&nbsp;&nbsp;
      <v-btn v-on:click="inpBook" color="warning">登録</v-btn></p>
    <table>
      <tr height="40px">
        <th width="75">ISBN13</th>
        <td width="200">
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.isbn13">
          </v-text-field>
        </td>
        <th width="75">ISBN10</th>
        <td width="180">
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.isbn10">
          </v-text-field>
        </td>
        <th width="75">分　類</th>
        <td width="300">
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.genre">
          </v-text-field>
        </td>
        <!-- th width="300">表　紙</th -->
      </tr>
      <tr height="40px">
        <th>書　名</th>
        <td colspan="5">
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.bookname">
          </v-text-field>
        </td>
        <!-- td rowspan="7" align="center" style="padding: 10px;">
          <v-img max-height="500" max-width="350" :src="`https://images-fe.ssl-images-amazon.com/images/P/${input.isbn10}.09.LZZZZZZZ`" />
        </td -->
      </tr>
      <tr height="40px">
        <th>著　者</th>
        <td colspan="5">
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.author">
          </v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>出版社</th>
        <td colspan="3">
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.publisher">
          </v-text-field>
        </td>
        <th>状　態</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.state">
          </v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>発行日</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.issuedate"></v-text-field>
        </td>
        <th>取得日</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.getdate"></v-text-field>
        </td>
        <th>読了日</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.readdate"></v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>所　有</th>
        <td style="padding: 0px 0px 0px 25px;">
          <v-checkbox density="compact" v-model="input.ownership" color="indigo" v-bind:true-value="1" hide-details></v-checkbox>
        </td>
        <th>価　格</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.purchase" prefix="\"></v-text-field>
        </td>
        <th>取得元</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.library"></v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>概　要</th>
        <td colspan="5">
          <v-text-field clearable hide-details="auto" v-model="input.overview"></v-text-field>
        </td>
      </tr>
      <tr height="120px">
        <th>感　想</th>
        <td colspan="5">
          <v-textarea clearable density="compact" hide-details="auto" outlined="false" v-model="input.impressions"></v-textarea>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
  const input = ref({
    isbn13:      '',
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
  const inpBook = () => {
    const result = window.confirm('登録しますか？');
    if( result ) {
    //  const data = useFetch('/api/booklog', {
    //    method: 'POST',                       // ※POSTであることに注意
    //    body: { mode:        'create',
    //            isbn13:      input.isbn13,
    //            isbn10:      input.isbn10,
    //            genre:       input.genre,
    //            bookname:    input.bookname,
    //            author:      input.author,
    //            publisher:   input.publisher,
    //            state:       input.state,
    //            issuedate:   input.issuedate,
    //            getdate:     input.getdate,
    //            readdate:    input.readdate,
    //            ownership:   input.ownership,
    //            purchase:    input.purchase,
    //            library:     input.library,
    //            overview:    input.overview,
    //            impressions: input.impressions,
    //            },
    //   });
    // await refreshNuxtData(); // データのリフレッシュ
       alert('登録機能は未実装：' + input.isbn13);
       return data;             // awaitしてるので何か返してあげる
    }
  };
</script>

<style>
  th{ color:#fff; background:#005ab3; position:sticky; top:0; }
  table tr:nth-child(odd){ background:#e6f2ff; }
  tbody { overflow-x: hidden; overflow-y: scroll; height: 100px; }
</style>

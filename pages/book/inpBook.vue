<template>
  <div>
    <p class="mb-10">読書履歴&nbsp;&nbsp;
      <v-btn nuxt :to="`../booklog`" color="success">戻る</v-btn>&nbsp;&nbsp;
      <v-btn v-on:click="inpBook" color="warning">登録</v-btn></p>
    <table>
      <tr height="40px">
        <th width="75">ISBN13</th>
        <td width="200">
          <v-text-field clearable density="compact" hide-details="auto" v-model="inp.isbn13">
          </v-text-field>
        </td>
        <th width="75">ISBN10</th>
        <td width="180">
          <v-text-field clearable density="compact" hide-details="auto" v-model="inp.isbn10">
          </v-text-field>
        </td>
        <th width="75">分　類</th>
        <td width="300">
          <v-text-field clearable density="compact" hide-details="auto" v-model="inp.genre">
          </v-text-field>
        </td>
        <!-- th width="300">表　紙</th -->
      </tr>
      <tr height="40px">
        <th>書　名</th>
        <td colspan="5">
          <v-text-field clearable density="compact" hide-details="auto" v-model="inp.bookname">
          </v-text-field>
        </td>
        <!-- td rowspan="7" align="center" style="padding: 10px;">
          <v-img max-height="500" max-width="350" :src="`https://images-fe.ssl-images-amazon.com/images/P/${inp.isbn10}.09.LZZZZZZZ`" />
        </td -->
      </tr>
      <tr height="40px">
        <th>著　者</th>
        <td colspan="5">
          <v-text-field clearable density="compact" hide-details="auto" v-model="inp.author">
          </v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>出版社</th>
        <td colspan="3">
          <v-text-field clearable density="compact" hide-details="auto" v-model="inp.publisher">
          </v-text-field>
        </td>
        <th>状　態</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="inp.state">
          </v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>発行日</th>
        <td>
          <input type="date" v-model="inp.issuedate" />
        </td>
        <th>取得日</th>
        <td>
          <input type="date" v-model="inp.getdate" />
        </td>
        <th>読了日</th>
        <td>
          <input type="date" v-model="inp.readdate" />
        </td>
      </tr>
      <tr height="40px">
        <th>所　有</th>
        <td style="padding: 0px 0px 0px 25px;">
          <select v-model="inp.ownership">
            <option value=0 >非所有</option>
            <option value=1 >所有</option>
          </select>
        </td>
        <th>価　格</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="inp.purchase" prefix="\"></v-text-field>
        </td>
        <th>取得元</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="inp.library"></v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>概　要</th>
        <td colspan="5">
          <v-text-field clearable hide-details="auto" v-model="inp.overview"></v-text-field>
        </td>
      </tr>
      <tr height="120px">
        <th>感　想</th>
        <td colspan="5">
          <v-textarea clearable density="compact" hide-details="auto" outlined="false" v-model="inp.impressions"></v-textarea>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
  const inp = ref({
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
      const date_issuedate = new Date(inp.value.issuedate);
      const date_getdate   = new Date(inp.value.getdate);
      const date_readdate  = new Date(inp.value.readdate);
      const { data, refresh } = useFetch('/api/booklog', {
        method: 'POST',          // ※POST であることに注意
        body: { 
          mode:        'create',
          isbn13:      inp.value.isbn13,
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
      });
      alert('登録しました：' + inp.value.isbn13);
      return data;             // awaitしてるので何か返してあげる
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

<style>
  th{ color:#fff; background:#005ab3; position:sticky; top:0; }
  table tr:nth-child(odd){ background:#e6f2ff; }
  tbody { overflow-x: hidden; overflow-y: scroll; height: 100px; }
</style>

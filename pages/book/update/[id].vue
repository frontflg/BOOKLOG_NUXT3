<template>
  <div v-if="pending">
    Loading ...
  </div>
  <div v-else>
    <p class="mb-10">読書履歴（{{ book.isbn13 }}）&nbsp;&nbsp;<v-btn @click="refresh">再読込</v-btn></p>
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
            <div v-if="`${book.issuedate}`  == null">
          <v-text-field clearable density="compact" hide-details="auto" v-model="input.issuedate"></v-text-field>
          </div>
        </td>
        <th>取得日</th>
        <td>
          <div v-if="`${book.getdate}` !== null">
            <v-text-field clearable density="compact" hide-details="auto" v-model="input.getdate" :label="`${book.getdate}`.slice(0,10)"></v-text-field>
          </div>
          <div v-if="`${book.getdate}`  == null">
            <v-text-field clearable density="compact" hide-details="auto" v-model="input.getdate"></v-text-field>
          </div>
        </td>
        <th>読了日</th>
        <td>
          <div v-if="`${book.readdate}` !== null">
            <v-text-field clearable density="compact" hide-details="auto" v-model="input.readdate" :label="`${book.readdate}`.slice(0,10)"></v-text-field>
          </div>
          <div v-if="`${book.readdate}`  == null">
            <v-text-field clearable density="compact" hide-details="auto" v-model="input.readdate"></v-text-field>
          </div>
        </td>
      </tr>
      <tr height="40px">
        <th>所　有</th>
        <td>
          <div style="padding-left: 20px;">
            <v-checkbox density="compact" v-model="input.ownership" color="indigo" label="&nbsp;&nbsp;所有" v-bind:true-value="1" hide-details></v-checkbox>
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
    isbn10:      book.isbn10,
    genre:       book.genre,
    bookname:    book.bookname,
    author:      book.author,
    publisher:   book.publisher,
    state:       book.state,
    issuedate:   book.issuedate,
    getdate:     book.getdate,
    readdate:    book.readdate,
    ownership:   book.ownership,
    purchase:    book.purchase,
    library:     book.library,
    overview:    book.overview,
    impressions: book.impressions,
  });
</script>

<style>
  th{ color:#fff; background:#005ab3; position:sticky; top:0; }
  table tr:nth-child(odd){ background:#e6f2ff; }
  tbody { overflow-x: hidden; overflow-y: scroll; height: 100px; }
</style>

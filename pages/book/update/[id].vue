<template>
  <v-app>
    <p class="mb-10">読書履歴（{{ book.isbn13 }}）</p>
    <table>
      <tr height="40px">
        <th width="75">ISBN13</th><td>&nbsp;{{ book.isbn13 }}</td>
        <th width="75">ISBN10</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="isbn10Text">
          </v-text-field>
        </td>
        <th width="75">分　類</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="genreText">
          </v-text-field>
        </td>
        <th width="300">表　紙</th>
      </tr>
      <tr height="40px">
        <th>書　名</th>
        <td colspan="5">
          <v-text-field clearable density="compact" hide-details="auto" v-model="booknameText">
          </v-text-field>
        </td>
        <td rowspan="7" align="center" style="padding: 10px;">
          <v-img max-height="500" max-width="350" :src="`https://images-fe.ssl-images-amazon.com/images/P/${book.isbn10}.09.LZZZZZZZ`" />
        </td>
      </tr>
      <tr height="40px">
        <th>著　者</th>
        <td colspan="5">
          <v-text-field clearable density="compact" hide-details="auto" v-model="authorText">
          </v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>出版社</th>
        <td colspan="3">
          <v-text-field clearable density="compact" hide-details="auto" v-model="publisherText">
          </v-text-field>
        </td>
        <th>状　態</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="stateNumb">
          </v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>発行日</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="issuedateYMD">
          <!-- div v-if="book.issuedate !== null">&nbsp;{{ book.issuedate.slice(0,10) }}</div -->
          </v-text-field>
        </td>
        <th>取得日</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="getdateYMD">
          <!-- div v-if="book.getdate !== null">&nbsp;{{ book.getdate.slice(0,10) }}</div -->
          </v-text-field>
        </td>
        <th>読了日</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="readdateYMD">
          <!-- div v-if="book.readdate !== null">&nbsp;{{ book.readdate.slice(0,10) }}</div -->
          </v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>所　有</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="ownershipText">
          <!-- div v-if="book.ownership == '1'">&nbsp;所有</div -->
          </v-text-field>
        </td>
       <th>価　格</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="purchaseNumb">
          </v-text-field>
        </td>
        <th>取得元</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto" v-model="libraryText">
          </v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>概　要</th>
        <td colspan="5">
          <v-text-field clearable hide-details="auto" v-model="overviewText">
          </v-text-field>
        </td>
      </tr>
      <tr height="120px">
        <th>感　想</th>
        <td colspan="5">
          <v-textarea clearable density="compact" hide-details="auto" outlined="false"
            placeholder="感想を書いてください。" v-model="impressionsText"
          >
          </v-textarea>
        </td>
      </tr>
    </table>
  </v-app>
</template>

<script setup>
  const route = useRoute();
  const id = route.params.id;
  const { data: book, refresh } = useFetch('/api/booklog', {
    method: 'POST',
    body: { mode: 'find', isbn13: id },
  });
  // const isbn10Text      = ref(book.value.isbn10);
  // const genreText       = ref(book.value.genre);
  // const booknameText    = ref(book.value.bookname);
  // const authorText      = ref(book.value.author);
  // const publisherText   = ref(book.value.publisher);
  // const stateNumb       = ref(book.value.state);
  // const issuedateYMD    = ref(book.value.issuedate);
  // const getdateYMD      = ref(book.value.getddate);
  // const readdateYMD     = ref(book.value.readdate);
  // const ownershipText   = ref(book.value.ownership);
  // const purchaseNumb    = ref(book.value.purchase);
  // const libraryText     = ref(book.value.library);
  // const overviewText    = ref(book.value.overview);
  // const impressionsText = ref(book.value.impressions);
</script>

<style>
  th{ color:#fff; background:#005ab3; position:sticky; top:0; }
  table tr:nth-child(odd){ background:#e6f2ff; }
  tbody { overflow-x: hidden; overflow-y: scroll; height: 100px; }
</style>

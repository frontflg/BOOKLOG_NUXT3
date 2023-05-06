<template>
  <v-app>
    <p class="mb-10">読書履歴（{{ book.isbn13 }}）</p>
    <table>
      <tr height="40px">
        <th width="75">ISBN13</th><td>&nbsp;{{ book.isbn13 }}</td>
        <th width="75">ISBN10</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto">
            &nbsp;{{ book.isbn10 }}
          </v-text-field>
        </td>
        <th width="75">分　類</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto">
            &nbsp;{{ book.genre }}
          </v-text-field>
        </td>
        <th width="300">表　紙</th>
      </tr>
      <tr height="40px">
        <th>書　名</th>
        <td colspan="5">
          <v-text-field clearable density="compact" hide-details="auto">
            &nbsp;{{ book.bookname }}
          </v-text-field>
        </td>
        <td rowspan="7" align="center" style="padding: 10px;">
          <v-img max-height="500" max-width="350" :src="`https://images-fe.ssl-images-amazon.com/images/P/${book.isbn10}.09.LZZZZZZZ`" />
        </td>
      </tr>
      <tr height="40px">
        <th>著　者</th>
        <td colspan="5">
          <v-text-field clearable density="compact" hide-details="auto">
            &nbsp;{{ book.author }}
          </v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>出版社</th>
        <td colspan="3">
          <v-text-field clearable density="compact" hide-details="auto">
            &nbsp;{{ book.publisher }}
          </v-text-field>
        </td>
        <th>状　態</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto">
            &nbsp;{{ book.state }}
          </v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>発行日</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto">
          <div v-if="book.issuedate !== null">&nbsp;{{ book.issuedate.slice(0,10) }}</div>
          </v-text-field>
        </td>
        <th>取得日</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto">
          <div v-if="book.getdate !== null">&nbsp;{{ book.getdate.slice(0,10) }}</div>
          </v-text-field>
        </td>
        <th>読了日</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto">
          <div v-if="book.readdate !== null">&nbsp;{{ book.readdate.slice(0,10) }}</div>
          </v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>所　有</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto">
          <div v-if="book.ownership == '1'">&nbsp;所有</div>
          </v-text-field>
        </td>
       <th>価　格</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto">
            &nbsp;\{{ book.purchase }}-
          </v-text-field>
        </td>
        <th>取得元</th>
        <td>
          <v-text-field clearable density="compact" hide-details="auto">
            &nbsp;{{ book.library }}
          </v-text-field>
        </td>
      </tr>
      <tr height="40px">
        <th>概　要</th>
        <td colspan="5">
          <v-text-field clearable hide-details="auto"><!-- v-model="overviewText" -->
            {{ book.overview }}
          </v-text-field>
        </td>
      </tr>
      <tr height="120px">
        <th>感　想</th>
        <td colspan="5">
          <v-textarea clearable density="compact" hide-details="auto" outlined="false"
            placeholder="感想を書いてください。"
          >
            {{ book.impressions }}
          </v-textarea>
        </td>
      </tr>
    </table>
  </v-app>
</template>

<script setup>
  const route = useRoute();
  const id = route.params.id;
  // const overviewText = ref('')
  const { data: book, refresh } = useFetch('/api/booklog', {
    method: 'POST',
    body: { mode: 'find', isbn13: id },
  });
  // overviewText = book.overview;
</script>

<style>
  th{ color:#fff; background:#005ab3; position:sticky; top:0; }
  table tr:nth-child(odd){ background:#e6f2ff; }
  tbody { overflow-x: hidden; overflow-y: scroll; height: 100px; }
</style>

<template>
  <div>
    <v-container>
      <v-snackbar
        v-model="alertFlg"
        color="green"
        style="white-space: pre-wrap;"
        :top="true"
      >
        {{ alertMessage }}
        <v-btn
          color="white"
          text
          @click="alertFlg = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-container>
    <v-row>
      <v-col>
        <v-card-title>
          BOOKLOG
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-card-title>
      </v-col>
      <v-col>
        <v-card-actions>
          <v-btn
            class="primary"
            @click="downloadData()"
          >
            CSV
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="lists"
      :search="search"
    >
      <template #item="props">
        <tr>
          <td>
            {{ props.item.line }}
          </td>
          <td>
            {{ props.item.ISBN13 }}
          </td>
          <td>
            {{ props.item.BookName }}
          </td>
          <td>
            {{ props.item.Author }}
          </td>
          <td>
            {{ props.item.Publisher }}
          </td>
          <td v-if="props.item.Purchase == 0">
            図書館
          </td>
          <td v-else style="text-align: right;">
            ￥{{ props.item.Purchase }}
          </td>
          <td>
            {{ props.item.Genre }}
          </td>
          <td>
            {{ props.item.GDATE }}
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'BooklogList',
  async asyncData ({ $axios }) {
    const lists = await $axios.$get('http://localhost:5000')
    return { lists }
  },
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'No.',
          value: 'line',
          width: '70'
        },
        {
          text: 'ISBN13',
          value: 'ISBN13'
        },
        {
          text: '書籍名',
          value: 'BookName'
        },
        {
          text: '著者',
          value: 'Author'
        },
        {
          text: '出版社',
          value: 'Publisher'
        },
        {
          text: '価格',
          value: 'Purchase',
          align: 'end'
        },
        {
          text: '分類',
          value: 'Genre'
        },
        {
          text: '発行日',
          value: 'GDATE',
          width: '105'
        }
      ],
      lists: [],
      rules: {
        required: value => !!value || '入力してください'
      },
      alertFlg: false,
      alertMessage: ''
    }
  },
  methods: {
    downloadData () {
      let csv = 'ISBN13,書籍名,著者,出版社,価格,分類,発行日\n'
      this.lists.forEach(function (el) {
        csv += el.ISBN13 + ',' + el.BookName + ',' + el.Author + ',' +
               el.Publisher + ',' + el.Purchase + ',' +
               el.Genre + ',' + el.GDATE + '\n'
      })
      const anchor = document.createElement('a')
      anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
      anchor.target = '_blank'
      anchor.download = 'DATA_LIST_' + new Date().toISOString().substr(0, 10) + '.csv'
      anchor.click()
      this.alertFlg = true
      this.alertMessage = 'ダウンロード実行しました'
    }
  }
}
</script>

<style>
th {
  color: #fff;
  background-color: rgb(128, 152, 226);
}
.v-data-table td {
  background: #f0f8ff;
}
.v-data-table tr:nth-child(odd) td {
  background: #fff;
}
.v-data-table tr:hover td {
  background-color: #eee;
}
</style>

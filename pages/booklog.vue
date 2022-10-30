<template>
  <div>
    <v-container>
      <v-snackbar
        v-model="alertFlg"
        color="red"
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
    <!-- ダイアログ：ISBN13入力 -->
    <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <v-card>
        <v-row no-gutters justify="center">
          <v-card-title>
            ISBN13入力
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="inIsbn13"
              label="ISBN13："
              maxlength="13"
              class="mx-5"
              clearable
            />
            を登録しますか？
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              class="primary"
              @click="insertData()"
            >
              ＯＫ
            </v-btn>
            <v-btn
              class="primary"
              @click="dialog = false"
            >
              キャンセル
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-row>
      </v-card>
    </v-dialog>
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
          <v-btn
            class="primary"
            @click="dialogOpen()"
          >
            登録
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="lists"
      :search="search"
      item-key="line"
    >
      <template #[`item.ISBN13`]="{ item }">
        <a target="_blank" :href="`http://localhost:3000/book?id=${item.ISBN13}`">
          {{ item.ISBN13 }}
        </a>
      </template>
    </v-data-table>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'BooklogList',
  async asyncData ({ $axios }) {
    try {
      const lists = await $axios.$get('http://localhost:5000/')
      return { lists }
    } catch (e) {
      console.log(e.errorCode) // eslint-disable-line no-console
      window.alert(e)
    }
  },
  data () {
    return {
      search: '',
      dialog: false,
      inIsbn13: '',
      headers: [
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
          width: '125'
        }
      ],
      lists: [],
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
    },
    dialogOpen () {
      this.inIsbn13 = ''
      this.dialog = true
    },
    insertData () {
      this.insertBook()
      window.location.href = 'http://localhost:3000/book?id=' + this.inIsbn13
    },
    async insertBook () {
      if (!this.inIsbn13) {
        // this.alertFlg = true
        // this.alertMessage = 'ISBN13が未設定です！' + this.inIsbn13
        window.alert('ISBN13が未設定です！' + this.inIsbn13)
        return 400
      }
      this.dialog = false
      try {
        // this.alertFlg = true
        // this.alertMessage = 'ISBN13 = ' + this.inIsbn13
        await this.$axios.$get('http://localhost:5000/insert', {
          params: {
            id: this.inIsbn13
          }
        })
        // this.$router.push('http://localhost:3000/book?id=' + this.inIsbn13)
        // window.open('http://localhost:3000/book?id=' + this.inIsbn13, '_blank');
      } catch (e) {
        console.log(e.errorCode) // eslint-disable-line no-console
        window.alert(e)
        return e
      }
    }
  }
}
</script>

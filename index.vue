<template>
  <v-card class="mx-auto">
    <v-list-item>
      <div class="booklog">
        <table><thead>
         <tr>
          <th width= "26px">No.</th>
          <th width="131px">ID</th>
          <th width="361px">書籍名</th>
          <th width="221px">著者</th>
          <th width="151px">出版社</th>
          <th width= "61px">価格</th>
          <th width="151px">分類</th>
          <th width="111px">発行日</th>
         </tr></thead>
        <tbody>
         <tr v-for="(item,i) in items" :key="items.ISBN13">
          <td width= "25px" class="right">{{ i + 1 }}</td>
          <td width="130px">{{ item.ISBN13 }}</td>
          <td width="360px">{{ item.BookName }}</td>
          <td width="220px">{{ item.Author }}</td>
          <td width="150px">{{ item.Publisher }}</td>
          <td v-if="item.Purchase > 0"  width= "60px" class="right">￥{{ item.Purchase }}</td>
          <td v-if="item.Purchase == 0" width= "60px">図書館</td>
          <td width="150px">{{ item.Genre }}</td>
          <td width="110px">{{ item.GDATE }}</td>
         </tr>
        </tbody></table>
      </div>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const items = await $axios.$get("http://localhost:5000");
    return { items };
  },
  created(){
    document.title = "BOOKLOG BY NUXTJS"
  },
};
</script>

<style>
  table{
    border-collapse:collapse;
    margin:0 auto;
  }
  td,th{
    padding:10px;
  }
  td.right{
    text-align: right;
  }
  th{
    color:#fff;
    background:#005ab3;
  }
  table tr:nth-child(odd){
    background:#e6f2ff;
  }
  thead, tbody {
    display: block;
  }
  tbody {
    overflow-x: hidden;
    overflow-y: scroll;
    height: 580px;
  }
</style>
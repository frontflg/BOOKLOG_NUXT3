<template>
  <div>
    <v-row dense class="toc-view" width="100%">
      <v-col
        v-for="(book, i) in books"
        :key="i"
        cols="12"
        lg="2"
      >
        <v-card
          color="white"
          max-width="100%"
          height="90%"
        >
          <v-card-actions class="mb-5">
            <a :href="`/book/${book.isbn13}`">
              <template v-if="book.coverimg">
                <img width="150" event="" :src="`/${book.coverimg}`" alt="`${book.isbn13}`" />
              </template>
              <template v-else>
                <img width="150" event="" :src="`https://images-fe.ssl-images-amazon.com/images/P/${book.isbn10}.09.LZZZZZZZ`" alt="`${book.isbn13}`" />
              </template>
            </a>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  const book = ref('');
  const { data: books, refresh } = useFetch('/api/booklog');
</script>

<style lang="scss">
.toc-view {
  background-color: #e6f2ff;
  border-radius: 13px;
  padding: 1rem;
  margin-left: 1rem;
  position: sticky;
  top: 1rem;
  max-height: 80vh;
  overflow: scroll;
}
</style>


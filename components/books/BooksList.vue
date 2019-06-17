<template>
  <div class="book-list">
    <h1>
      <nuxt-link :to="bookLink + '/1'">  1</nuxt-link>
    </h1>
    <div class="preview">
      <span>
                  
                  
         19     
      </span>
    </div>
    <hr />
    <h1>
      <nuxt-link :to="bookLink + '/2'">  2</nuxt-link>
    </h1>
    <div class="preview">
      <span>
                  
                  
         19     
      </span>
    </div>
    <hr />
    <h1>
      <nuxt-link :to="bookLink + '/3'">  3</nuxt-link>
    </h1>
    <div class="preview">
      <span>
                  
                  
         19     
      </span>
    </div>
    <hr />
    <h1>
      <nuxt-link :to="bookLink + '/4'">  4</nuxt-link>
    </h1>
    <div class="preview">
      <span>
                  
                  
         19     
      </span>
    </div>
    <div class="pages-number">
      <span v-if="prePage" class="pre">
        <nuxt-link :to="path + '?page=' + prePage">《</nuxt-link>
      </span>
      <span v-for="num in totalPagesNum" :key="num" class="number">
        <nuxt-link :to="path + '?page=' + (startPage + parseInt(num))">{{
          startPage + parseInt(num)
        }}</nuxt-link>
      </span>
      <span class="next">
        <nuxt-link :to="path + '?page=' + nextPage">》ᠬᠤᠢᠢᠨᠠᠬᠢ</nuxt-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalPagesNum: 10,
      pageID: 1,
      path: '/'
    }
  },
  computed: {
    bookLink() {
      let path = '/book'
      if (this.$route.path.indexOf('/admin') > -1) {
        path = '/admin'
      }
      return path
    },
    startPage() {
      let num = 0
      if (this.pageID > 6) {
        num = this.pageID - 6
      }
      return num
    },
    prePage() {
      return this.pageID - 1
    },
    nextPage() {
      return this.pageID + 1
    }
  },
  watch: {
    $route(to, from) {
      console.log(this.$route)
      this.path = this.$route.path
      let id = this.$route.query.page
      if (!id) {
        id = 1
      }
      this.pageID = parseInt(id)
    }
  }
}
</script>

<style scoped>
.pages-number {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
}
.number,
.pre,
.next {
  font-size: 1.2rem;
  margin-left: 1rem;
}
.pre {
  margin-right: 2rem;
}
.next {
  margin-left: 2rem;
}
</style>

<template>
  <div>
    <div class="title">
      <nuxt-link :to="bookLink">
        <h1> </h1>
      </nuxt-link>
    </div>
    <no-ssr>
      <div class="pages-number">
        <span v-if="!isFirstPage" class="pre">
          <nuxt-link :to="bookLink + '/' + prePage">《</nuxt-link>
        </span>
        <span
          v-for="num in pagesCountInPerPage"
          :key="num"
          :class="{ number: pageExist(num) }"
        >
          <template v-if="!isCurrentPage(num) && pageExist(num)">
            <nuxt-link :to="bookLink + '/' + pageNum(num)">
              <span class="num">{{ pageNum(num) }}</span>
            </nuxt-link>
          </template>

          <template v-if="isCurrentPage(num) && pageExist(num)">
            {{ pageNum(num) }}
          </template>
        </span>
        <span v-if="!isLastPage" class="next">
          <nuxt-link :to="bookLink + '/' + nextPage">》ᠬᠤᠢᠢᠨᠠᠬᠢ</nuxt-link>
        </span>
      </div>
    </no-ssr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagesCountInPerPage: 10,
      pageID: 1,
      path: '',
      book: {
        title: ' ',
        author: '',
        writtenDate: '2009-9-13',
        typers: '  ',
        preview:
          '1975   12               1999                  1999                         ',
        content: [
          {
            id: '123',
            image:
              'http://b.hiphotos.baidu.com/image/pic/item/32fa828ba61ea8d3fcd2e9ce9e0a304e241f5803.jpg',
            content:
              '1                                                   1.       '
          },
          {
            id: '334',
            image:
              'http://e.hiphotos.baidu.com/image/pic/item/4610b912c8fcc3cef70d70409845d688d53f20f7.jpg',
            content:
              '2 2019                    2019  3    16             '
          },
          {
            id: '634',
            image:
              'http://e.hiphotos.baidu.com/image/pic/item/dc54564e9258d1092f7663c9db58ccbf6c814d30.jpg',
            content:
              '3   70                                        '
          },
          {
            id: '123',
            image:
              'http://g.hiphotos.baidu.com/image/pic/item/c2cec3fdfc03924590b2a9b58d94a4c27d1e2500.jpg',
            content:
              '4                                                   1.       '
          },
          {
            id: '334',
            image:
              'http://e.hiphotos.baidu.com/image/pic/item/b812c8fcc3cec3fdb850efcfdc88d43f87942719.jpg',
            content:
              '5 2019                    2019  3    16             '
          },
          {
            id: '634',
            image:
              'http://a.hiphotos.baidu.com/image/pic/item/0ff41bd5ad6eddc40189fc4133dbb6fd52663319.jpg',
            content:
              '6   70                                        '
          },
          {
            id: '123',
            image:
              'http://b.hiphotos.baidu.com/image/pic/item/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg',
            content:
              '7                                                   1.       '
          },
          {
            id: '334',
            image:
              'http://f.hiphotos.baidu.com/image/pic/item/0e2442a7d933c8956c0e8eeadb1373f08202002a.jpg',
            content:
              '8 2019                    2019  3    16             '
          },
          {
            id: '634',
            image:
              'http://f.hiphotos.baidu.com/image/pic/item/b151f8198618367aa7f3cc7424738bd4b31ce525.jpg',
            content:
              '9   70                                        '
          },
          {
            id: '123',
            image:
              'http://b.hiphotos.baidu.com/image/pic/item/fc1f4134970a304e0c381653dbc8a786c9175c04.jpg',
            content:
              '10                                                   1.       '
          },
          {
            id: '334',
            image:
              'http://c.hiphotos.baidu.com/image/pic/item/5243fbf2b211931352ceb3196f380cd790238d8e.jpg',
            content:
              '11 2019                    2019  3    16             '
          },
          {
            id: '634',
            image:
              'http://c.hiphotos.baidu.com/image/pic/item/7acb0a46f21fbe09a9cc8fbd61600c338644ad8d.jpg',
            content:
              '12   70                                        '
          }
        ]
      }
    }
  },
  computed: {
    totalPages() {
      return this.book.content.length
    },
    bookLink() {
      let path = '/book'
      if (this.$route.path.indexOf('admin') > -1) {
        path = '/admin'
      }
      return path + '/' + this.$route.params.bookid
    },
    startPage() {
      let num = 0
      if (this.pageID > 6) {
        num = this.pageID - 6
      }
      if (num + this.pagesCountInPerPage > this.totalPages) {
        num = this.totalPages - this.pagesCountInPerPage
      }
      return num
    },
    prePage() {
      return this.pageID - 1
    },
    nextPage() {
      return this.pageID + 1
    },
    isFirstPage() {
      return this.pageID === 1
    },
    isLastPage() {
      return this.totalPages <= this.pageID
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },
  beforeMount() {
    console.log(this.$route)
    const pageid = this.$route.params.pageid
    if (
      pageid &&
      (parseInt(pageid) > this.totalPages || parseInt(pageid) < 1)
    ) {
      const path = this.$route.path
      const bookPath = path.substring(0, path.length - (pageid.length + 1))
      this.$router.push(bookPath)
    } else {
      this.init()
    }
  },
  methods: {
    init() {
      this.path = this.$route.path
      this.pageID = parseInt(this.$route.params.pageid) || 1
    },
    pageNum(num) {
      return this.startPage + parseInt(num)
    },
    isCurrentPage(num) {
      return this.pageID === this.pageNum(num)
    },
    pageExist(num) {
      return num >= 1 - this.startPage
    }
  }
}
</script>

<style scoped>
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
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

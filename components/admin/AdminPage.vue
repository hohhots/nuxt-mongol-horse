<template>
  <form @submit.prevent="onSubmit">
    <div class="new-page-title">
      <span v-if="!editExistingPage">{{ monText.newPage }}</span>
    </div>
    <div class="upload">
      <div ref="preview">
        <mon-img v-if="imageExist" :src="imageExist" />
      </div>
      <div class="label">
        <input
          id="fileInput"
          ref="image"
          type="file"
          accept="image/*"
          capture="environment"
          class="fileinput"
          @input="setImage"
        />
        <label for="fileInput" class="label">
          <figure>
            <mon-svg focusable="false" :view-box.camel="'0 0 32 32'">
              <path
                style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;"
                d="M 0 3 L 0 29 L 32 29 L 32 3 Z M 30 27 L 2 27 L 2 5 L 30 5 Z M 22 10 C 22 11.65625 23.34375 13 25 13 C 26.65625 13 28 11.65625 28 10 C 28 8.34375 26.65625 7 25 7 C 23.34375 7 22 8.34375 22 10 Z M 28 25 L 4 25 L 10 9 L 18 19 L 22 16 Z M 28 25 "
              />
            </mon-svg>
            <span class="upload-caption">{{ monText.select }}</span>
          </figure>
        </label>
      </div>
    </div>

    <MonInputControl v-model="tempPage.pageNum" :placeholder="monText.pageNum"
      >{{ monText.pageNum }}᠄</MonInputControl
    >

    <MonInputControl
      v-model="tempPage.content"
      control-type="textarea"
      :placeholder="monText.content"
      >{{ monText.content }}᠄</MonInputControl
    >

    <AdminSaveCancel
      @cancel="onCancel"
      @newPage="onNextNewPage"
    ></AdminSaveCancel>
  </form>
</template>

<script>
import _ from 'lodash'

import { mapState } from 'vuex'

import settings from '@/settings.js'
import common from '@/mixins/common.js'

import AdminSaveCancel from '@/components/admin/AdminSaveCancel'
import MonInputControl from '@/components/mongol/MonInputControl'

export default {
  components: {
    AdminSaveCancel,
    MonInputControl
  },
  mixins: [common],
  props: {
    page: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    return {
      image: '',
      tempFile: ''
    }
  },
  computed: {
    ...mapState({
      jwt: state => state.user.jwt,
      newPageId: state => state.books.PageId
    }),
    tempPage() {
      return _.assign({}, this.page)
    },
    bookid() {
      return this.$route.params.bookid
    },
    pageid() {
      return this.$route.params.pageid
    },
    imageExist() {
      if (this.image) {
        return this.image
      }
      const id = this.tempPage.id
      const type = this.tempPage.imageType
      if (this.tempPage && type) {
        return `/${settings.images}/${settings.book}/${this.bookid}/${id}.${type}`
      }
      return ''
    }
  },
  watch: {
    $route(to, from) {
      this.initVar()
    }
  },
  methods: {
    initVar() {
      this.image = ''
      this.tempFile = ''
    },
    async onSubmit() {
      const ask = confirm('Are you sure to save changes?')
      if (!ask) {
        return
      }

      if (!this.tempPage.pageNum || !this.tempPage.content) {
        alert('Page number or conten is empty!')
        return
      }

      if (!/^([1-9])([0-9]*)$/.test(this.tempPage.pageNum)) {
        alert('page number must be number!')
        return
      }

      if (this.tempPage.id) {
        if (this.hasSamePageNum(this.tempPage.id, this.tempPage.pageNum)) {
          alert('Page number ' + this.tempPage.pageNum + ' already exist!')
          return
        }

        await this.$store
          .dispatch('books/updatePage', this.tempPage)
          .then(async () => {
            await this.uploadPhoto()
          })
          .then(() => {
            alert('OK! update page completed!')
            this.$router.push(
              `/${settings.admin}/${this.bookid}/${
                this.$store.getters['books/getPageURLId']
              }`
            )
          })
          .catch(e => alert(e))
      } else {
        if (this.pageNumExist(this.tempPage.pageNum)) {
          alert('Page number ' + this.tempPage.pageNum + ' already exist!')
          return
        }

        await this.$store
          .dispatch('books/newPage', this.tempPage)
          .then(async () => {
            await this.uploadPhoto()
          })
          .then(() => {
            alert('OK! create new page completed!')
            this.$router.push(
              `/${settings.admin}/${this.bookid}/${
                this.$store.getters['books/getPageURLId']
              }`
            )
          })
          .catch(e => alert(e))
      }
    },
    async uploadPhoto() {
      if (!this.tempFile) {
        return
      }

      await this.$store
        .dispatch('books/uploadPhoto', this.tempFile)
        .catch(e => {
          throw e
        })
    },
    onCancel() {
      if (!this.editExistingPage) {
        const ask = confirm('Are you sure to cancel changes?')
        if (ask) {
          this.$router.push(
            `/${settings.admin}/${this.bookid}/${this.pageid - 1}`
          )
        }
      }
    },
    setImage() {
      const image = this.$refs.image.files[0]
      if (!image) {
        return
      }
      if (image.size > 2000000) {
        alert('Image must be smaller than 2M')
        return
      }
      // for upload photo function
      this.tempFile = image
      const reader = new FileReader()
      reader.onload = e => {
        this.image = e.target.result
        // reset file input for reuse later
        this.$refs.image.value = ''
      }
      reader.readAsDataURL(image)
    },
    onNextNewPage() {
      const p = parseInt(this.pageid) + 1
      this.$router.push(
        `${this.baseUrl}/${this.bookid}/${p}/${settings.newPage}`
      )
    },
    pageNumExist(pagenum) {
      const pages = this.$store.getters['books/getBook'].pages

      if (_.find(pages, { pageNum: parseInt(pagenum) })) {
        return true
      }
      return false
    },
    hasSamePageNum(pageid, pagenum) {
      const pages = this.$store.getters['books/getBook'].pages

      if (
        _.find(pages, page => {
          return page.id !== pageid && page.pageNum === parseInt(pagenum)
        })
      ) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
figure {
  display: flex;
  justify-content: center;
  align-items: center;
}
.new-page-title {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dashed #cfcfcf;
  padding-bottom: 2rem;
}
.fileinput {
  display: none;
}
.label {
  margin-top: 30px;
}
.upload {
  margin-top: 30px;
  text-align: center;
}
.upload-caption {
  cursor: pointer;
}
.img-preview {
  display: none;
}
</style>

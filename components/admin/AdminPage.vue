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
          @input="setImage"
          type="file"
          accept="image/*"
          capture="environment"
          class="fileinput"
        />
        <label for="fileInput" class="label">
          <figure>
            <mon-svg :view-box.camel="'0 0 32 32'" focusable="false">
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
      :placeholder="monText.content"
      control-type="textarea"
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
      this.tempPage.pageNum = this.page.pageNum
      this.tempPage.content = this.page.content
    },
    async onSubmit() {
      if (!this.pageEdited()) {
        return
      }

      const tempPageNum = parseInt(this.tempPage.pageNum)
      const tempPageContent = this.tempPage.content
      const pages = this.$store.getters['book/getBook'].pages
      const pageNum = parseInt(this.page.pageNum)

      if (!tempPageNum || !tempPageContent) {
        alert('Page number or content is empty!')
        return
      }

      if (!/^([1-9])([0-9]*)$/.test(tempPageNum)) {
        alert('page number must be positive number!')
        return
      }

      if (!confirm('Are you sure to save changes?')) {
        return
      }

      // update existing page
      if (this.page.id) {
        if (pageNum !== tempPageNum) {
          if (confirm(`Page number changed! Do you want to continue?`)) {
            this.$nuxt.$loading.start()

            const increasePages = _.reduce(
              pages,
              (result, value, key) => {
                if (pageNum < tempPageNum) {
                  if (pageNum < value.pageNum && value.pageNum <= tempPageNum) {
                    result.push({ id: value.id, pageNum: value.pageNum - 1 })
                  }
                }
                if (pageNum > tempPageNum) {
                  if (tempPageNum <= value.pageNum && value.pageNum < pageNum) {
                    result.push({ id: value.id, pageNum: value.pageNum + 1 })
                  }
                }
                return result
              },
              []
            )

            try {
              await this.$store.dispatch('page/updatePage', {
                page: this.tempPage,
                updatePages: increasePages
              })
              await this.uploadPhoto()
              this.$store.dispatch('page/updatePagesNum', increasePages)
              this.$router.push(
                `/${settings.admin}/${this.bookid}/${this.getPageUrlId(
                  this.tempPage
                )}`
              )
              alert('OK! This page update completed!')
            } catch (e) {
              this.$root.error({
                statusCode: 503,
                message: settings.mErrorMessages.updatePageError
              })
            }
          }
        } else {
          this.$nuxt.$loading.start()

          try {
            await this.$store.dispatch('page/updatePage', {
              page: this.tempPage,
              updatePages: []
            })
            await this.uploadPhoto()
            alert('OK! This page update completed!')
          } catch (e) {
            this.$root.error({
              statusCode: 503,
              message: settings.mErrorMessages.updatePageError
            })
          }
        }
        // insert new page
      } else if (this.pageNumExist(tempPageNum)) {
        if (
          confirm(
            `Page number ${tempPageNum} already exist! Do you want to continue?`
          )
        ) {
          this.$nuxt.$loading.start()

          const increasePages = _.reduce(
            pages,
            (result, value, key) => {
              if (value.pageNum >= tempPageNum) {
                result.push({ id: value.id, pageNum: value.pageNum + 1 })
              }
              return result
            },
            []
          )

          try {
            await this.$store.dispatch('page/newPage', {
              bookid: this.bookid,
              page: this.tempPage,
              updatePages: increasePages
            })
            await this.uploadPhoto()
            this.$store.dispatch('page/updatePagesNum', increasePages)
            this.$router.push(
              `/${settings.admin}/${this.bookid}/${this.getPageUrlId(
                this.tempPage
              )}`
            )
            alert('OK! create new page completed!')
          } catch (e) {
            this.$root.error({
              statusCode: 503,
              message: settings.mErrorMessages.newPageError
            })
          }
        }
      } else {
        this.$nuxt.$loading.start()

        try {
          await this.$store.dispatch('page/newPage', {
            bookid: this.bookid,
            page: this.tempPage,
            updatePages: []
          })
          await this.uploadPhoto()
          this.$router.push(
            `/${settings.admin}/${this.bookid}/${this.getPageUrlId(
              this.tempPage
            )}`
          )
          alert('OK! create new page completed!')
        } catch (e) {
          this.$root.error({
            statusCode: 503,
            message: settings.mErrorMessages.newPageError
          })
        }
      }

      this.$nuxt.$loading.finish()
    },
    async uploadPhoto() {
      if (!this.tempFile) {
        return
      }
      try {
        await this.$store.dispatch('page/uploadPhoto', this.tempFile)
      } catch (e) {
        this.$root.error({
          statusCode: 503,
          message: settings.mErrorMessages.uploadPhotoError
        })
      }
    },
    onCancel() {
      if (this.pageEdited() || this.tempFile) {
        const ask = confirm('Are you sure to cancel changes?')
        if (!ask) {
        } else if (this.page.id) {
          this.initVar()
          this.$forceUpdate()
          return
        }
      }

      if (!this.page.id) {
        this.$router.push(
          `/${settings.admin}/${this.bookid}/${this.pageid - 1}`
        )
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
      const pages = this.$store.getters['book/getBook'].pages

      if (_.find(pages, { pageNum: parseInt(pagenum) })) {
        return true
      }
      return false
    },
    // check if other page has same page number
    hasSamePageNum(pageid, pagenum) {
      const pages = this.$store.getters['book/getBook'].pages

      if (
        _.find(pages, page => {
          return page.id !== pageid && page.pageNum === parseInt(pagenum)
        })
      ) {
        return true
      }
      return false
    },
    pageEdited() {
      if (!this.tempFile && _.isEqual(this.page, this.tempPage)) {
        return false
      }
      return true
    },
    getPageUrlId(page) {
      const pages = this.$store.getters['book/getBook'].pages
      let index = -1
      if (page.id) {
        index = _.findIndex(pages, { id: page.id }) + 1
      } else if (page.pageNum) {
        index = _.findIndex(pages, { pageNum: parseInt(page.pageNum) }) + 1
      }
      return index
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

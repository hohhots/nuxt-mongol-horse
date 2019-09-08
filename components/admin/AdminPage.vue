<template>
  <form @submit.prevent="onSubmit">
    <div class="new-page-title">
      <span v-if="!editExistingPage">{{ monText.newPage }}</span>
    </div>
    <div class="upload">
      <div ref="preview">
        <mon-img v-if="photoExist" :src="photoExist" />
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

    <MonInputControl v-model="myPage.pageNum" :placeholder="monText.pageNum"
      >{{ monText.pageNum }}᠄</MonInputControl
    >

    <MonInputControl
      v-model="myPage.content"
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
import { mapState } from 'vuex'

import globalVariables from '@/mixins/globalVariables.js'

import AdminSaveCancel from '@/components/admin/AdminSaveCancel'
import MonInputControl from '@/components/mongol/MonInputControl'

import UploadPhoto from '@/graphql/UploadPhoto'

export default {
  components: {
    AdminSaveCancel,
    MonInputControl
  },
  mixins: [globalVariables],
  props: {
    page: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    return {
      myPage: {},
      photo: '',
      tempFile: ''
    }
  },
  computed: {
    ...mapState({
      jwt: state => state.user.jwt
    }),
    bookid() {
      return this.$route.params.bookid
    },
    pageid() {
      return this.$route.params.pageid
    },
    photoExist() {
      if (this.photo) {
        return this.photo
      }
      const id = this.myPage.id
      const type = this.myPage.imageType
      if (this.myPage && type) {
        return `${this.imagesUrl}${this.bookUrl}/${this.bookid}/${id}.${type}`
      }
      return ''
    }
  },
  watch: {
    $route(to, from) {
      this.setNewPage()
    }
  },
  beforeMount() {
    this.setNewPage()
  },
  methods: {
    setNewPage() {
      this.photo = ''
      this.myPage = { ...this.page }
      this.myPage.pageNum = this.myPage.pageNum + ''
    },
    async onSubmit() {
      if (!/^([1-9])([0-9]*)$/.test(this.myPage.pageNum)) {
        alert('page number must be number!')
        return
      }
      const bookId = `bookId: "${this.bookid}"`
      const pageId = `pageId: "${this.myPage.id}"`
      const myPage = `pageNum: ${this.myPage.pageNum}
              content: """${this.myPage.content}"""`
      let query = `
            newPage(
              ${bookId}
              ${myPage}
            )`

      if (this.myPage.id) {
        query = `
          updatePage( 
            ${pageId}
            ${myPage}
          )`
      }

      query = `mutation {
        ${query}
        {
          id
        }
      }`
      const page = await this.$axios.$post(
        '/',
        { query },
        {
          headers: { Authorization: 'Bearer ' + this.jwt }
        }
      )

      if (page.errors) {
        alert(page.errors[0].message)
      } else {
        await this.uploadPhoto(page.data)
        this.$router.push(this.adminUrl + '/' + this.bookid)
        alert('Ok!')
      }
    },
    async uploadPhoto(page) {
      if (!this.tempFile) {
        return
      }
      const paget = page.newPage || page.updatePage
      const p = await this.$apollo.mutate({
        mutation: UploadPhoto,
        variables: {
          photo: this.tempFile,
          bookId: this.bookid,
          pageId: paget.id
        },
        context: {
          headers: {
            Authorization: 'Bearer ' + this.jwt
          }
        }
        // update: (store, { data: { uploadPhoto } }) => {
        //   const data = store.readQuery({ query: ALL_PHOTOS })

        //   data.allPhotos.push(uploadPhoto)

        //   store.writeQuery({ query: ALL_PHOTOS, data })
        // }
      })

      if (p.errors) {
        alert(p.errors[0].message)
      }
    },
    onCancel() {
      this.$router.push(this.adminUrl + '/' + this.bookid)
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
      this.tempFile = image
      const reader = new FileReader()
      reader.onload = e => {
        this.photo = e.target.result
      }
      reader.readAsDataURL(image)
    },
    onNextNewPage() {
      const p = parseInt(this.pageid) + 1
      this.$router.push(`${this.baseUrl}/${this.bookid}/${p}/${this.newPage}`)
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

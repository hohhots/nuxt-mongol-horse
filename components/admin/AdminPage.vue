<template>
  <form method="post" enctype="multipart/form-data">
    <h1 v-if="!isEditPage" class="new-page-title"></h1>
    <div class="upload">
      <div ref="preview">
        <mon-img v-if="imgsrc" :src="imgsrc" width="800px" />
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
            <span class="upload-caption">{{ uploadText }}</span>
          </figure>
        </label>
      </div>
    </div>
    <MonInputControl v-model="text" control-type="textarea" placeholder=""
      ></MonInputControl
    >

    <AdminSaveCancel @onCancel="onCancel"></AdminSaveCancel>
  </form>
</template>

<script>
import AdminSaveCancel from '@/components/admin/AdminSaveCancel'
import MonInputControl from '@/components/mongol/MonInputControl'

export default {
  name: 'AdminPage',
  components: {
    AdminSaveCancel,
    MonInputControl
  },
  data: function() {
    return {
      text: '',
      image: {},
      imgsrc: '',
      page: {}
    }
  },
  computed: {
    isEditPage() {
      if (this.page.id) {
        return true
      }
      return false
    },
    uploadText() {
      return !this.imgsrc ? 'ᠳᠡᠪᠰᠢᠭᠦᠯᠦᠶ᠎ᠡ' : 'ᠰᠤᠯᠢᠶ᠎ᠠ'
    }
  },
  methods: {
    onCancel() {
      console.log('canceld!')
    },
    setImage() {
      this.image = this.$refs.image.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.imgsrc = e.target.result
      }
      reader.readAsDataURL(this.image)
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
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

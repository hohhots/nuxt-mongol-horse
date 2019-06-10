<template>
  <form method="post" enctype="multipart/form-data">
    <h1 class="new-page-title"></h1>
    <div class="upload">
      <div ref="preview"></div>
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
                d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
                class="path1"
              ></path>
            </mon-svg>
          </figure>
          <span class="upload-caption">{{ msg.upload }}</span>
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
  components: {
    AdminSaveCancel,
    MonInputControl
  },
  data: function() {
    return {
      msg: {
        upload: 'ᠳᠡᠪᠰᠢᠭᠦᠯᠦᠶ᠎ᠡ \\ ᠰᠤᠯᠢᠶ᠎ᠠ'
      },
      text: '',
      image: {},
      imgsrc: ''
    }
  },
  methods: {
    onCancel() {
      console.log('canceld!')
    },
    setImage() {
      this.image = this.$refs.image.files[0]
      console.log(this.image)
      const reader = new FileReader()
      reader.onload = e => {
        this.imgsrc = e.target.result
        this.$refs.preview.innerHTML =
          "<img src='" + this.imgsrc + "' width='600px' />"
        console.log(this.imgsrc)
      }
      reader.readAsDataURL(this.image)
    }
  }
}
</script>

<style scoped>
.new-page-title {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
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

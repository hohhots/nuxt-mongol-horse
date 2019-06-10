<template>
  <form method="post" enctype="multipart/form-data">
    <h1 class="new-page-title"></h1>
    <div class="upload">
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        capture="environment"
        class="fileinput"
      />
      <label for="fileInput">
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
    <MonInputControl
      v-model="newPage.text"
      control-type="textarea"
      placeholder=""
      ></MonInputControl
    >

    <div class="new-book">
      <MonButton type="submit" style="width: 70px"></MonButton>

      <MonButton
        type="button"
        style="width: 70px"
        btn-style="cancel"
        @click="onCancel"
        ></MonButton
      >
    </div>
  </form>
</template>

<script>
import MonInputControl from '@/components/mongol/MonInputControl'

export default {
  components: {
    MonInputControl
  },
  data: function() {
    return {
      msg: {
        upload: 'ᠳᠡᠪᠰᠢᠭᠦᠯᠦᠶ᠎ᠡ \\ ᠰᠤᠯᠢᠶ᠎ᠠ'
      },
      newPage: {
        text: '',
        image: ''
      }
    }
  },
  methods: {
    onCancel() {}
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
#fileInput {
  display: none;
}
.upload {
  margin-top: 30px;
  text-align: center;
}
.upload-caption {
  cursor: pointer;
}
</style>

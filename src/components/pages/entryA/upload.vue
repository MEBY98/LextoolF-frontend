<template>
  <div class="example-simple">
    <h1 id="example-title" class="example-title">Editor Example</h1>
    <div class="upload">
      <ul>
        <li v-for="file in files" :key="file.id">
          <span>{{ file.name }}</span>
          -
          <span>{{ file.size }}</span>
          -
          <span v-if="file.error">{{ file.error }}</span>
          <span v-else-if="file.success">success</span>
          <span v-else-if="file.active">active</span>
          <span v-else>rrrrr</span>
        </li>
      </ul>
      <div class="example-btn">
        <file-upload
          class="btn btn-primary"
          post-action="/upload/post"
          extensions="gif,jpg,jpeg,png,webp"
          accept="image/png,image/gif,image/jpeg,image/webp"
          :multiple="false"
          :size="1024 * 1024 * 10"
          v-model="files"
          ref="upload"
        >
          <i class="fa fa-plus"></i>
          Select files
        </file-upload>
        <button
          type="button"
          class="btn btn-success"
          v-if="!$refs.upload || !$refs.upload.active"
          @click.prevent="$refs.upload.active = true"
        >
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
          Start Upload
        </button>
        <button
          type="button"
          class="btn btn-danger"
          v-else
          @click.prevent="$refs.upload.active = false"
        >
          <i class="fa fa-stop" aria-hidden="true"></i>
          Stop Upload
        </button>
      </div>
    </div>
    <br />
    <br />
    <br />
    <div contenteditable="true" @paste="onPaste">Paste Content</div>
  </div>
</template>
<style>
.example-simple label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}
</style>

<script>
import FileUpload from 'vue-upload-component';
export default {
  components: {
    FileUpload,
  },

  data() {
    return {
      files: [],
    };
  },

  methods: {
    onPaste(e) {
      console.log(e);
      let dataTransfer = e.clipboardData;
      if (!dataTransfer) {
        return;
      }
      this.$refs.upload.addDataTransfer(dataTransfer);
    },
  },
};
</script>

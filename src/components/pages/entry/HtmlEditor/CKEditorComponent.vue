<template>
  <div :style="isFocus ? styleFocus : style">
    <ckeditor
      :model-value="value"
      :editor="editor"
      :config="editorConfig"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    ></ckeditor>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import InlineEditor from '@meby98/ckeditor5-custom-build';
export default defineComponent({
  components: {
    ckeditor: CKEditor.component,
  },
  props: {
    value: {
      type: String,
      default: () => '',
    },
  },
  emits: ['input'],
  setup(props, context) {
    const isFocus = ref(false);
    const onBlur = () => {
      isFocus.value = false;
    };
    const onFocus = () => {
      isFocus.value = true;
    };
    const onInput = (input) => {
      context.emit('input', input);
    };
    return {
      isFocus,
      editor: InlineEditor,
      editorConfig: {
        placeholder: 'Escriba el elemento',
        fontFamily: {
          options: [
            'Arial',
            'Courier New',
            'Georgia',
            'Lucida Sans Unicode',
            'Tahoma',
            'Times New Roman',
            'Trebuchet MS',
            'Verdana',
          ],
          supportAllValues: true,
        },
        fontSize: {
          options: [9, 11, 13, 'default', 17, 19, 21],
          supportAllValues: true,
        },
        fontColor: {
          colors: [
            {
              color: 'hsl(0, 70%, 50%)',
              label: 'Rojo',
            },
            {
              color: 'hsl(25, 70%, 50%)',
              label: 'Naranja',
            },
            {
              color: 'hsl(62, 95%, 50%)',
              label: 'Amarillo',
            },
            {
              color: 'hsl(247, 88%, 33%)',
              label: 'Azul oscuro',
            },
            {
              color: 'hsl(107, 95%, 50%)',
              label: 'Verde',
            },
            {
              color: 'hsl(201, 95%, 50%)',
              label: 'Azul claro',
              hasBorder: true,
            },
          ],
          columns: 3,
        },
        fontBackgroundColor: {
          colors: [
            {
              color: 'var(--ck-highlight-marker-pink)',
              label: 'Rosado',
            },
            {
              color: 'hsl(25, 70%, 50%)',
              label: 'Naranja',
            },
            {
              color: 'var(--ck-highlight-marker-yellow)',
              label: 'Amarillo',
            },
            {
              color: 'var(--ck-highlight-marker-blue)',
              label: 'Azul oscuro',
            },
            {
              color: 'var(--ck-highlight-marker-green)',
              label: 'Verde',
            },
          ],
          columns: 3,
        },
        // highlight: {
        //   options: [
        //     {
        //       model: 'yellowMarker',
        //       class: 'marker-yellow',
        //       title: 'Yellow Marker',
        //       color: 'var(--ck-highlight-marker-yellow)',
        //       type: 'marker',
        //     },
        //     {
        //       model: 'greenMarker',
        //       class: 'marker-green',
        //       title: 'Green marker',
        //       color: 'var(--ck-highlight-marker-green)',
        //       type: 'marker',
        //     },
        //     {
        //       model: 'pinkMarker',
        //       class: 'marker-pink',
        //       title: 'Pink marker',
        //       color: 'var(--ck-highlight-marker-pink)',
        //       type: 'marker',
        //     },
        //     {
        //       model: 'blueMarker',
        //       class: 'marker-blue',
        //       title: 'Blue marker',
        //       color: 'var(--ck-highlight-marker-blue)',
        //       type: 'marker',
        //     },
        //   ],
        // },
        alignment: {
          options: ['left', 'right', 'center', 'justify'],
        },
        toolbar: [
          'alignment',
          '|',
          'bold',
          'italic',
          'strikethrough',
          'underline',
          'subscript',
          'superscript',
          '|',
          'fontFamily',
          'fontSize',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'blockQuote',
          '|',
          'specialCharacters',
        ],
      },
      onInput,
      onBlur,
      onFocus,
      styleFocus: {
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#aee6fe',
        borderRadius: '3px',
        boxShadow: '3px 3px 3px #ccc',
      },
      style: {
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#ccc',
        borderRadius: '3px',
      },
    };
  },
});
</script>

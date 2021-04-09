<template>
  <div v-if="vueobject" class="w-100 position-relative">
    <a-form-item
      ref="formItem"
      :has-feedback="true"
      :style="custom_style"
      :validate-status="object.$error?'error':!object.$invalid && successFeed?'success':''"
    >
      <popover-validation
        :container="self_container"
        :placement="popoverPlacement"
        :text="getText"
        :show="object.$error && hover"
      >
        <div @mouseenter="hover = true"  @mouseleave="hover = false" class="d-inline-flex w-100">
          <a-time-picker
            class="w-100"
            :disabled="disabled"
            :defaultValue="defaultValue"
            :showTime="{ format: 'HH:mm a' }"
            :size="size"
            :format="dateFormat"
            :disabledDate= "disabledDate"
            :disabledTime= "disabledTime"
            :value="value "
            :defaultPickerValue="defaultDateValue"
            @select="onChange"
            @change="onChange"
          />
        </div>
      </popover-validation>
    </a-form-item>
  </div>
</template>

<script>
import moment from "moment";
import { TcInputMixing } from "../tc-input/tc-inputs-mixing";
export default {
  props: {
    disabledDate:{
      type:Function ,
      default: ()=> {}
    },
    timePicker:{
      type:Boolean ,
      default: false
    },
    disabledTime:{
      type:Function,
      default: ()=> {}
    },
    custom_style:{
      type:Object,
      default:null
    },
    defaultValue: {
      type: String,
      default: ""
    },
    dateFormat: {
      type: String,
      default: "HH:mm"
    },
    value: {
        type:Object,
        default: ()=> {}
    }
  },
  mixins: [TcInputMixing],
  computed: {
    defaultDateValue() {

    },

  },
  methods: {
    onChange(date, dateString) {
      this.$emit("change", date);
    },
  },
  components: {},
  data() {
    return {
      moment,
    };
  }
};
</script>

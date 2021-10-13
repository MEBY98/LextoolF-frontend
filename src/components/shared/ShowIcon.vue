<script lang="ts">
import { defineComponent, h, computed } from 'vue';
import {
  EyeFilled,
  EditFilled,
  DeleteFilled,
  DeleteOutlined,
  PlusSquareFilled,
  CarryOutFilled,
  SettingOutlined,
  PlusOutlined,
  SaveOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  RightOutlined,
  LeftOutlined,
  MinusCircleFilled,
  LineOutlined,
  UploadOutlined,
  TeamOutlined,
  ReadOutlined,
  BookOutlined,
  BookFilled,
  QuestionOutlined,
  MinusOutlined,
  CheckOutlined,
  FileExcelFilled,
  FormOutlined,
  AimOutlined,
  TagOutlined,
  RollbackOutlined,
  BarChartOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    EyeFilled,
    EditFilled,
    DeleteFilled,
    DeleteOutlined,
    PlusSquareFilled,
    CarryOutFilled,
    SettingOutlined,
    PlusOutlined,
    SaveOutlined,
    LeftCircleOutlined,
    RightCircleOutlined,
    RightOutlined,
    LeftOutlined,
    MinusCircleFilled,
    LineOutlined,
    UploadOutlined,
    ReadOutlined,
    TeamOutlined,
    BookOutlined,
    BookFilled,
    QuestionOutlined,
    MinusOutlined,
    CheckOutlined,
    FileExcelFilled,
    FormOutlined,
    AimOutlined,
    TagOutlined,
    RollbackOutlined,
    BarChartOutlined,
  },
  props: {
    icon: {
      type: String,
    },
    styleIcon: {
      type: Object,
      default: () => {
        return {
          fontSize: '25px',
          color: '#08c',
          marginBottom: '5px',
          marginLeft: '10px',
          opacity: 1,
        };
      },
    },
  },
  emits: ['click'],
  setup(props, context) {
    const click = () => {
      context.emit('click');
    };
    const icon = computed(() => {
      if (props.icon === 'PlusSquareFilled') return PlusSquareFilled;
      else if (props.icon === 'PlusOutlined') return PlusOutlined;
      else if (props.icon === 'EyeFilled') return EyeFilled;
      else if (props.icon === 'EditFilled') return EditFilled;
      else if (props.icon === 'DeleteFilled') return DeleteFilled;
      else if (props.icon === 'BookOutlined') return BookOutlined;
      else if (props.icon === 'BookFilled') return BookFilled;
      else if (props.icon === 'TeamOutlined') return TeamOutlined;
      else if (props.icon === 'CarryOutFilled') return CarryOutFilled;
      else if (props.icon === 'ReadOutlined') return ReadOutlined;
      else if (props.icon === 'RightCircleOutlined') return RightCircleOutlined;
      else if (props.icon === 'LeftCircleOutlined') return LeftCircleOutlined;
      else if (props.icon === 'RightOutlined') return RightOutlined;
      else if (props.icon === 'LeftOutlined') return LeftOutlined;
      else if (props.icon === 'SettingOutlined') return SettingOutlined;
      else if (props.icon === 'MinusCircleFilled') return MinusCircleFilled;
      else if (props.icon === 'UploadOutlined') return UploadOutlined;
      else if (props.icon === 'DeleteOutlined') return DeleteOutlined;
      else if (props.icon === 'LineOutlined') return LineOutlined;
      else if (props.icon === 'FileExcelFilled') return FileExcelFilled;
      else if (props.icon === 'FormOutlined') return FormOutlined;
      else if (props.icon === 'AimOutlined') return AimOutlined;
      else if (props.icon === 'TagOutlined') return TagOutlined;
      else if (props.icon === 'RollbackOutlined') return RollbackOutlined;
      else if (props.icon === 'BarChartOutlined') return BarChartOutlined;
      else if (props.icon === 'NotDescribe') return QuestionOutlined;
      else if (props.icon === 'NoApply') return MinusOutlined;
      else if (props.icon === 'Describe') return CheckOutlined;
      else return SaveOutlined;
    });
    const r = () =>
      h(icon.value, {
        style: props.styleIcon,
        onClick: click,
      });
    return () => r();
  },
});
</script>

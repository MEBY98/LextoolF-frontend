<script lang="ts">
import { computed, defineComponent, h } from 'vue';
import UbicationReport from './UbicationReport/UbicationReport.vue';
import TypeOfUfReport from './TypeOfUfReport/TypeOfUfReport.vue';
export default defineComponent({
  components: {
    UbicationReport,
    TypeOfUfReport,
  },
  props: {
    reportName: {
      type: String,
    },
    elements: {
      type: Array,
    },
    dictionaries: {
      type: Array,
    },
  },
  setup(props) {
    const selectedReport = computed(() => {
      if (props.reportName === 'Ubicación') return UbicationReport;
      else return TypeOfUfReport;
    });
    const r = () =>
      h(selectedReport.value, {
        elements: props.elements,
        dictionaries: props.dictionaries,
      });
    return () => r();
  },
});
</script>

import { ref } from 'vue';

export default function UseUploadedExcelReport() {
  const showUploadedExcelReport = ref(false);
  const showUploadedExcelReportMethod = () => {
    showUploadedExcelReport.value = true;
  };
  const closeUploadedExcelReportMethod = () => {
    showUploadedExcelReport.value = false;
  };
  return {
    showUploadedExcelReport,
    showUploadedExcelReportMethod,
    closeUploadedExcelReportMethod,
  };
}

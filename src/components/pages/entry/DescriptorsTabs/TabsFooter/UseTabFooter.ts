export default function UseTabFooter(context) {
  const save = () => {
    context.emit('save');
  };
  const goNextTab = () => {
    context.emit('go-next-tab');
  };
  const goPreviewTab = () => {
    context.emit('go-preview-tab');
  };
  const goEntries = () => {
    context.emit('go-entries');
  };
  return { save, goNextTab, goPreviewTab, goEntries };
}

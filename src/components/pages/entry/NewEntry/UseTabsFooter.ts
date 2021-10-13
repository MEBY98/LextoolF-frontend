import { Ref } from 'vue';
import UseRoutes from '@/router/UseRoutes';
import { store } from '@/store/store';

export default function UseTabsFooter(activeKey: Ref<number>) {
  const { goToEntries } = UseRoutes();
  const goNextTab = () => {
    activeKey.value++;
  };
  const goPreviewTab = () => {
    activeKey.value--;
  };
  const goEntries = () => {
    goToEntries(store.study);
  };
  return { goNextTab, goPreviewTab, goEntries };
}

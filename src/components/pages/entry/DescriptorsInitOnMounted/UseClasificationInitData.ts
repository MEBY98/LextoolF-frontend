import { Clasification as ClasificationModel } from '@/graphql/modules/clasification/model';
import { store } from '@/store/store';
export default function UseClasificationInitData() {
  const ClasificationInitData = async () => {
    store.layout.isLoading = true;
    store.layout.loadingTip = 'Cargando clasificationes';
    const dataAllClasifications = await ClasificationModel.getAllClasifications();
    store.clasifications = dataAllClasifications.data.getAllClasifications;
    store.layout.isLoading = false;
    store.layout.loadingTip = '';
  };
  return {
    ClasificationInitData,
  };
}

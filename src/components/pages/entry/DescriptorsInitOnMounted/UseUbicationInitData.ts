import { Ubication as UbicationModel } from '@/graphql/modules/ubication/model';
import { store } from '@/store/store';
export default function UseUbicationInitData() {
  const UbicationInitData = async () => {
    store.layout.isLoading = true;
    store.layout.loadingTip = 'Cargando ubicaciones';
    const dataAllUbications = await UbicationModel.getAllUbications();
    store.ubications = dataAllUbications.data.getAllUbications;
    store.layout.isLoading = false;
    store.layout.loadingTip = '';
  };
  return {
    UbicationInitData,
  };
}

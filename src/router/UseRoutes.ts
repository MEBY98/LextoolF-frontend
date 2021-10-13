import { useRouter, useRoute } from 'vue-router';
import { FraseologicStudy } from '@/models/FraseologicStudy';
import { store } from '@/store/store';

export default function UseRoutes() {
  const router = useRouter();
  const route = useRoute();

  const goToStudies = () => {
    router.push({ name: 'studies' });
  };
  const goToNewStudy = () => {
    router.push({ name: 'newStudy' });
  };
  const goToDictionariesInfo = () => {
    router.push({ name: 'dictionariesInfo' });
  };
  const goToAuthors = () => {
    router.push({ name: 'authors' });
  };
  const goToEditStudy = (id: string) => {
    router.push({ name: 'editStudy', params: { id: id } });
  };
  const goToEntries = (selectedStudy: FraseologicStudy) => {
    store.study = selectedStudy;
    router.push({ name: 'entries' });
  };
  const goToNewEntry = (letter: string) => {
    router.push({ name: 'newEntry', params: { letter } });
  };
  const goToEditEntry = (id: string) => {
    router.push({ name: 'editEntry', params: { id } });
  };
  const goDescriptors = () => {
    router.push({ name: 'descriptors' });
  };
  const goUbications = () => {
    router.push({ name: 'ubications' });
  };
  const goClasifications = () => {
    router.push({ name: 'clasifications' });
  };

  return {
    route,
    router,
    goToStudies,
    goToDictionariesInfo,
    goToAuthors,
    goToNewStudy,
    goToEditStudy,
    goToEntries,
    goToNewEntry,
    goToEditEntry,
    goDescriptors,
    goUbications,
    goClasifications,
  };
}

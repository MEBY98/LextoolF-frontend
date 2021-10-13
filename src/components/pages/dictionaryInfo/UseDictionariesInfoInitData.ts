import { DictionaryInfo as DictionaryInfoModel } from '@/graphql/modules/dictionaryInfo/model';
import { Author as AuthorModel } from '@/graphql/modules/author/model';
import { store } from '@/store/store';

export default function UseDictionariesInfoInitData() {
  const dictionariesInfoInitData = async () => {
    const dataDictionaryInfo = await DictionaryInfoModel.getAllDictionaryInfo();
    store.dictionariesInfo = dataDictionaryInfo.data.getAllDictionaryInfo;
    const dataAuthor = await AuthorModel.getAllAuthors();
    store.authors = dataAuthor.data.getAllAuthors;
    console.log('store', store);
  };
  return {
    dictionariesInfoInitData,
  };
}

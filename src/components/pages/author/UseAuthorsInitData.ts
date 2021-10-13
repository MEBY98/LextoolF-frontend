import { Author as AuthorModel } from '@/graphql/modules/author/model';
import { store } from '@/store/store';

export default function UseAuthorsInitData() {
  const AuthorsInitData = async () => {
    const dataAuthor = await AuthorModel.getAllAuthors();
    store.authors = dataAuthor.data.getAllAuthors;
  };
  return {
    AuthorsInitData,
  };
}

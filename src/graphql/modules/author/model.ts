import { apolloMutate, apolloQuery } from '@/graphql/apollo';
import { apolloClient, FetchPolicy } from '@/graphql/apolloProvider';
import { getAllAuthorsQuery } from './querys';
import { createAuthorMutation, editAuthorMutation } from './mutations';

export class Author {
  static getAllAuthors() {
    return apolloQuery(
      getAllAuthorsQuery,
      null,
      FetchPolicy.network_only,
      apolloClient
    );
  }
  static createAuthor(newAuthor) {
    return apolloMutate(createAuthorMutation, { newAuthor }, null, null);
  }
  static editAuthor(editedAuthor) {
    return apolloMutate(editAuthorMutation, { editedAuthor }, null, null);
  }
}

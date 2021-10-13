export class AuthorStore {
  id: string;
  name: string;
  siglas: string;
}

export class DictionaryInfoStore {
  id: string;
  name: string;
  siglas: string;
  author: AuthorStore[];
  annoOfPublication: number;
  reference: string;
}

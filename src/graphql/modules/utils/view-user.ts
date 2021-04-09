import { Address } from './address.model';
import { BaseType } from './base-type';

export class ViewUser extends BaseType {
  email: string;
  name: string;
  address?: Address;
  description?: string;
  imgProfile?: string;
}

import { User } from './user.model';
import { BaseService } from './../base/baseService';

export class UserService extends BaseService<User>('user') {}

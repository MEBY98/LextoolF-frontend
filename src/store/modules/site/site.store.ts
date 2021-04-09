import CryptoJS from 'crypto-js';
import { User } from './../../../graphql/modules/user/user.model';
import * as jwt from 'jsonwebtoken';
import { AuthService } from './../../../graphql/modules/auth/auth.service';
import { apolloClient } from './../../../graphql/apolloProvider';
import { store } from '@/store/store';
import router from './../../../router/router';

const TOKEN_KEY =
  '2f77668a9dfbf8d5848b9eeb4a7145ca94c6ed9236e4a773f6dcafa5132b2f91';
const CANDY_KEY = 'L3dmip37NWEi57rSnFFypTG7ZI2=';
export const CLIENT = 'Client';
export const OWNER = 'Owner';

interface UpdateInStorage {
  name?: string;
  imgProfile?: string;
}

interface TokenObject {
  token: string;
  updated?: UpdateInStorage;
}

export class SiteStore {
  user: User;
  token: string;
  expiresIn: number;
  isSessionClosed: boolean;

  public saveUserData({ user, token, expiresIn, updated }) {
    if (!this.user) {
      this.user = new User(user);
    } else {
      this.user.assign(user);
    }
    this.saveToken(token, expiresIn, updated);
  }

  public async logout() {
    this.isSessionClosed = true;
    const navigationFailure = await router.push({ name: 'login' });
    if (!navigationFailure) {
      this.resetStore();
      apolloClient.resetStore();
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  private resetStore() {
    store.site = new SiteStore();
  }

  private saveToken(token: string, expiresIn, updated = {}) {
    this.token = token;

    let encriptedToken = this.encryptToken({ token, updated });
    localStorage.setItem(TOKEN_KEY, encriptedToken);
    this.initRefreshTokenMechanism(expiresIn);
  }

  private encryptToken(token: TokenObject): string {
    const ciphertext = CryptoJS.Rabbit.encrypt(
      JSON.stringify(token),
      CANDY_KEY
    ).toString();
    return ciphertext;
  }

  private decryptToken(ciphertext): TokenObject {
    const bytes = CryptoJS.Rabbit.decrypt(ciphertext, CANDY_KEY);
    const token = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(token);
  }

  private initRefreshTokenMechanism(expiresIn) {
    setTimeout(async () => {
      const result = await AuthService.refreshToken();
      if (result.data?.refreshToken) {
        const { expiresIn, refreshToken } = result.data.refreshToken;
        this.saveToken(refreshToken, expiresIn);
      }
    }, expiresIn);
    return;
  }

  public tryAutoLogin() {
    const encriptedToken = localStorage.getItem(TOKEN_KEY);
    if (!encriptedToken) {
      console.log('try autologin failed! has no token');
      return;
    }

    const tokenObject: TokenObject = this.decryptToken(encriptedToken);

    const { token, updated } = tokenObject;

    let decoded = jwt.decode(tokenObject.token);

    if (decoded && decoded.sub) {
      const { expiresAt, payload } = decoded;
      const now = Date.now();
      let expiresIn = expiresAt - now;

      let updatedPayload = { ...payload, ...updated };

      if (expiresIn < 60000 * 5) {
        console.log('try autologin failed! token expires in 5min');
        return;
      } else {
        console.log('try autologin success!');
        this.saveUserData({ user: updatedPayload, token, expiresIn, updated });
      }
    } else {
      console.log('try autologin failed! token expired');
      return;
    }
  }

  public updateInStorage(data: UpdateInStorage) {
    const encriptedToken = localStorage.getItem(TOKEN_KEY);
    if (!encriptedToken) {
      return;
    }

    const tokenObject: TokenObject = this.decryptToken(encriptedToken);
    tokenObject.updated = { ...tokenObject.updated, ...data };

    const tokenEncrypted = this.encryptToken(tokenObject);
    localStorage.setItem(TOKEN_KEY, tokenEncrypted);
  }
}

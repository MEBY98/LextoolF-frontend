import Vue, { reactive } from 'vue';
import { SiteStore, CLIENT, OWNER } from './modules/site/site.store';
import { User } from './../graphql/modules/user/user.model';
import { LayoutStore } from './modules/layout/layout.store';

export const store = reactive({
  site: new SiteStore(),
  layout: new LayoutStore(),

  get isAuth(): boolean {
    return this.site.user ? true : false;
  },

  get user(): User {
    return this.site.user;
  },

  get userName(): string {
    const nameSplit = this.site.user.name.split(' ');
    return nameSplit.length > 1 ? nameSplit[0] : this.site.user.name;
  },

  get isClient(): boolean {
    return this.isAuth && this.site.user?.accountType == CLIENT;
  },

  get isOwner(): boolean {
    return this.isAuth && this.site.user?.accountType == OWNER;
  },
});

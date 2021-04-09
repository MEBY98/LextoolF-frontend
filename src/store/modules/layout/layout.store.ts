export class LayoutStore {
  searchIsOpen: boolean;
  loginModalOpen: boolean;
  isLoading: boolean;
  loadingTip: string;

  constructor() {
    this.searchIsOpen = false;
    this.loginModalOpen = false;
    this.isLoading = false;
    this.loadingTip = '';
  }

  loading(tip, isLoading = true) {
    this.loadingTip = tip;
    this.isLoading = isLoading;
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }
}

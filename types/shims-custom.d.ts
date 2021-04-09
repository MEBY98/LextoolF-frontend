import { store } from '../src/store/store';
import { ModalOptions, ModalConfirm } from 'ant-design-vue/types/modal';
import { Message } from 'ant-design-vue/types/message';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: typeof store;
    $message: Message;
    $info: (options: ModalOptions) => ModalConfirm;
    $success: (options: ModalOptions) => ModalConfirm;
    $error: (options: ModalOptions) => ModalConfirm;
    $warning: (options: ModalOptions) => ModalConfirm;
    $confirm: (options: ModalOptions) => ModalConfirm;
  }
}

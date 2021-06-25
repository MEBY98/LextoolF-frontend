import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/lib/message/style';
import 'ant-design-vue/lib/modal/style';

import Antd from 'ant-design-vue';
import configProvider from 'ant-design-vue/lib/config-provider';
import message from 'ant-design-vue/lib/message';
import modal from 'ant-design-vue/lib/modal';

message.config({
  top: '70px',
  duration: 2,
  maxCount: 3,
});

export function antdGlobal(app) {
  app.config.globalProperties.$message = message;
  app.config.globalProperties.$info = modal.info;
  app.config.globalProperties.$success = modal.success;
  app.config.globalProperties.$error = modal.error;
  app.config.globalProperties.$warning = modal.warning;
  app.config.globalProperties.$confirm = modal.confirm;

  app.use(configProvider);
  app.use(Antd);
}

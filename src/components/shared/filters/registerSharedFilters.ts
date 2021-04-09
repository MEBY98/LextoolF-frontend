import moment from 'moment';

export const registerSharedFilters = (app) => {
  app.config.globalProperties.$filters = {
    firtTime(value) {
      const str = moment(new Date(Number.parseInt(value))).format('DD MM YYYY');
      return str.split(' ').join('.');
    },
    momentFormat(value, format) {
      return moment(new Date(Number.parseInt(value))).format(format);
    },
  };
};

import angualr from 'angular';
import uirouter from 'angular-ui-router';

import config from './app.config';
import AppCtrl from './app.controller';

export default angular
  .module('app', [
    uirouter
  ])
  .controller('AppCtrl', AppCtrl)
  .config(config)
  .name;
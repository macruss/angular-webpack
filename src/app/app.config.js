/*@ngInject*/
export default function config(
  $urlRouterProvider,
  $locationProvider,
  $compileProvider
  ) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $urlRouterProvider.otherwise('/');

  $compileProvider.debugInfoEnabled(ENV == 'dev');
}
let token = window.localStorage['token'];
namespace secure {

    angular.module('secure', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/ngApp/views/home.html',
            controller: secure.Controllers.HomeController,
            controllerAs: 'vm'
        })
        .state('login', {
            url: '/login',
            templateUrl: '/ngApp/views/login.html',
            controller: secure.Controllers.LoginController,
            controllerAs: 'vm'
        })
        .state('admin', {
            url: '/adminLogin',
            templateUrl: '/ngApp/views/admin.html',
            controller: secure.Controllers.AdminLoginController,
            controllerAs: 'vm'
        })

        .state('register', {
            url: '/register',
            templateUrl: '/ngApp/views/register.html',
            controller: secure.Controllers.RegisterController,
            controllerAs: 'vm'
        })
        .state('addReminder', {
            url: '/addReminder',
            templateUrl: '/ngApp/views/addReminder.html',
            controller: secure.Controllers.ReminderController,
            controllerAs: 'vm'
        })
        .state('editReminder', {
            url: '/editReminder/:id',
            templateUrl: '/ngApp/views/editReminder.html',
            controller: secure.Controllers.EditController,
            controllerAs: 'vm'
        })
        .state('admin-view', {
            url: '/admin-view',
            templateUrl: '/ngApp/views/adminView.html',
            controller: secure.Controllers.AdminViewController,
            controllerAs: 'vm'
        })

            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });



}

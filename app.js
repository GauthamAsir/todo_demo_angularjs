
var app = angular.module("todoApp", ['ngRoute', 'ngMaterial']);

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/dashboard.html',
            controller: 'todoCtrl'
        })
        .when('/create', {
            templateUrl: 'views/create_todo.html',
            controller: 'todoCtrl'
        })
        .when('/update/:id', {
            templateUrl: 'views/update_todo.html',
            controller: 'todoCtrl'
        })
        .when('/list', {
            templateUrl: 'views/list_todos.html',
            controller: 'todoCtrl'
        })
        .when('/todo_details/:id', {
            templateUrl: 'views/todo_details.html',
            controller: 'todoCtrl'
        })
        .otherwise({
            templateUrl: 'views/404.html',
        });
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });
    $locationProvider.hashPrefix('');
});



// To Stacktrace Route Changes
// app.run(function ($rootScope) {
//     $rootScope.$on('$routeChangeStart', function (event, next, current) {
//         console.log(event);
//         console.log(current);
//         console.log(next);
//         console.log('$routeChangeStart: ' + next.originalPath)
//     });
// });
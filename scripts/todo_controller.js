app.service('todoService', function () {

    var todos = [{
        id: 1,
        title: 'Static Test TODO 1', description: 'deded', daysTaken: 2,
        createdDate: new Date(), lastModified: new Date()
    }];

    this.getTodos = function () {
        return todos;
    }
    this.createNewTodo = function (title_in, description_in, daysTaken_in) {
        todos.push(
            {
                id: todos.length + 1,
                title: title_in,
                description: description_in,
                daysTaken: daysTaken_in,
                createdDate: new Date(),
                lastModified: new Date()
            }
        );
    }

    this.updateTodo = function (id, title_up, description_up, daysTaken_up) {
        var objIndex = todos.findIndex((obj => obj.id == id));
        var t = todos[objIndex];
        todos[objIndex] = {
            id: t.id,
            title: title_up,
            description: description_up,
            daysTaken: daysTaken_up,
            createdDate: t.createdDate,
            lastModified: new Date()
        };
    }

    this.deleteTodo = function (id) {
        var objIndex = todos.findIndex((obj => obj.id == id));
        todos.splice(objIndex, 1);
    }
});


app.controller('todoCtrl', function ($scope, $location, todoService, $routeParams, $mdDialog, $mdToast) {

    $scope.todos = [];

    $scope.todoList = function () {
        $scope.todos.clear;
        $scope.todos = todoService.getTodos();
        // console.log($scope.todos)
    }

    $scope.getTodo = function (id) {
        $scope.todoC = todoService.getTodos()[id];
        // console.log($scope.todos)
    }

    $scope.initDetails = function () {
        var id = $routeParams.id;
        var t = todoService.getTodos().find(tt => tt.id == id);

        $scope.title_d = t.title;
        $scope.description_d = t.description;
        $scope.daysTaken_d = t.daysTaken;
        $scope.createdDate_d = t.createdDate;
        $scope.lastModified_d = t.lastModified;
        $scope.id_d = t.id;
    }

    $scope.initUpdate = function () {
        var id = $routeParams.id;
        var t = todoService.getTodos().find(tt => tt.id == id);

        $scope.title_up = t.title;
        $scope.description_up = t.description;
        $scope.daysTaken_up = t.daysTaken;
    }

    $scope.goTo = function (hash) {
        $location.path(hash);
        // console.log(hash);
    }

    $scope.createTodo = function () {
        todoService.createNewTodo($scope.title_in, $scope.description_in, $scope.daysTaken_in);
        $scope.goTo('/list');
        $scope.showToast('TODO Added Succesfully');
    }

    $scope.updateTodo = function () {
        var id = $routeParams.id;
        todoService.updateTodo(id, $scope.title_up, $scope.description_up, $scope.daysTaken_up);
        $scope.goTo('/list');
        $scope.showToast('TODO Updated Succesfully');
    }

    $scope.showToast = function (message) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .hideDelay(3000)
                .position("top right")
        );
    }

    $scope.confirmDeleteProduct = function (id) {

        // set id of record to delete
        $scope.id = id;

        // dialog settings
        var confirm = $mdDialog.confirm()
            .title('Are you sure?')
            .textContent('Product will be deleted.')
            .targetEvent(event)
            .ok('Yes')
            .cancel('No');

        // show dialog
        $mdDialog.show(confirm).then(
            // 'Yes' button
            function () {
                // if user clicked 'Yes', delete product record
                // $scope.deleteProduct();
                todoService.deleteTodo(id);
            },

            // 'No' button
            function () {
                // hide dialog
            }
        );
    }

    $scope.goBack = function () {
        window.history.back();
    };

});
app.controller('chatController', ['$scope', ($scope) => {
    $scope.onlineList = [];
    $scope.activeTab = 1;

    $scope.changeTab = (tab) => {
        $scope.activeTab = tab;
    };

    const socket = io.connect("http://localhost:3000");

    socket.on('onlineList', (users) => {
        $scope.onlineList = users;
        $scope.$apply();
    });
}]);
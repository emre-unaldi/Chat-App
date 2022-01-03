app.controller('chatController', ['$scope', ($scope) => {
    /**
     * Angular variables
     */
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 2;

    /**
     * Socket.io event handling.
     */
    const socket = io.connect("http://localhost:3000");

     // onlineList emitini karşılama ve arayüzde listeleme
    socket.on('onlineList', (users) => {
        $scope.onlineList = users;
        $scope.$apply();
    });

    // roomList emitini karşılama ve arayüzde listeleme
    socket.on('roomList', (rooms) => {
        $scope.roomList = rooms;
        $scope.$apply();
    });

    // Oda Oluşturma fonksiyonu
    $scope.newRoom = () => {
        let randomName = Math.random().toString(36).substring(7);
        socket.emit('newRoom', (randomName)); // backende emit isteği yapıyoruz
    };

    $scope.changeTab = (tab) => {
        $scope.activeTab = tab;
    };
    
}]);
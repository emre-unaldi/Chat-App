app.controller('chatController', ['$scope', ($scope) => {
    /**
     * Angular variables
     */
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked = false;
    $scope.chatName = "";

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

    // sohbet detayını arayüzde gösterme
    $scope.switchRoom = (room) => {
        $scope.chatName = room.roomName;
        $scope.chatClicked = true;
    };

    // Oda Oluşturma fonksiyonu
    $scope.newRoom = () => {
        //let randomName = Math.random().toString(36).substring(7);
        let roomName = window.prompt("Enter room name");
        if (roomName !== '' && roomName !== null ) {
            socket.emit('newRoom', (roomName)); // backende emit isteği yapıyoruz
        }
        
    };

    $scope.changeTab = (tab) => {
        $scope.activeTab = tab;
    };
    
}]);
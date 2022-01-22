app.controller('chatController', ['$scope', 'chatFactory', 'userFactory', ($scope, chatFactory, userFactory) => {
    /**
     * initialization
     */
    
    function init() {
        userFactory.getUser().then((user) => {
            $scope.user = user;
        })
    }
    init();

    /**
     * Angular variables
     */
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked = false;
    $scope.chatName = "";
    $scope.roomId = "";
    $scope.message = "";
    $scope.messages = [];
    $scope.user = {};

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

    // backend'e newMessage event'i isteği
    $scope.newMessage = () => {
        socket.emit('newMessage', {
            message: $scope.message,
            roomId: $scope.roomId
        });
        $scope.message = "";

        console.log($scope.user);
    };

    // sohbet detayını arayüzde gösterme
    $scope.switchRoom = (room) => {
        $scope.chatName = room.name
        $scope.roomId = room.id;
        $scope.chatClicked = true;

        chatFactory.getMessages(room.id).then((data) => { // angular servisi ile mesajları çekme
            //console.log(data);
            $scope.messages[room.id] = data;
            //console.log($scope.messages);
        })
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
app.controller('chatController', ['$scope', 'chatFactory', 'userFactory', ($scope, chatFactory, userFactory) => {
    /**
     * initialization
     */
    // hangi kullanıcı ile girilmişse onun verisine erişmek için
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
    $scope.loadingMessages = false;

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

    // mesajların anlık olarak gösterilmesi
    socket.on('receiveMessage', (data) => {
        $scope.messages[data.roomId].push({
            userId: data.userId,
            username: data.username,
            surname: data.surname,
            message: data.message
        });

        $scope.$apply();
    });

    // backend'e newMessage event'i isteği
    $scope.newMessage = () => {
        if ($scope.message.trim() !== ''){  // mesaj kutusu boş değilse
            socket.emit('newMessage', {
                message: $scope.message,
                roomId: $scope.roomId
            });

            // kullanıcının mesajlarının gösterilmesi
            $scope.messages[$scope.roomId].push({
                userId: $scope.user._id,
                username: $scope.user.name,
                surname: $scope.user.surname,
                message: $scope.message
            });

            $scope.message = "";
        }
    };

    // sohbet detayını arayüzde gösterme
    $scope.switchRoom = (room) => {
        $scope.chatName = room.name
        $scope.roomId = room.id;

        $scope.chatClicked = true;
       
        /*
            Mesaj verisi varsa tekrardan servise bağlanmadan varolan veriyi kullanmak ve 
            sürekli olarak bağlantı kurmamak için kontrol yapısı kuruldu.
        */
        if (!$scope.messages.hasOwnProperty(room.id)){ // room.id de key yoksa cliente yani servise bağlanacak veriyi cekecek 
            $scope.loadingMessages = true;

            //console.log('Servise Bağlanıyor...');

            chatFactory.getMessages(room.id).then((data) => { // angular servisi ile mesajları çekme
                $scope.messages[room.id] = data;
                $scope.loadingMessages = false;
            })
        }

        
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
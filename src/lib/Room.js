const redisClient = require('../redisClient'); 

// Rooms sınıfı
function Rooms(){ // Bu sınıf çalıştığında constructor da çalışmış olcak ve redise bağlantı kurulacak.
    this.client = redisClient.getClient();
}

module.exports = new Rooms();

// Oda Oluşturma fonksiyonu 
Rooms.prototype.upsert = function (roomName){
    this.client.hset( 
        'rooms',  // myhash değerimizin karşılığı/adı
        roomName, // odamızın adı roomName
        JSON.stringify({ // oda ile ilgili detayları içeren data
            roomName,
            when: Date.now()
        }),
        err => {
            if(err){
                console.log(err);
            }
        }
    )
};


// Odaları listeleme fonksiyonu
Rooms.prototype.list = function (callback) {
    let roomList = []; // odaları depolamak için dizi

    this.client.hgetall('rooms', function (err, rooms) { // online hash indeki verileri getirir.
        if(err){
            console.log(err);
            return callback([]); // hata varsa callback e boş dizi dön 
        }

        for (let room in rooms){
            roomList.push(JSON.parse(rooms[room]));
            // jsonda data string olarak durduğu için jsona parse ediyoruz.
        }
        
        return callback(roomList); // hata yoksa callback e roomList dizisini dön 
    })
};
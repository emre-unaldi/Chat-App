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

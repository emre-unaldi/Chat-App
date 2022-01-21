const shortId = require('shortid'); // redis room id tanımı için paket 
const redisClient = require('../redisClient'); 

// Messages sınıfı
function Messages(){ // Bu sınıf çalıştığında constructor da çalışmış olcak ve redise bağlantı kurulacak.
    this.client = redisClient.getClient();
}

module.exports = new Messages();

// Mesaj Oluşturma fonksiyonu 
Messages.prototype.upsert = function ({ roomId, message, username, surname }){
    this.client.hset( 
        'Messages:'+roomId,  
        shortId.generate(), // mesaj id
        JSON.stringify({ // mesaj ile ilgili detayları içeren data
            username, // mesajı oluşturanın adı soyadı
            surname,
            message, // mesaj bilgisi kaydet
            when: Date.now() // ne zaman kaydedildiğini kaydet
        }),
        err => {
            if(err){
                console.log(err);
            }
        }
    )
};

// Mesajları listeleme fonksiyonu
Messages.prototype.list = function (roomId, callback) {
    let messageList = []; // mesajları depolamak için dizi

    this.client.hgetall('Messages:'+roomId , function (err, messages) { // messages hash indeki verileri getirir.
        if(err){
            console.log(err);
            return callback([]); // hata varsa callback e boş dizi dön 
        }

        for (let message in messages){
            messageList.push(JSON.parse(messages[message]));
            // jsonda data string olarak durduğu için jsona parse ediyoruz.
        }
        
        return callback(messageList); // hata yoksa callback e messageList dizisini dön 
    })
};
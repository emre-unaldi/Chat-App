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
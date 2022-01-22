// angular ile modül oluşturuyoruz.
const app = angular.module('chatApp', []);

// angular ortam değişkenleri 
app.value('env', {
    'SERVICES_URL': 'http://localhost:3000/'
})
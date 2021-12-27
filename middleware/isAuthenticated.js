/*
    bu middleware index ve chat sayfası arasındadır. Login olup olmama durumuna göre çalışır. 
*/

function isAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        next(); // true gelince bir sonraki router'a yönlendirir.
    } else {
        res.redirect('/'); // false ise anasayfaya yönlendirsin.
    }
}
/*
passport.js ile login olduktan sonra passport.js middleware'ları request nesnesine 
isAuthenticated() adında bir fonksiyon atar. Bizde bu fonksiyon aracılığıyla login 
olup olmadığını kontrol ederiz.
*/

module.exports = isAuthenticated;
const express = require('express');
const router = express.Router();
const passportGoogle = require('../auth/google');

router.get('/google', passportGoogle.authenticate( // login butonuna tıklandığı anda çalışacak router
    'google', // 1.parametre olarak google
    {
        scope: ['profile'] // 2. ise scope field'i ile google'da login olacak kişiden hangi bilgileri alacağımızı belirttik.
    }                      // scope field'i ile profile bilgisi gibi email vs de alınabilir.
));

router.get('/google/callback', // login'den olduktan sonra google'dan ilgili kullanıcı döndüğünde çalışacak router
    passportGoogle.authenticate(
        'google',
        {
            failureRedirect: '/' // 2.parametre olarak login olamama (fail) durumunda yönlendirilecek route (burda index'e gidecek)
        }),
        (req, res) => { // burası ise login olma durumunda bizi /chat router ına yönlendirecek
            res.redirect('/chat'); 
        });

module.exports = router;

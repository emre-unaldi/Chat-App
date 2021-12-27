// npm install passport passport-google-oauth20 --save
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

// Models
const User = require('../models/Users');
/*
    passport.use() -> 2 parametre alır. 
    1.parametre new GoogleStrategy constructor'ına bir nesne veririz ve .env değişkenlerini belirtiyoruz.
    2.parametre olarak bir fonksiyon verilir. Fonksiyon ise 4 tane parametre içerir.
*/
passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_LOGIN_CLIENT_ID,
      clientSecret: process.env.GOOGLE_LOGIN_SECRET_ID,
      callbackURL: process.env.GOOGLE_LOGIN_CALLBACK_URL
    }, 
    ((accessToken, refreshToken, profile, done) => {
      const data = profile._json;
      console.log(data);

      User.findOrCreate({ // plugin'i şema üzerinde kullanıyoruz.
        'googleId': data.sub
      },
      {
        name: data.given_name,
        surname: data.family_name,
        profilePhotoUrl: data.picture
      }, (err, user) => {
          return done(err, user); // işlem tamamlandığında done şeklinde döneriz.passportjs de done keywordü tanımlıdır.
      })
    })
));
/*
    Aynı googleId'li hesap birden fazla şekilde kaydedilmemelidir. Bu yüzden User'ı veritabanına 
    kaydederken aynı user'ın tekrar eklenmeyeceğine dair bir kontrol yapmalıyız.

    mongoose-find-or-create
        Bizim verdiğimiz kriterlere göre mongodb collection'sunu tarıyor ve ilgili data varsa 
        bişey yapmadan bize o datayı döner. Yoksa verdiğimiz verdiğimiz field'lara göre o datayı 
        oluşturur.
        Bu modül mongodb tarafında bir plugin olarak sağlanmış durumda.
*/

// dönen user'ın sessiona atanması için yazmamız gerekir.
passport.serializeUser((user, done) => { 
   done(null, user); 
});

// uygulamanın herhangi bir yerinde session data'sını değiştirmek istediğimzde kullanılır.
passport.deserializeUser((user, done) => { 
    done(null, user); 
 });
 

module.exports = passport;
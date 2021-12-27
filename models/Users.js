const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-find-or-create'); 
// plugini buraya dahil ettik ki modelimiz üzerinde kullanılabilecek bir fonksiyon olabilsin.

const userSchema = new Schema({
    googleId: {
        type: String,
        unique: true
    },
    name: String,
    surname: String,
    profilePhotoUrl: String
});

userSchema.plugin(findOrCreate); // Bu şekilde artık bu plugini bu şema üzerinde kullanabiliriz.
module.exports = mongoose.model('users', userSchema);
// users -> collection adı , userSchema -> model adı 
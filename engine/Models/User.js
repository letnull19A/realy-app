const { Schema, model } = require('mongoose');

const schema = new Schema({
    name : {type: String, required: true, unique: false},
    surname: {type: String, required: true, unique: false},
    fatherName: {type: String, required: true, unique: false},
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false},
    id: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    telephone: {type: String, required: true, unique: true},
    status: {type: Number, required: true, unique: false},
});

module.exports = model('User', schema);
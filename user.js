const mongoose = require('mongoose');
const schema = mongoose.Schema;

var userschema = new schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    contact_info: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: null
    },
    phone_no: {
        type: String
    },
    wish: {
        type: Array,
        default: null
    }
})

module.exports = mongoose.model('user', userschema);
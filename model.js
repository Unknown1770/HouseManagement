const mongoose = require('mongoose');

var detailSchema = new mongoose.Schema({
    house_place: {
        type: String,
        required: true
    },
    house_rent: {
        type: String,
        required: true
    },
    person_name: {
        type: String,
        required: true
    },
    house_type: {
        type: String
    },
    person_mail: {
        type: String,
        default: null
    },
    phone_no: {
        type: String
    },
    img: {
        data: Buffer,
        contentType: String
    }

})

module.exports = mongoose.model('detail', detailSchema);
// module.exports = new mongoose.model('post', PostSchema);
// module.exports = new mongoose.model('Image', imageSchema);


// var mongoose = require('mongoose');

// var imageSchema = new mongoose.Schema({
//     admin_name: String,
//     admin_id: String,
//     img: {
//         data: Buffer,
//         contentType: String
//     }
// });

// //Image is a model which has a schema imageSchema

// module.exports = new mongoose.model('Image', imageSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaiKhoan = new Schema({
    name: { type: String, maxLength: 255 },
    email: { type: String, maxLength: 255 },
    image: { type: String, maxLength: 255 },
    password: { type: String, maxLength: 255 },
    role: { type: String, maxLength: 255 },
},
    {
        timestamps: true,
    });
module.exports = mongoose.model('TaiKhoan', TaiKhoan);

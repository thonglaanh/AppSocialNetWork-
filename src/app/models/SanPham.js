const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SanPham = new Schema({
    name: { type: String, maxLength: 255 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    image: { type: String, maxLength: 255 },
    describe: { type: String, maxLength: 255 },
    price: { type: String, maxLength: 255 }
}, {
    timestamps: true,
}
);
module.exports = mongoose.model('SanPham', SanPham);

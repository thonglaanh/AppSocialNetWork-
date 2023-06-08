const SanPham = require('../models/SanPham')
const Category = require('../models/Category');
const fs = require('fs')
class SanPhamController {
    edit(req, res, next) {
        SanPham.findOne({ _id: req.params._id })
            .populate('category')
            .then((sanpham) => {
                Category.find({})
                    .then((categories) => {
                        // sanpham = sanpham.map((sp) => sp.toObject());
                        categories = categories.map((sp) => sp.toObject());
                        // console.log(sanpham);
                        res.render('edits/sanPham', {
                            _id: sanpham._id,
                            name: sanpham.name,
                            price: sanpham.price,
                            describe: sanpham.describe,
                            categories: categories
                        });
                    })
                    .catch(next);
            })
            .catch(next);
    }
    delete(req, res, next) {
        SanPham.findByIdAndDelete({ _id: req.params._id })
            .then(() => {
                res.redirect('/sanPham');
            })
            .catch(next);
    }
    update(req, res, next) {
        // SanPham.findByIdAndUpdate({ _id: req.params._id })
        //     .then(() => {
        //         res.redirect('/sanPham');
        //     })
        //     .catch(next);

        fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
            console.log(req.file.originalname);
        });
        if (req.file) {
            req.body.image = 'http://localhost:3000/uploads/' + req.file.originalname;
        } else {
        }
        let id = req.params._id;
        console.log(id);
        console.log(req.body);
        SanPham.findByIdAndUpdate(id, req.body)
            .then(taiKhoan => {
                console.log(taiKhoan);
                res.redirect('/sanPham');
            })
            .catch(next);
    }
    show(req, res, next) {
        console.log(req.params.name);
        SanPham.findById({ _id: req.params.name })
            .populate('category')
            .then(sanpham => {
                sanpham = sanpham.toObject();
                res.render('shows/sanPham', sanpham)
            })
            .catch(next);
    }
    sanPhamGet(req, res, next) {
        const formData = req.body;
        let categories;
        Category.findById({ _id: formData.category })
            .then((result) => {
                categories = result;
                return SanPham.find({ category: formData.category }).populate('category');
            })
            .then((sanpham) => {
                sanpham = sanpham.map((sp) => sp.toObject());
                res.render('sanPham', { sanpham: sanpham, categories: categories });
            })
            .catch(next);

    }
    sanPhamGetName(req, res, next) {
        const name = req.body.data;
        console.log(name);
        try {
            SanPham.find({ name: name })
                .populate('category')
                .then(sanpham => {
                    if (!sanpham) {
                        return res.status(401).json({ status: 'error', message: 'Không tồn tại tài khoản' })
                    }
                    console.log(sanpham);
                    return res.status(200).json({ status: 'success', sanpham });
                })
        } catch (error) {
            console.log(error);
        }
    }

    sanPham(req, res, next) {
        let categories;
        Category.find({})
            .then((result) => {
                categories = result.map((sp) => sp.toObject());
                return SanPham.find({}).populate('category');
            })
            .then((sanpham) => {
                sanpham = sanpham.map((sp) => sp.toObject());
                //
                res.json(sanpham)
                res.render('sanPham', { sanpham: sanpham, categories: categories });
                console.log(sanpham);
            })
            .catch(next);
    }
    sapxep(req, res, next) {
        let i = 1;
        let categories;
        Category.find({})
            .then((result) => {
                categories = result.map((sp) => sp.toObject());
                if (i % 2 == 0) {
                    return SanPham.find({}).sort({ name: 1 }).populate('category');
                    i++;
                } else {
                    return SanPham.find({}).sort({ name: 1 }).populate('category');
                    i++;
                }
            })
            .then((sanpham) => {
                sanpham = sanpham.map((sp) => sp.toObject());
                //
                // res.json(sanpham)
                res.render('sanPham', { sanpham: sanpham, categories: categories });
                console.log(sanpham);
            })
            .catch(next);
    }

}
module.exports = new SanPhamController;
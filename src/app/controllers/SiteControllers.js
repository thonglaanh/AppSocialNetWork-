const taiKhoan = require('../models/TaiKhoan')
const sanPham = require('../models/SanPham')
const category = require('../models/Category');
const fs = require('fs')
class SiteControllers {
    dangKi(req, res) {
        res.render('dangKi');
    }
    dangNhap(req, res) {
        res.render('dangNhap');
    }
    trangChu(req, res) {
        res.render('home');
    }
    store(req, res, next) {
        fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
            console.log(req.file.originalname);
        });
        const formData = req.body;

        console.log(req.body);
        if (req.file) {
            formData.image = 'http://localhost:3000/uploads/' + req.file.originalname;
        } else {
        }
        console.log(req.body);

        const tk = new taiKhoan(formData);
        tk.save()
            .then(() => res.redirect('/'));
    }
    store2(req, res, next) {
        const value = req.body;
        value.image = 'https://nhadepso.com/wp-content/uploads/2023/03/cap-nhat-50-hinh-anh-dai-dien-facebook-mac-dinh-dep-doc-la_2.jpg'
        const tk = new taiKhoan(value);
        tk.save();
    }

    addNewTk(req, res) {
        res.render('adds/addNewTK')
    }
    storeTk(req, res, next) {
        fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
            console.log(req.file.originalname);
        });
        const formData = req.body;

        console.log(req.body);
        if (req.file) {
            formData.image = 'http://localhost:3000/uploads/' + req.file.originalname;
        } else {
        }
        console.log(req.body);

        const tk = new taiKhoan(formData);
        tk.save()
            .then(() => res.redirect('/taiKhoan'));
    }
    addNewSp(req, res, next) {
        category.find({})
            .then(type => {
                type = type.map(tl => tl.toObject())
                res.render('adds/addNewSp', { type });
                console.log(type)
            })
            .catch(next);
    }
    storeSp(req, res, next) {
        // console.log(req.file);
        fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
            console.log(req.file.originalname);
        });

        const formData = req.body;

        console.log(req.body);
        if (req.file) {
            formData.image = 'http://localhost:3000/uploads/' + req.file.originalname;
        } else {
        }
        console.log(req.body);

        const tk = new sanPham(formData);
        tk.save()
            .then(() => res.redirect('/sanPham'));
    }
    login(req, res, next) {
        const { email, password } = req.body;
        try {
            taiKhoan.findOne({ email })
                .then(taikhoan => {
                    if (!taikhoan) {
                        return res.status(401).json({ status: 'error', message: 'Tài khoản chưa tồn tại' })
                    }
                    if (taikhoan.password !== password) {
                        return res.status(401).json({ status: 'error', message: 'Sai mật khẩu!!' });
                    }
                    return res.status(200).json({ status: 'success', taikhoan });
                    // res.redirect('/home');

                })
        } catch (error) {

        }
    }
}
module.exports = new SiteControllers;
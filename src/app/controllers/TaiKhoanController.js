const TaiKhoan = require('../models/TaiKhoan')
const fs = require('fs')
class TaiKhoanController {
    show(req, res, next) {
        TaiKhoan.findById(req.params._id)
            .then(taikhoan => {
                res.render('edits/taiKhoan', taikhoan)
            })
            .catch(next);
    }
    taiKhoan(req, res, next) {
        TaiKhoan.find({})
            .then(taikhoan => {
                taikhoan = taikhoan.map(tk => tk.toObject())
                res.json(taikhoan)
                res.render('taiKhoan', { taikhoan });
                console.log(taikhoan)
            })
            .catch(next);
    }

    delete(req, res, next) {
        TaiKhoan.findByIdAndDelete({ _id: req.params._id })
            .then(() => {
                res.redirect('/taiKhoan');
            })
            .catch(next);
    }
    update(req, res, next) {
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
        TaiKhoan.findByIdAndUpdate(id, req.body)
            .then(taiKhoan => {
                console.log(taiKhoan);
                res.redirect('/taiKhoan');
            })
            .catch(next);
    }
    //
    updatePass(req, res, next) {
        const id = req.body.id;
        const newPassword = req.body.password2;
        TaiKhoan.findByIdAndUpdate(id, { password: newPassword }, { new: true })
            .then(updatedTaiKhoan => {
                console.log(updatedTaiKhoan);
                res.json(updatedTaiKhoan);
            })
            .catch(next);
    }

    taiKhoanGet(req, res, next) {
        const formData = req.body;
        TaiKhoan.find({ name: formData.name })
            .then(taikhoan => {
                taikhoan = taikhoan.map(tk => tk.toObject())
                res.render('taiKhoan', { taikhoan });
                console.log(taikhoan.length)
            })
            .catch(next);
    }
    sapxep(req, res, next) {
        TaiKhoan.find({}).sort({ name: 1 })
            .then(taikhoan => {
                taikhoan = taikhoan.map(tk => tk.toObject())
                res.json(taikhoan)
                res.render('taiKhoan', { taikhoan });
                console.log(taikhoan)
            })
            .catch(next);
    }

}
module.exports = new TaiKhoanController;
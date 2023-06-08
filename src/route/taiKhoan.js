const express = require('express');
const router = express.Router()

const taikhoanControllers = require('../app/controllers/TaiKhoanController')
const SiteControllers = require('../app/controllers/SiteControllers')
const multer = require('multer');

const upload = multer({ dest: 'uploads/' })

router.get('/addNew', SiteControllers.addNewTk)
router.post('/store', upload.single('image'), SiteControllers.storeTk)
router.post('/loc', taikhoanControllers.taiKhoanGet)
router.get('/sapxep', taikhoanControllers.sapxep)
router.post('/updatepass', taikhoanControllers.updatePass)
router.post('/update/:_id', upload.single('image'), taikhoanControllers.update)
router.get('/delete/:_id', taikhoanControllers.delete)
router.get('/edit/:_id', taikhoanControllers.show)
router.get('/', taikhoanControllers.taiKhoan)



module.exports = router;

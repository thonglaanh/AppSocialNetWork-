const express = require('express');
const router = express.Router()

const sanphamControllers = require('../app/controllers/SanPhamController')
const SiteControllers = require('../app/controllers/SiteControllers')
const multer = require('multer');

const upload = multer({ dest: 'uploads/' })

router.get('/addNew', SiteControllers.addNewSp)
router.post('/store', upload.single('image'), SiteControllers.storeSp)
router.post('/locname', sanphamControllers.sanPhamGetName)
router.post('/loc', sanphamControllers.sanPhamGet)
router.get('/sapxep', sanphamControllers.sapxep)
router.post('/update/:_id', upload.single('image'), sanphamControllers.update)
router.get('/edit:_id', sanphamControllers.edit)
router.get('/delete/:_id', sanphamControllers.delete)
router.get('/:name', sanphamControllers.show)
router.get('/', sanphamControllers.sanPham)

module.exports = router;
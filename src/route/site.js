const express = require('express');
const router = express.Router()
const SiteControllers = require('../app/controllers/SiteControllers')
const multer = require('multer');

const upload = multer({ dest: 'uploads/' })
router.get('/dangKi', SiteControllers.dangKi)
router.get('/home', SiteControllers.trangChu)
router.post('/dangKi/store', upload.single('image'), SiteControllers.store);
router.post('/register', SiteControllers.store2);
router.post('/login', SiteControllers.login)
router.get('/', SiteControllers.dangNhap)

module.exports = router;    

const siteRoute = require('./site');
const spRoute = require('./sanPham');
const tkRoute = require('./taiKhoan')
function route(app) {
    app.use('/taiKhoan', tkRoute)
    app.use('/sanPham', spRoute)
    app.use('/', siteRoute)
}
module.exports = route;
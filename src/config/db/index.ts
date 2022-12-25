const mongoose = require('mongoose')
const connect = async () => {
    try{
       await mongoose.connect('mongodb://localhost:27017/db_cloudfoodsv')
       console.log('Kết nối tới db thành công')
    }
    catch(err){
       console.log('Lỗi kết nối DB',err)
    }
}
module.exports = {connect}
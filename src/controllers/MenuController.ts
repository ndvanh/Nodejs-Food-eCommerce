import { Request, Response } from "express"
const Menu = require("../models/Menu")
class MenuController {
    // GET lấy tất cả danh sách menu
    async getAllMenu(req : Request, res : Response) {
     try {
      const menu = await Menu.find({})
      res.json(menu)
     }
     catch (err) {
      console.error(err)
     }
    }
    // POST thêm menu
    async addMenu(req : any, res : Response) {
        try{
          req.body.imgMenu = `http://localhost:8080/uploads/${req.file.filename}`
          const menuItem = new Menu(req.body)
          await menuItem.save()
          res.json()
        }
        catch(err){
          console.log(err)
        }
     }
    // PATCH cập nhật menu
     async updateMenu(req : any, res : Response) {
      try{
        if(req.body.imgMenu === '') {
          const menuItem = Menu.findById(req.params._id)  
          req.body.imgMenu = menuItem.imgMenu
          await Menu.updateOne({_id:req.params._id},req.body)
          res.json()
        }
        else {
          // const filter = {_id:req.params._id}
          req.body.imgMenu = `http://localhost:8080/uploads/${req.file.filename}`
          await Menu.updateOne({_id:req.params._id},req.body)
          res.json()
        }
      }
      catch(err){
        console.log(err)
      }
   }
     // DELETE xóa menu
    async deleteMenu(req : Request, res : Response) {
      try{
          await Menu.findByIdAndRemove(req.params._id)
          res.json()
        }
        catch(err){
          console.log(err)
        }
     }
}
module.exports = new MenuController
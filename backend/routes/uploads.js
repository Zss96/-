const express = require('express')
const qs = require('qs')
const fs = require('fs')
// const con = require('../model/db')
const {exec}= require('../db/mysql')
const mysql = require('mysql')
const multer = require('multer');
const upfile = multer({dest: 'uploads'}) 

 const {MYSQL_CONF} = require('../config/db')

 const uploads = express.Router();

 //图片上传

 uploads.post('/Img',upfile.single('file'), async (req, res) => {
    const file = req.file
    file.url = `/uploads/${file.filename}`
    console.log(file)
    res.json(file)
  })
  //删除图片
  uploads.get('/delImg',(req,res) => {
    const {delImgs}= req.query
    console.log(delImgs.length)
    console.log(delImgs)
    for(let i = 0;i<delImgs.length; i++){
      fs.unlinkSync('.'+delImgs[i])
    }
  })
 module.exports = uploads;
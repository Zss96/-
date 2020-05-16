const express = require('express')
const qs = require('qs')
// const con = require('../model/db')
const {exec}= require('../db/mysql')
const mysql = require('mysql')

 const {MYSQL_CONF} = require('../config/db')

//创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

//开始连接
con.connect()
const admin = express.Router();

//登录
admin.post('/login',(req,res) => {
    const {user, password,checkedValue} = req.body;
    console.log(req.body)
    let sql = '';
    if(checkedValue == 3){
        sql = `select * from admins where user='${user}' and password='${password}';`
    }else if(checkedValue ==2){
        sql = `select * from shops where user='${user}' and password='${password}';`
    }else {
        sql = `select * from members where user='${user}' and password='${password}';`
    }
    exec(sql).then(function(data){
        console.log(data)
        if(data != ''){
            if(user==data[0].user && password==data[0].password){
                // res.setHeader(`Set-Cookie', 'user=${data[0].user}; path=/;httpOnly`)
                let obj ={code: '1',data}
                res.json(obj)
            }else{
                let obj ={code: '0'}
                res.json(obj)
            }
        }else{
            let obj ={code: '0'}
            res.json(obj)
        }
    })
})

//注册
admin.post('/reister',(req,res) => {
    const {user, password,checkedValue} = req.body;
    console.log(req.body)
    let sql = '';
    if(checkedValue == 1){
        sql = `create table if not exists members(
            member_id int primary key auto_increment,
            user varchar(255) NOT NULL unique ,
            password varchar(255),
            email varchar(255),
            address varchar(255),
            truename varchar(255),
            phone varchar(255),
            discount decimal(10,1) DEFAULT 0 )`
        exec(sql).then(()=>{
           sql =`insert into members (user,password) values('${user}','${password}')`
           exec(sql).then(()=>{
               let obj ={code: '1'};
               res.json(obj)
           }).catch(err => {
               console.log(err)
                let obj ={code: '0', data: err};
                res.json(obj)
           })
       })
    }else if(checkedValue == 2){
        sql = `create table if not exists shops(
            shop_id int primary key auto_increment,
            user varchar(255) NOT NULL unique,
            password varchar(255),
            shop_name varchar(255),
            controller varchar(255),
            phone varchar(255),
            shopintro varchar(255),
            shopbanner varchar(600),
            logo varchar(255),
            poster varchar(255),
            shopstatus int DEFAULT 0)`
         exec(sql).then(()=>{
            sql =`insert into shops (user,password) values('${user}','${password}')`
            exec(sql).then(()=>{
                let obj ={code: '1'};
                res.json(obj)
            }).catch(err => {
                console.log(err)
                let obj ={code: '0', data: err};
                res.json(obj)
            })
        })
      
    }
})


/**
 * 商家
 */
//添加商家信息
admin.post('/addShopInfo',(req,res) =>{
    const {shop_id,shopname,controller,phone,shopintro,fileUrl,logo,poster} = req.body;
    console.log(req.body)
    let  sql =`update shops set shop_name ='${shopname}',controller='${controller}',phone='${phone}',shopintro='${shopintro}',shopbanner='${fileUrl}', logo='${logo}', poster='${poster}' where shop_id='${shop_id}'`
    exec(sql).then(()=>{
        let obj = {code: '1'}
        res.json(obj)
    }).catch(err => {
        console.log(res)
        let obj = {
            code: '0',
            data: err
        }
        res.json(obj)
    })
    
})

//添加或修改商品
admin.post('/addgoods',(req,res) =>{
    const goods = req.body;
    const goods_id = goods.goods_id;
    let sql = `create table if not exists goods(
        goods_id int primary key auto_increment,
        name varchar(255) NOT NULL unique,
        brand varchar(255),
        model varchar(255),
        material varchar(255),
        colour varchar(255),
        category varchar(255),
        wheat varchar(255),
        wear varchar(255),
        type varchar(255),
        impedance varchar(255),
        freq varchar(255),
        warranty varchar(255),
        origin_price varchar(255),
        current_price varchar(255),
        future_price varchar(255),
        stock varchar(255),
        banner varchar(600),
        InfoUrl varchar(600),
        evaluating varchar(600),
        status int DEFAULT 0,
        shop_name varchar(255),
        shop_id int,
        foreign key(shop_id) references shops(shop_id))`;
    exec(sql).then(()=>{
       if(goods_id==undefined){
        sql = `insert into goods(name,brand,model,material,colour,category,wheat,wear,type,impedance,freq,warranty,origin_price,current_price,
            stock,banner,InfoUrl,shop_name,shop_id) 
        values('${goods.name}','${goods.brand}','${goods.model}','${goods.material}',
            '${goods.colour}','${goods.category}','${goods.wheat}', '${goods.wear}', '${goods.type}',
            '${goods.impedance}','${goods.freq}','${goods.warranty}','${goods.origin_price}','${goods.current_price}',
            '${goods.stock}','${goods.banner}','${goods.InfoUrl}','${goods.shop_name}','${goods.shop_id}')`
       }else {
           sql = `update goods set name='${goods.name}', brand='${goods.brand}', model='${goods.model}', material='${goods.material}',
           colour='${goods.colour}' ,category='${goods.category}' ,wheat='${goods.wear}',
           wear='${goods.wear}', type='${goods.type}', freq='${goods.freq}',warranty='${goods.warranty}',
           origin_price='${goods.origin_price}',current_price='${goods.current_price}',stock='${goods.stock}',banner='${goods.banner}',
           InfoUrl='${goods.InfoUrl}', impedance='${goods.impedance}',shop_name='${goods.shop_name}'
            where goods_id='${goods_id}'`
       }
            exec(sql).then(()=>{
                console.log(111)
                let obj = {code: '1'}
                res.json(obj)
            }).catch(err=>{
                let obj = {code: '0',data: err}
                res.json(obj)
            })
           
    }).catch(err => {
        console.log(res)
        let obj = {
            code: '0',
            data: err
        }
        res.json(obj)
    })
    
})


//获取店铺信息
admin.get('/shopInfo', (req,res) => {
    console.log(req.query)
    const shop_id = req.query.shop_id
    let sql = `select * from shops where shop_id='${shop_id}';`
     exec(sql).then(data=>{
        console.log(data)
        data = data[0];
        let banners = [];
        if(data.shopbanner!=null){
        let arr = data.shopbanner.split(';')
        console.log(arr[0])
        console.log(arr[1])
        console.log(111111111111111111111)
        let fileUrl = []
        console.log(fileUrl)
        for(let i = 0; i<arr.length-1; i++){
         fileUrl = arr[i].split(',')
            banners[i] = {
                'name':fileUrl[0],
                'uid': fileUrl[1],
                'url': fileUrl[2],
            }
        }
        }
        let obj={
            code: 1,
            data,
            banners
        }
        console.log(data)
        res.json(obj)
    }).catch(err=>{
        console.log(111)
        let obj={
            code: 0,
            data: err
        }
        res.json(obj)
    })
})

//获取商品信息
admin.get('/goodsInfo', (req,res) => {
    console.log(req.query)
    let sql = '';
    const status = req.query.status;
    console.log(status)
    if(status == 1){
        const goods_id = req.query.goods_id
        console.log(11122)
        sql = `select * from goods where goods_id='${goods_id}';`
    }else{
        const shop_id = req.query.shop_id
         sql = `select * from goods where shop_id='${shop_id}';`
    }
    exec(sql).then(data=>{
        data = data;
        let obj = {};
        if(status == 1){
            console.log(111)
            console.log(data)
            let banners = [],
                infos = [],
                fileUrl = [],
                bannerarr = data[0].banner.split(';'),
                infoarr = data[0].InfoUrl.split(';');
                console.log(bannerarr)
            for(let i = 0; i<bannerarr.length-1; i++){
                    fileUrl = bannerarr[i].split(',')
                       banners[i] = {
                           'name':fileUrl[0],
                           'uid': fileUrl[1],
                           'url': fileUrl[2],
           
                       }
            }
            for(let i = 0; i<infoarr.length-1; i++){
                fileUrl = infoarr[i].split(',')
                    infos[i] = {
                        'name':fileUrl[0],
                        'uid': fileUrl[1],
                        'url': fileUrl[2],
           
                    }
            }
            console.log(infos)
             obj={
                code: 1,
                data,
                banners,
                infos
            }
        }else if(status == 0){
             obj={
                code: 1,
                data,
            }
        }
        res.json(obj)
    
    }).catch(()=>{
        let obj={
            code: 0
        }
        res.json(obj)
    })
})
//删除商品
admin.post('/delgoods', (req,res) => {
    const {goods_id} = req.body;
    console.log(goods_id)
    let sql = `delete from goods where goods_id='${goods_id}'`
    exec(sql).then(()=>{
        res.json({
            code: 1
        })
    }).catch(()=>{
        res.json({
            code: 1
        })
    })
})

/**
 * 管理者
 * 
 */
//折扣和首页设置
admin.post('/discount',(req,res)=>{
    const subjects = req.body;
    console.log(subjects)
    let sql=`select * from discount where shop_id='${subjects.shop_id}'`;
    exec(sql).then(data=>{
        console.log(data)
        if(data.length>0){
            sql = `update discount set counter='${subjects.counter}', time='${subjects.time}',onehundred='${subjects.onehundred}',excellent='${subjects.excellent}',
                good='${subjects.good}', pass='${subjects.pass}',fail='${subjects.fail}' where shop_id='${subjects.shop_id}'`
        }else{
            sql = `insert into discount(counter,time,onehundred,excellent,good,pass,fail,shop_id) values('${subjects.counter}','${subjects.time}','${subjects.onehundred}','${subjects.excellent}',
           '${subjects.good}','${subjects.pass}','${subjects.fail}','${subjects.shop_id}')`
        }
        exec(sql).then(()=>{
            res.json({
                code: 1
            })
        }).catch(err=>{
            res.json({
                code: 0,
                data: err
            })
        })
    }).catch(err=>{

        res.json({
            code: 0,
            data: err
        })
    })
})
//获取折扣信息
admin.get('/getdiscount',(req,res)=>{
    console.log(req.query.shop_id)
    let sql=`select * from discount where shop_id='${req.query.shop_id}'`;
    exec(sql).then(data=>{
        res.json({
            code: 1,
            data
        })
    }).catch(()=>{
        res.json({
            code: 0
        })
    })
})

//首页设置
admin.post('/index',(req,res)=>{
    const {bannerNum,hotNum}= req.body;
    let sql = `update setindex set bannerNum='${bannerNum}',hotNum='${hotNum}' where id='1'`;
    exec(sql).then(data=>{
        res.json({
            code: 1
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})
admin.get('/getindex',(req,res)=>{
    let sql = `SELECT * FROM setindex`
    exec(sql).then(data=>{
        res.json({
            code: 1,
            data: data
        })
    })
})

//添加或修改题目
admin.post('/addsubjects',(req,res) =>{
    const subjects = req.body;
    let sql = `create table if not exists subjects(
        subjects_id int primary key auto_increment,
        shop_id int,
        title varchar(255) NOT NULL unique,
        A varchar(255),
        B varchar(255),
        C varchar(255),
        D varchar(255),
        answer varchar(10))`;
        exec(sql).then(()=>{
            console.log(subjects)
            if(subjects.subjects_id==undefined){
                console.log(11)
                sql = `insert into subjects(shop_id,title,A,B,C,D,answer) values ('${subjects.shop_id}','${subjects.title}','${subjects.A}','${subjects.B}',  '${subjects.C}',
                '${subjects.D}','${subjects.answer}')`
            }else {
                console.log(222)
                sql = `update subjects set title='${subjects.title}', A='${subjects.A}', B='${subjects.B}', C='${subjects.C}',D='${subjects.D}',
                answer='${subjects.answer}' where subjects_id='${subjects.subjects_id}'`
            }
            exec(sql).then(()=>{
                console.log(111)
                let obj = {code: '1'}
                res.json(obj)
            }).catch(err=>{
                let obj = {code: '0',data: err}
                res.json(obj)
            })
        }).catch(err => {
            console.log(res)
            let obj = {
                code: '0',
                data: err
            }
            res.json(obj)
        })
  
    
})
//查询题目
admin.get('/searchsubjects',(req,res) =>{
    console.log(req)
    console.log(req.query.subjects_id)
    let sql = `select * from subjects where shop_id='${req.query.shop_id}'`
    if(req.query.subjects_id!==undefined){
        sql = `select * from subjects where subjects_id='${req.query.subjects_id}'`
    }
    exec(sql).then(data=>{
        console.log(data)
        let obj = {
            code: 1,
            data
        }
        res.json(obj)
    }).catch(()=>{
        let obj={
            code: 0
        }
        res.json(obj)
    })

})

////删除题目
admin.post('/delsubject', (req,res) => {
    console.log('--------------')
    const {subjects_id} = req.body;
    let sql = `delete from subjects where subjects_id='${subjects_id}'`
    exec(sql).then(()=>{
        res.json({
            code: 1
        })
    }).catch(()=>{
        res.json({
            code: 1
        })
    })
})
 //查询商家
 admin.get('/searchshops',(req,res)=> {
     console.log(req.query)
     let shopstatus = req.query.shopstatus
    let  sql = `select * from shops where shopstatus='${shopstatus}';`
    exec(sql).then(data=>{
        console.log(data)
        let obj = {
            code: 1,
            data
        }
        res.json(obj)
    }).catch(()=>{
        let obj={
            code: 0
        }
        res.json(obj)
    })
 })

 //审核商家
 admin.post('/auditshop',(req,res)=>{
    const {shop_id,shopstatus} = req.body;
    console.log(shop_id,shopstatus)
    let sql = `update shops set shopstatus='${shopstatus}' where shop_id='${shop_id}'`
    exec(sql).then(data=>{
        res.json({
            code: 1
        })
    }).catch(()=>{
        res.json({
            code: 0
        })
    })
 })

  //查询商品
  admin.get('/searchgoods',(req,res)=> {
    console.log(req.query)
    let status = req.query.status
   let  sql = `select * from goods where status='${status}';`
   exec(sql).then(data=>{
       console.log(data)
       let obj = {
           code: 1,
           data
       }
       res.json(obj)
   }).catch(()=>{
       let obj={
           code: 0
       }
       res.json(obj)
   })
})

//查询商品详情
admin.get('/searchgoodsinfo',(req,res)=>{
    let goods_id = req.query.goods_id;
    console.log(goods_id)
    let sql = `select * from goods where goods_id='${goods_id}';`
    exec(sql).then(data=>{
        data = data[0];
        let banners = [];
        let arr = data.banner.split(';')
        console.log(arr[0])
        let fileUrl = []
        console.log(fileUrl)
        for(let i = 0; i<arr.length-1; i++){
         fileUrl = arr[i].split(',')
            banners[i] = {
                'name':fileUrl[0],
                'uid': fileUrl[1],
                'url': fileUrl[2],

            }
        }
        let infoUrl =  [];
        arr = data.InfoUrl.split(';')
        for(let i=0; i<arr.length-1;i++){
            fileUrl = arr[i].split(',')
            infoUrl[i] = {
                'name':fileUrl[0],
                'uid': fileUrl[1],
                'url': fileUrl[2],

            }
        }
        console.log(banners)
        let obj = {
            code: 1,
            data,
            banners,
            infoUrl
        }
        res.json(obj)
    }).catch(()=>{
        let obj={
            code: 0
        }
        res.json(obj)
    })
})

//评测商品
admin.post('/evaluatgoods',(req,res)=>{
    const goods = req.body;
    console.log(11111111111)
    const {goods_id,status,evaluating,future_price,pushimg,push_title,push_status} = req.body;
    console.log(pushimg)
    let sql = `update goods set status='${status}',evaluating='${evaluating}',future_price='${future_price}',push_img='${pushimg}',push_title='${push_title}',push_status='${push_status}' where goods_id='${goods_id}'`
    exec(sql).then(data=>{
        console.log(data)
        let obj = {
            code: 1,
            data
        }
        res.json(obj)
    }).catch(err=>{
        let obj={
            code: 0,
            err
        }
        res.json(obj)
    })
})

//设置推荐上频频
admin.post('/push/goods',(req,res)=>{
    const {goods_id,push_status} = req.body;
    let sql = `update goods set push_status='${push_status}' where goods_id = '${goods_id}'`
    exec(sql).then(data=>{
        res.json({
            code: 1,
            data
        })
    })
})






module.exports = admin;
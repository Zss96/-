const express = require('express')
const qs = require('qs')
const moment = require('moment')
// const con = require('../model/db')
const {exec}= require('../db/mysql')
const mysql = require('mysql')



 const {MYSQL_CONF} = require('../config/db')

//创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

//开始连接
con.connect()
const member = express.Router();

/**
 * 用户
 */
//获取用户信息
member.get('/getInfo',(req,res)=>{
    const member_id = req.query.member_id;
    let sql = `select * from members where member_id='${member_id}'`
    exec(sql).then(data=>{
        res.json({
            code: 1,
            data:data[0]
        })
    }).catch(err=>{
        res.json({
            code: 0,
            data: err
        })
    })
})

//搜索
member.get('/search',(req,res)=>{
    const searchval = req.query.searchval;
    console.log(searchval)
    let sql = `SELECT * FROM goods WHERE STATUS='1' AND CONCAT(NAME, brand ,model,TYPE,material,category,wheat,wear) like "%${searchval}%";`,
        result = [],
        goods = [],
        shops = [];
    exec(sql).then(data=>{
        console.log(data)
        goods = data
        result = data
        data.forEach(item=>{
            item.isgoods=1;
            item.url=getFristUrl(item.banner)
        })
       sql = `SELECT * FROM shops WHERE shop_name like "%${searchval}%";`,
            exec(sql).then(data=>{
             data.forEach(item=>{
                item.isgoods=0
             })
             shops = data
            result = result.concat(data)
            res.json({
                code: 1,
                result,
                shops,
                goods
            })
        })
    })
})

//获取耳机类型
member.get('/gettype/goods',(req,res)=>{
    const type = req.query.type;
    let goodstype = ''
    if(type == 1){
        goodstype = '头'
    }else{
        goodstype = '入'
    }
    let sql = `SELECT * FROM goods WHERE wear like "%${goodstype}%";`
    exec(sql).then(data=>{
        data = data;
        let goods = []
        arr = [],
        first = [],
        last = [],
        url = '';
        for(let i = 0; i<data.length;i++){
            arr = data[i].banner
            first = arr.split(';');
            last = first[0].split(',');
            url = last[2]
            goods.push({
                goods_id: data[i].goods_id,
                name: data[i].name,
                logourl: data[i].logo,
                shop_name: data[i].shop_name,
                star: data[i].star,
                buyNum: data[i].buyNum,
                origin_price: data[i].origin_price,
                current_price: data[i].current_price,
                future_price: data[i].future_price,
                url
            })
        }
        res.json({
            code: 1,
            goods,
        })
    })
})

//随机获取题目
member.get('/getsub',(req,res)=>{
    const  counter = req.query.counter;
    const shop_id = req.query.shop_id;
    let sql=`SELECT * FROM subjects where shop_id='${shop_id}'  ORDER BY RAND() LIMIT ${counter};`
    exec(sql).then(data=>{
        res.json({
            code: 1,
            data
        })
    }).catch(err=>{
        res.json({
            code: 0,
            data: err
        })
    })
})

//保存优惠
member.post('/discount',(req,res)=>{
    const {discount,member_id,shop_id}= req.body;
    let sql=`create table if not exists mydiscounts(
        mydiscount_id int primary key auto_increment,
        member_id int,
        shop_id int,
        discount decimal(10,1) DEFAULT 0
    )`
    // let sql = `update members set discount='${discount}' where member_id='${member_id}'`
    exec(sql).then(()=>{
        sql=`select * from mydiscounts where shop_id='${shop_id}' and member_id='${member_id}'`;
        exec(sql).then(data=>{
            if(data.length>0){
                sql = `update mydiscounts set discount='${discount}' where shop_id='${shop_id}' and member_id='${member_id}'`;
            }else {
                sql = `insert into mydiscounts (discount,shop_id,member_id) values('${discount}','${shop_id}','${member_id}')`
            }
            exec(sql).then(data=>{
                res.json({
                    code: 1
                })
            })
        })
    }).catch(err=>{
        res.json({
            code: 0,
            data:err
        })
    })
})

//查询优惠
member.get('/getmydiscount',(req,res)=>{
    const {member_id,shop_id} = req.query;
    let sql=`select * from mydiscounts where shop_id='${shop_id}' and member_id='${member_id}'`;
    exec(sql).then(data=>{
        res.json({
            code: 1,
            data: data[0]
        })
    })
})

//获取首页轮播图
member.get('/getbanner',(req,res)=>{
    const num = req.query.num;
    let sql=`select * from shops where shopstatus = '1' order by star desc limit ${num}`
    exec(sql).then(data=>{
        res.json({
            code:1,
            data
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})
//获取推荐店铺
member.get('/getgoodshop',(req,res)=>{
    const num = req.query.num;
    let sql=`select * from shops where shopstatus = '1' order by star desc limit ${num}`
    exec(sql).then(data=>{
        data = data;
        let shops = [];
        for(let i = 0; i<data.length;i++){
            shops.push({
                shop_id: data[i].shop_id,
                logourl: data[i].logo,
                shop_name: data[i].shop_name,
                star: data[i].star

            })
        }
        res.json({
            code: 1,
            shops
        })
    }).catch(err=>{
        res.json({
            code: 1,
            err
        })
    })
})
//获取推荐商品
member.get('/push/goods',(req,res)=>{
    // const num = req.query.num;
    let sql=`select * from goods where push_status = '1' order by star desc`
    exec(sql).then(data=>{
        res.json({
            code: 1,
            data
        })
    }).catch(err=>{
        res.json({
            code,
            err
        })
    })
})
//查询热销商品
member.get('/hot/goods',(req,res)=>{
    const {size} = req.query;
    let sql=`select * from goods where status = '1' order by buyNum desc limit ${size}`
    exec(sql).then(data=>{
        for(let i = 0; i<data.length; i++){
            data[i].url=getAllUrl(data[i].InfoUrl)
           if(i==data.length-1){
               res.json({
                   code: 1,
                   data
               })
           }
         }
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})

//分页查询所有商品
member.get('/getgoods',(req,res)=>{
    const {page,size} = req.query;
    let sql = `select count(1) from goods where status = '1'`,
        total;
    exec(sql).then(sum =>{
        total = sum[0]['count(1)']
    })
     sql=`select * from goods where status = '1' order by star desc limit ${(page-1)*size},${page*size}`
    exec(sql).then(data=>{
        data = data;
        let goods = []
        arr = [],
        first = [],
        last = [],
        url = '';
        for(let i = 0; i<data.length;i++){
            arr = data[i].banner
            first = arr.split(';');
            last = first[0].split(',');
            url = last[2]
            goods.push({
                goods_id: data[i].goods_id,
                name: data[i].name,
                logourl: data[i].logo,
                shop_name: data[i].shop_name,
                star: data[i].star,
                buyNum: data[i].buyNum,
                origin_price: data[i].origin_price,
                current_price: data[i].current_price,
                future_price: data[i].future_price,
                url
            })
        }
        res.json({
            code: 1,
            goods,
            total
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})

//查询商家经过审核所有商品
member.get('/searchgoods',(req,res)=>{
    const {shop_id,page,size,goods_id} = req.query;
    let sql = `select count(1) from goods where status = '1' and shop_id='${shop_id}'`,
                total;
    exec(sql).then(sum =>{
        total = sum[0]['count(1)']
    })
    sql = `select * from goods where status='1' and shop_id='${shop_id}' and goods_id !='${goods_id}' order by star desc limit ${(page-1)*size},${page*size}`
    exec(sql).then(data=>{
        data = data;
        let goods = []
        arr = [],
        first = [],
        last = [],
        url = '';
        for(let i = 0; i<data.length;i++){
            arr = data[i].banner
            first = arr.split(';');
            last = first[0].split(',');
            url = last[2]
            goods.push({
                goods_id: data[i].goods_id,
                name: data[i].name,
                logourl: data[i].logo,
                shop_name: data[i].shop_name,
                star: data[i].star,
                buyNum: data[i].buyNum,
                origin_price: data[i].origin_price,
                current_price: data[i].current_price,
                future_price: data[i].future_price,
                url
            })
        }
        res.json({
            code: 1,
            goods,
            total
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
    
})

//加入购物车
member.post('/joincart',(req,res)=>{
    const {member_id,goods_id,num,buy,shop_id} = req.body
    let sql = `create table if not exists carts(
        cart_id int primary key auto_increment,
        num int DEFAULT 1,
        member_id int,
        user varchar(255),
        shop_id int,
        goods_id int ,
        foreign key(goods_id) references goods(goods_id))`
    exec(sql).then(()=>{
        sql = `select * from carts where member_id='${member_id}' and goods_id = '${goods_id}'`
        exec(sql).then(data=>{
            if(data.length==0){
                sql=`insert into carts(num,member_id,goods_id,shop_id) values('${num}','${member_id}','${goods_id}','${shop_id}')`
            }else if(buy==0){
                sql=`insert into carts(num,member_id,goods_id,shop_id) values('${num}','${member_id}','${goods_id}','${shop_id}')`
            }else{
               let lastnum = parseInt(data[0].num)+parseInt(num),
                    cart_id = data[0].cart_id;
               sql = `update carts set num = ${(lastnum)} where cart_id = '${cart_id}'`
            
            }
            exec(sql).then(data=>{
                sql = 'select last_insert_id()'      
                
                exec(sql).then(data=>{
                    carts_id = data[0]['last_insert_id()']
                    res.json({
                        code:1,
                        carts_id
                    })
                })
            }).catch(err=>{
                res.json({
                    code: 0,
                    err
                })
            })
            
        }).catch(err=>{
            res.json({
                code:0,
                err
            })
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})

//查询购物车
member.get('/getcart',(req,res)=>{
    const {member_id} = req.query;
    let sql = `select * from carts where member_id='${member_id}'`
    exec(sql).then(data=>{
        if(data.length>0){
            let carts = [],
            state=0,
            length = data.length;
            for(let i = 0;i<data.length;i++){
                const  {goods_id,num,cart_id,shop_id} = data[i]
                sql = `select * from mydiscounts where discount!=0 and shop_id='${shop_id}' and member_id='${member_id}'`;
                console.log(sql)
                exec(sql).then(data=>{
                    let discount = 0;
                       if(data.length>0){
                        discount = data[0].discount
                       }
                       console.log(data)
                    sql = `select * from goods where goods_id='${goods_id}'`
                exec(sql).then(data=>{
                    data = data;
                    let goods = []
                    arr = [],
                    first = [],
                    last = [],
                    url = '';
                    for(let i = 0; i<data.length;i++){
                        arr = data[i].banner
                        first = arr.split(';');
                        last = first[0].split(',');
                        url = last[2]
                        data[i].url = url
                        data[i].num = num
                        data[i].cart_id = cart_id
                        data[i].discount = discount
                    }
                    carts[i] = data[0]
                    state++
                    if(state==length){
                      res.json({
                          code: 1,
                          carts
                       })
                    }
                }).catch(err=>{
                    res.json({
                        code:0,
                        err
                    })
                })
                })
            }

        }else{
            res.json({
                code: 1,
                data: 0
            })
        }

    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})

//购物车商品数据的编辑
member.post('/cart/edit',(req,res)=>{
    const {cart_id,num} = req.body
        let sql = `update carts set num=${num} where cart_id='${cart_id}'`
    exec(sql).then(data=>{
        res.json({
            code: 1,
            data
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})
//删除购物车商品
member.post('/cart/del', (req,res)=>{
    const carts_id=req.body.carts_id;
    let cart_id=carts_id.split(","),
        sql ='',
        state= 0;
    for(let i =0;i<cart_id.length;i++){
        sql = `delete from carts where cart_id='${cart_id[i]}'`
        exec(sql).then(data=>{
            state++
            if(state==cart_id.length){
                res.json({
                    code:1,
                    data
                })
            }
        }).catch(err=>{
            res.json({
                code: 0,
                err
            })
        })
    }
})
//查询加入订单id
member.get('/orderInfo',(req,res)=>{
    
})
//加入订单
member.get('/buygoods',(req,res)=>{
    const {member_id,carts_id} = req.query;
    let cart_id=carts_id.split(","),
    sql ='',
    state= 0,
    length = cart_id.length,
    carts = [],
    totalmoney = 0,
    paymount = 0;
    for(let i =0;i<cart_id.length;i++){
         sql = `select * from carts where cart_id=${cart_id[i]}`
        exec(sql).then(data=>{
                    const  {goods_id,num,cart_id,shop_id} = data[0]
                    sql = `select discount from mydiscounts where shop_id='${shop_id}' and member_id='${member_id}'`;
                    exec(sql).then(data=>{
                        let discount = 0;
                       if(data.length>0){
                        discount = data[0].discount
                       }
                        sql = `select * from goods where goods_id='${goods_id}'`
                    exec(sql).then(data=>{
                        // data = data;
                        let goods = [],
                        arr = [],
                        first = [],
                        last = [],
                        url = '';
                        for(let j = 0; j<data.length;j++){
                            arr = data[j].banner
                            first = arr.split(';');
                            last = first[0].split(',');
                            url = last[2]
                            data[0].url = url
                        }
                        data[0].discount = discount
                        data[0].num = num
                        data[0].cart_id = cart_id
                        totalmoney = totalmoney+ data[0].current_price*num
                        if(discount==0){
                            paymount = paymount+ data[0].current_price*num
                        }else {
                            paymount = paymount+ data[0].current_price*num*discount/10
                        }
                        carts[i] = data[0]
                        state++
                        if(state==length){
                          res.json({
                              code: 1,
                              carts,
                              totalmoney,
                              paymount
                           })
                        }
                    }).catch(err=>{
                        res.json({
                            code:0,
                            err
                        })
                    })
                    })
                   
        }).catch(err=>{
            res.json({
                code: 0,
                err
            })
        })
    }
})

//下单
member.post('/order',(req,res)=>{
    const {carts_id,order_name,phone,address,member_id,goods_id,user} = req.body;
        let cart_id=carts_id.split(","),
    state= 0,
    length = cart_id.length,
    carts = [],
    totalmoney = 0,
    shops_id=[];
    for(let i =0;i<cart_id.length;i++){
        let sql = `select * from carts where cart_id=${cart_id[i]}`
         exec(sql).then(data=>{
            const  {goods_id,num,member_id,shop_id} = data[0]
            sql = `select discount from mydiscounts where shop_id='${shop_id}' and member_id='${member_id}'`;
            exec(sql).then(data=>{
                let discount = 0;
                       if(data.length>0){
                        discount = data[0].discount
                       }
                sql = `select * from goods where goods_id='${goods_id}'`
            exec(sql).then(data=>{
                const {current_price,name,model,stock,buyNum,shop_id} = data[0]
                let arr = data[0].banner,
                first = arr.split(';'),
                last = first[0].split(','),
                url = last[2],
                payamount=current_price*num;
                if(discount !=0){
                    payamount = payamount*discount/10
                }
                 
                sql = `create table if not exists orders(
                        order_id int primary key auto_increment,
                        current_price int,
                        goods_name varchar(50),
                        goods_model varchar(255),
                        status int default 0,
                        assess int default 0,
                        url varchar(255),
                        num int,
                        discount decimal(10,1) DEFAULT 0,
                        payamount decimal(10,2) DEFAULT 0,
                        name varchar(50),
                        phone varchar(50),
                        address varchar(255),
                        member_id int,
                        user varchar(255),
                        evaluate varchar(600),
                        evaluateimg varchar(600),
                        star int,
                        shop_id int,
                        goods_id int ,
                        foreign key(goods_id) references goods(goods_id)
                )`
                exec(sql).then(data=>{
                    sql = `insert into orders(current_price, num ,name,phone,address, member_id,goods_id ,goods_name,goods_model,url,shop_id,user,discount,payamount) 
                        values('${current_price}','${num}','${order_name}','${phone}','${address}','${member_id}','${goods_id}','${name}','${model}','${url}','${shop_id}','${user}','${discount}','${payamount}')`
                    exec(sql).then(data=>{
                        sql = `delete from carts where cart_id='${cart_id[i]}'`
                        exec(sql).then(data=>{
                            sql = `update goods set stock='${stock-num}',buyNum='${buyNum+num}' where goods_id='${goods_id}'`
                    exec(sql).then(data=>{
                        let index = shops_id.indexOf(shop_id)
                        if(index!=-1){
                            shops_id.splice(index,1)
                        }else {
                            shops_id.push(shop_id)
                        }
                        state++
                        if(state==length){
                            for(let i = 0; i<shops_id.length;i++){
                                sql=`delete from mydiscounts where member_id='${member_id}' and shop_id='${shops_id[i]}'`
                                exec(sql).then(data=>{
                                    i++;
                                    if(i==shops_id.length){
                                        res.json({
                                            code: 1
                                        })
                                    }
                                }).catch(err=>{
                                    res.json({
                                        code: 0,
                                        err
                                    })
                                })
                            }
                            
                          
                        }
                    }).catch(err=>{
                        res.json({
                            code: 1
                        })
                    })
                          
                        })
                    }).catch(err=>{
                        res.json({
                            code: 0,
                            err
                        })
                    })
                })
            })
         }).catch(err=>{
             res.json({
                 code:0,
                 err
             })
         })
            })

    }
 

})

//查询订单
member.get('/getorder',(req,res)=>{
    const {member_id,type,shop_id} = req.query;
    let sql = ''
    if(type==0){
        if(shop_id==undefined){
            sql = `select * from orders where member_id='${member_id}'`
        }else {
            sql = `select * from orders where shop_id='${shop_id}'`
        }
    }else if(type==1){
        if(shop_id==undefined){
            sql = `select * from orders where member_id = '${member_id}' and status='0'`
        }else {
            sql = `select * from orders where shop_id = '${shop_id}' and status='0'`
        }
       
    }else if(type==2){
        if(shop_id==undefined){
            sql = `select * from orders where member_id = '${member_id}' and status='1'`
        }else {
            sql = `select * from orders where shop_id = '${shop_id}' and status='1'`
        }
        
    }else if(type==3){
        if(shop_id==undefined){
            sql = `select * from orders where member_id = '${member_id}' and status='2' and assess='0'`
        }else {
            sql = `select * from orders where shop_id = '${shop_id}' and status='2' and assess='0'`
        }
        
    }else if(type==4){
        if(shop_id == undefined){
            sql = `select * from orders where member_id = '${member_id}' and status='2' and assess='1'`
        }else {
            sql = `select * from orders where shop_id = '${shop_id}' and status='2' and assess='1'`
        }
        
    }
    exec(sql).then(data=>{
        res.json({
            code: 1,
            carts:data
        })
    })
})
//发货
member.post('/send',(req,res)=>{
    const {order_id,status} = req.body;
    let sql = '';
    sql = `update orders set status='${status}' where order_id = '${order_id}'`
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

//更新个人信息
member.post('/updateInfo',(req,res)=>{
    const {member_id,email,address,truename,phone} = req.body;
    let sql = `update members set email = '${email}',address='${address}',truename='${truename}',phone='${phone}' where member_id='${member_id}'`
    exec(sql).then(data=>{
        res.json({
            code:1,
            data
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})

//评论
member.post('/goodscomment',(req,res)=>{
    const {appearancestar,tunestar,pricestar,allstar,say,evaluatimg,order_id} = req.body;
    let sql = `update orders set appearancestar='${appearancestar}',tunestar='${tunestar}',pricestar='${pricestar}',
    star = '${allstar}',evaluate = '${say}',evaluateimg = '${evaluatimg}',assess='1' where order_id = '${order_id}'` 
    exec(sql).then(data=>{
        res.json({
            code: 1,
            data
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})
//查看评论
member.get('/goods/searchcomment',(req,res)=>{
    const goods_id = req.query.goods_id;
    let sql = `select * from orders where goods_id = '${goods_id}' and assess='1'`
    exec(sql).then(data=>{
        data = data;
        for(let i = 0; i<data.length; i++){
           data[i].evaluateurl=getAllUrl(data[i].evaluateimg)
        }
        res.json({
            code: 1,
            data
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})



//对比获取商品更多信息
member.get('/getgoods/Detail',(req,res)=>{
    const goods_id = req.query.goods_id;
    let sql = `select avg(star),avg(tunestar),avg(appearancestar),avg(pricestar),count(order_id),url from orders where goods_id='${goods_id}'and assess='1'`
    exec(sql).then(data=>{
        data = data[0]
        let avgdata={};
        avgdata.url = data.url
        avgdata.star = data['avg(star)']
        avgdata.tunestar = data['avg(tunestar)']
        avgdata.appearancestar = data['avg(appearancestar)']
        avgdata.pricestar= data['avg(pricestar)']
        avgdata.count = data['count(order_id)']
        sql = `SELECT count(1) FROM orders WHERE goods_id=${goods_id} and star>'0' and star<='2'`
        exec(sql).then(data=>{
            avgdata.badstar = data[0]['count(1)']
            sql = `SELECT count(1) FROM orders WHERE goods_id='${goods_id}' and star>'2' and star<='4'`

            exec(sql).then(data=>{
                avgdata.midstar = data[0]['count(1)']
                sql = `SELECT count(1) FROM orders WHERE goods_id='${goods_id}' and star>'4' and star<='5'`
                exec(sql).then(data=>{
                    avgdata.goodstar = data[0]['count(1)']
                    sql = `SELECT count(1) FROM orders WHERE goods_id='${goods_id}' and tunestar>'0' and tunestar<='2'`
                    exec(sql).then(data=>{
                        avgdata.badtune = data[0]['count(1)']
                        sql = `SELECT count(1) FROM orders WHERE goods_id='${goods_id}' and tunestar>'2' and tunestar<='4'`
                        exec(sql).then(data=>{
                            avgdata.midtune  = data[0]['count(1)']
                            sql = `SELECT count(1) FROM orders WHERE goods_id='${goods_id}' and tunestar>'4' and tunestar<='5'`
                            exec(sql).then(data=>{
                                avgdata.goodtune = data[0]['count(1)']
                                sql = `SELECT count(1) FROM orders WHERE goods_id='${goods_id}' and appearancestar>'0' and appearancestar<='2'`
                                exec(sql).then(data=>{
                                    avgdata.badappearance = data[0]['count(1)']
                                    sql = `SELECT count(1) FROM orders WHERE goods_id='${goods_id}' and appearancestar>'2' and appearancestar<='4'`
                                    exec(sql).then(data=>{
                                        avgdata.midappearance   = data[0]['count(1)']
                                        sql = `SELECT count(1) FROM orders WHERE goods_id='${goods_id}' and appearancestar>'4' and appearancestar<='5'`
                                        exec(sql).then(data=>{
                                            avgdata.goodappearance = data[0]['count(1)']
                                            sql = `SELECT count(1) FROM orders WHERE goods_id='${goods_id}' and pricestar>'0' and pricestar<='2'`
                                            exec(sql).then(data=>{
                                                avgdata.badprice= data[0]['count(1)']
                                                sql = `SELECT count(1) FROM orders WHERE goods_id='${goods_id}' and pricestar>'2' and pricestar<='4'`
                                                exec(sql).then(data=>{
                                                    avgdata.midprice  = data[0]['count(1)']
                                                    sql = `SELECT count(1) FROM orders WHERE goods_id='${goods_id}' and pricestar>'4' and pricestar<='5'`
                                                    exec(sql).then(data=>{
                                                        avgdata.goodprice = data[0]['count(1)']
                                                        res.json({
                                                            code: 1,
                                                            avgdata
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                                
                            })
                        })
                    })

                })
            })
        }).catch(err=>{
            res.json({
                code: 0,
                err
            })
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})

//社区
//创建话题
member.post('/sharetopic',(req,res)=>{
    const {title,content,member_id,img,share_id} = req.body;
    let  created_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let sql = ` create table if not exists shares(
        share_id int primary key auto_increment,
        title varchar(600),
        content varchar(600),
        img varchar(1000),
        created_at timestamp NOT NULL ,
        updated_at timestamp NULL,
        agree int default 0,
        member_id int,
        foreign key(member_id ) references members(member_id)
    )`
    // created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
    //     updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
    exec(sql).then(data=>{
        sql = `insert into shares(title,content,img,member_id,created_at) values('${title}','${content}','${img}',
        '${member_id}','${created_at}')`
        exec(sql).then(data=>{
            res.json({
                code: 1,
                data
            })
        }).catch(err=>{
            res.json({
                code: 0,
                err
            })
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})

//查询话题
member.get('/getshare',(req,res)=>{
    const {type,member_id,share_id}=req.query;
    let sql = '';
        if(type == 0){
            sql =`select * from shares where 1=1 order by cast(created_at as datetime) desc`
        }else if(type ==1){
            sql =`select * from shares where member_id=${member_id} order by cast(created_at as datetime) desc`
        }
        if(share_id!=undefined){
            sql =`select * from shares where share_id='${share_id}'`
        }
    exec(sql).then(data=>{
        data = data;
        for(let i = 0; i<data.length; i++){
           data[i].imgurl=getAllUrl(data[i].img)
           data[i].created_at = moment(data[i].created_at).format('YYYY-MM-DD HH:mm:ss')
           const {member_id,share_id}  = data[i]
           sql = `select * from members where member_id='${member_id}'`
           exec(sql).then(members=>{
                const {user} = members[0]
                data[i].user = user
                sql = `select * from shareother where member_id = '${member_id}' and share_id='${share_id}'`
                exec(sql).then(info=>{
                    if(info.length>0){
                        const {follow} = info[0]
                        data[i].follow = follow
                    }
                    if(i==data.length-1){
                        res.json({
                            code: 1,
                            data
                        })
                    }
                })
               
           })
        }
        
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})

//查询与我有关话题
member.get('/getshare/about',(req,res)=>{
    const {type,member_id}=req.query;
    let sql = '';
    if(type==2){
        sql = `select * from shareother where follow='1' and member_id = '${member_id}'`
    }else if(type == 3){
        sql = `select * from answer where member_id = '${member_id}'`
    }
    exec(sql).then(data=>{
        let share_id = ''
        if(data.length<1){
            res.json({
                code: 1,
                data: []
            })
            return
        }
        for(let i=0; i<data.length;i++){
            share_id = data[i].share_id
            sql = `select * from shares where share_id='${share_id}'`
            exec(sql).then(data=>{
                data = data
                let id = data[0].member_id;
                sql = `select * from members where member_id='${id}'`
                exec(sql).then(members=>{
                     const {user} = members[0]
                     data[i].user = user
                     sql = `select * from shareother where member_id = '${member_id}' and share_id='${share_id}'`
                     exec(sql).then(info=>{
                         const {follow} = info[0]
                         data[i].follow = follow
                         if(i==data.length-1){
                             res.json({
                                 code: 1,
                                 data
                             })
                         }
                     })
                    
                })
            })
        }
    })
})


//同意或取消话题
member.post('/share/agree',(req,res)=>{
    const {member_id,share_id,status} = req.body;
    let sql = `select * from shareother where member_id = '${member_id}' and share_id='${share_id}'`
    exec(sql).then(data=>{
        data = data;
        let agree = '';

        if(data.length>0){
            agree = data[0].agree
            if(agree>0){
                if(status==0){
                    sql = `update shareother set agree='0' where member_id = '${member_id}' and share_id='${share_id}'`
                }else {
                    res.json({
                        code: 2,
                        msg: '你自己同意过该主题'
                    })
                    return;
                }
            }else {
                if(status==0){
                    res.json({
                        code: 2,
                        msg: '你还未同意过该主题'
                    })
                    return;
                }else{
                    sql =  `update shareother set agree='1' where member_id = '${member_id}' and share_id='${share_id}'`
                }
            }
        }else {
            sql = `insert into shareother(member_id,share_id,agree) values('${member_id}','${share_id}','1')`
        }
       
        exec(sql).then(data=>{
            sql = `select  count(1) from shareother where share_id='${share_id}' and agree='1'`
            exec(sql).then(data=>{
               let  count = data[0]['count(1)']
                sql = `update shares set agree='${count}' where share_id ='${share_id}' `
                    exec(sql).then(data=>{
                        res.json({
                            code: 1,
                            data
                        })
                })
            })
        }).catch(err=>{
            res.json({
                code: 0,
                err
            })
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})

//关注或取消话题
member.post('/share/follow',(req,res)=>{
    const {member_id,share_id} = req.body;
    let sql = `select * from shareother where member_id = '${member_id}' and share_id='${share_id}'`
    exec(sql).then(data=>{
        data = data;
        let follow = '';
        if(data.length>0){
            follow = data[0].follow;
            if(follow>0){
                sql = `update shareother set follow='0' where member_id = '${member_id}' and share_id='${share_id}'`
            }else{
                sql = `update shareother set follow='1' where member_id = '${member_id}' and share_id='${share_id}'`
            }
        }else {
            sql = `insert into shareother(member_id,share_id,follow) values('${member_id}','${share_id}','1')`
        }
        exec(sql).then(data=>{
            res.json({
                code: 1,
                data
            })
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})

//回复话题
member.post('/share/comment',(req,res)=>{
    const {share_id,member_id,content} = req.body;
    let sql = `insert into answer(share_id,member_id,answer) values('${share_id}','${member_id}','${content}')`
    exec(sql).then(data=>{
        res.json({
            code: 1,
            data
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})

//获取这一话题的信息
member.get('/share/answer',(req,res)=>{
    const {share_id} = req.query;
    let sql =`select *,count(1) from answer where share_id='${share_id}'`,
        member_id = '',
        answer_id  = '',
        total = 0;
    exec(sql).then(data=>{
        total = data[0]['count(1)']
        for(let i = 0;i<data.length;i++){
            member_id = data[i].member_id
            answer_id = data[i].answer_id
            sql = `select * from members where member_id='${member_id}'`
            exec(sql).then(members=>{
                data[i].user= members[0].user
                    sql = `select * from replys where answer_id = '${answer_id}'`
                    exec(sql).then(answer =>{
                        data.answer = answer
                        sql = `select * from replyother where member_id = '${member_id}' and answer_id='${answer_id}'`
                        exec(sql).then(info=>{
                            if(info.length>0){
                                const {follow} = info[0]
                                data[i].follow = follow
                            }
                            if(i==data.length-1){
                                res.json({
                                    code: 1,
                                    data,
                                    total
                                })
                            }
                    })
                     
                    })
                    
            })
        }
    })
})

//赞同或取消这一回答
member.post('/share/reply/agree',(req,res)=>{
    const {member_id,answer_id,status} = req.body;
    let sql = `select * from replyother where member_id = '${member_id}' and answer_id='${answer_id}'`
    exec(sql).then(data=>{
        data = data;
        let agree = '';

        if(data.length>0){
            agree = data[0].agree
            if(agree>0){
                if(status==0){
                    sql = `update replyother set agree='0' where member_id = '${member_id}' and answer_id='${answer_id}'`
                }else {
                    res.json({
                        code: 2,
                        msg: '你自己同意过该回复'
                    })
                    return;
                }
            }else {
                if(status==0){
                    res.json({
                        code: 2,
                        msg: '你还未同意过该回复'
                    })
                    return;
                }else{
                    sql =  `update replyother  set agree='1' where member_id = '${member_id}' and answer_id='${answer_id}'`
                }
            }
        }else {
            sql = `insert into replyother (member_id,answer_id,agree) values('${member_id}','${answer_id}','1')`
        }
       
        exec(sql).then(data=>{
            sql = `select  count(1) from replyother  where answer_id='${answer_id}' and agree='1'`
            exec(sql).then(data=>{
               let  count = data[0]['count(1)']
                sql = `update answer set agree='${count}' where  answer_id='${answer_id}'`
                    exec(sql).then(data=>{
                        res.json({
                            code: 1,
                            data
                        })
                })
            })
        }).catch(err=>{
            res.json({
                code: 0,
                err
            })
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})

//关注或取消这一回答
member.post('/share/answer/follow',(req,res)=>{
    const {member_id,answer_id} = req.body;
    let sql = `select * from replyother where member_id = '${member_id}' and answer_id='${answer_id}'`
    exec(sql).then(data=>{
        data = data;
        let follow = '';
        if(data.length>0){
            follow = data[0].follow;
            if(follow>0){
                sql = `update replyother set follow='0' where member_id = '${member_id}' and answer_id='${answer_id}'`
            }else{
                sql = `update replyother set follow='1' where member_id = '${member_id}' and answer_id='${answer_id}'`
            }
        }else {
            sql = `insert into replyother(member_id,share_id,follow) values('${member_id}','${answer_id}','1')`
        }
        exec(sql).then(data=>{
            res.json({
                code: 1,
                data
            })
        }).catch(err=>{
            res.json({
                code: 0,
                err
            })
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})

//评论
member.post('/send/reply',(req,res)=>{
    const {member_id,answer_id,replyval} = req.body;
    let sql = `insert into replys(member_id,answer_id,reply_comment) values('${member_id}','${answer_id}','${replyval}')`
    exec(sql).then(data=>{
        res.json({
            code: 1,
            data
        })
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})
//查询评论
member.get('/share/getreply',(req,res)=>{
    const {answer_id} = req.query;
    let sql = `select *,count(1) from replys where answer_id = '${answer_id}'`,
        member_id = '',
        total = 0;
    exec(sql).then(data=>{
        total = data[0]['count(1)']
        for(let i = 0;i<data.length;i++){
            member_id = data[i].member_id
            sql = `select * from members where member_id = '${member_id}'`
            exec(sql).then(members=>{
                if(members.length>0){
                    const {user} = members[0]
                    data[i].user = user
                }
                if(i==data.length-1){
                    res.json({
                        code: 1,
                        data,
                        total
                    })
                }
            }).catch(err=>{
                res.json({
                    code: 0,
                    err
                })
            })
        }

    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})

//查询优惠卷
member.get('/search/mydiscount',(req,res)=>{
    const {member_id} = req.query;
    let sql = `select * from mydiscounts where member_id = '${member_id}'`
    exec(sql).then(data=>{
        console.log(data)
        if(data.length==0){
            res.json({
                code: 1,
                data
            })
        }
        let discount = '';
        for(let i= 0; i<data.length;i++){
            discount = data[i].discount;
            sql = `select * from shops where shop_id = '${data[i].shop_id}'`
            exec(sql).then(shop=>{
                data[i].shop = shop[0]
                if(i==data.length-1){
                    res.json({
                        code: 1,
                        data
                    })
                }
            }).catch(err=>{
                res.json({
                    code: 0,
                    err
                })
            })
        }
    }).catch(err=>{
        res.json({
            code: 0,
            err
        })
    })
})

//方法
//查询评价范围的方法
// function rang(goods_id,target,begin,end){
   
//     let a =exec(sql).then(data=>{
//         return 
//     })
//     return a
// }


//执行sql函数

//获取图片的途径
function getFristUrl(img){
    let arr = img,
        first = arr.split(';'),
        last = first[0].split(','),
        url = last[2];
    return url;
            
} 
function getAllUrl(data){
    // let arr = [],
    //     first = [],
    //     last = [],
    //     url = '';
    //     for(let i = 0; i<data.length;i++){
    //         arr = data[i].banner
    //         first = arr.split(';');
    //         last = first[0].split(',');
    //         url = last[2]
    //         data[i].url = url
    //     }
    let infos = [],
        fileUrl = [],
        infoarr = data.split(';');
        for(let i = 0; i<infoarr.length-1; i++){
            fileUrl = infoarr[i].split(',')
                infos[i] = {
                    'name':fileUrl[0],
                    'uid': fileUrl[1],
                    'url': fileUrl[2],
           
                }
            }
         return　infos;   

}
module.exports = member;
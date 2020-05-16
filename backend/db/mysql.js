const mysql = require('mysql')

const {MYSQL_CONF}  = require('../config/db')

//创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

//开始连接
con.connect()

//统一执行sql的函数
function  exec(sql){
    const promise = new Promise((resolve, reject)=>{
        con.query(sql,(err,result)=>{
            if(err){
                reject(err);
                return 
               
            }
        // console.log(result);
        resolve(result)
        });
    })
    return promise
}

async function exec2(sql){
    const promise = new Promise((resolve, reject)=>{
        con.query(sql,(err,result)=>{
            if(err){
                reject(err);
                return 
               
            }
        // console.log(result);
        resolve(result)
        });
    })
    return promise
}
module.exports = {
    exec,
    exec2
}

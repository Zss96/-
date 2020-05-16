
const mysql = require('mysql')
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '199696',
    port: '3306',
    database: 'mall'
})

con.connect((err, result) => {
    if (err) {
      console.log(err);
      
      console.log("连接失败");
      return;
    }
    console.log(result);
    console.log("连接成功");
  });
  module.exports = con
  
// const sql = "insert into admins (user,`password`) values('admin','admin')"
// const sql="CREATE TABLE admins(admin_id int primary key auto_increment,user varchar(255),password varchar(255))"
// const sql ="drop table admins"
// con.query(sql,(err,result)=>{
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log(result);
// });

// con.end()
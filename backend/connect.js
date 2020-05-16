var mysql= require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '199696',
  database : 'mall'
});
connection.connect((err, result) => {
    if (err) {
      console.log(err);
      console.log("连接失败");
      return;
    }
    console.log(result);
    console.log("连接成功");
  });

  // const sql = "insert into admin (user,`password`) values('admin','admin')"

connect.query(sql,(err,result)=>{
    if(err){
        console.log(err);
        return
    }
    console.log(result);
});
connect.end()
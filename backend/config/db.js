// const env = process.env.NODE_ENV

// console.log(env)

let MYSQL_CONF

//开发环境下

    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '199696',
        port: '3306',
        database: 'mall'
    }


//线上
// if(env ==='production'){
//     MYSQL_CONF = {
//         host: '192.168.31.151',
//         user: 'root',
//         password: '199696',
//         port: '3306',
//         database: 'mall'
//     }
// }

module.exports = {
    MYSQL_CONF 
}
import axios from 'axios'
import qs from 'qs';

  const service = axios.create({
    baseURL: 'http://192.168.31.151:8000', 
  

  })
   
  let http = function(url, data={}, method = 'get',  headers={
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }) {
    return new Promise((resolve, reject) => {
      const options = {
        url,
        method,
        headers
      }
      if (method.toLowerCase() === 'get') {
        options.params = data
      } else {
        options.data = qs.stringify(data)
      }
      service(options)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
          console.error(error)
        })
    })
  }
  let reqUrl = 'http://192.168.31.151:8000';
  export{
    http,
    reqUrl
  }

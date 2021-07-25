const fetch = require("node-fetch")

async function userAuthentication(name, password){

    const user = {
      name: name,
      password: password
    }


    const status = await fetch("https://hahow-recruit.herokuapp.com/auth",{
    method: 'POST',
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })


  if(status.status === 200){
      return true
  }

  return false
}

module.exports = {
    userAuthentication
}
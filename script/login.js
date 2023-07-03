document.querySelector("#myLogin_form").addEventListener("submit",Formsubmit_Login)

function Formsubmit_Login(e){
    e.preventDefault()
    console.log("form")

    let email = document.querySelector("#EM").value
    let password = document.querySelector("#PS").value

    // console.log(name,age,place,batch,profession)

    let obj = {
     email,password
    }

   RegisterUser(obj)
}

async function RegisterUser(data){
    console.log(data)
    let response =await fetch("https://reqres.in/api/login",{
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
       ...data
        })

    })
    let token = await response.json()
    if(token){
   let s =localStorage.setItem("token",JSON.stringify(token.token))
   console.log(s);
   alert("Login successful")
   window.location.href = "./data.html"
    }else{
        alert("something went wrong try again")
    }
}
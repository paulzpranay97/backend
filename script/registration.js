document.querySelector("#myform").addEventListener("submit",Formsubmit)

function Formsubmit(e){
    e.preventDefault()
    console.log("form")

    let name = document.querySelector("#NM").value


    let age = document.querySelector("#AG").value

    age = Number(age)
    let place = document.querySelector("#PL").value

    let batch_name = document.querySelector("#batch").value

    let profession = document.querySelector("#profession").value

    console.log(name,age,place,batch,profession)
    

    let obj = {
        name,age,place,batch_name,profession
    }

   RegisterUser(obj)
}

async function RegisterUser(data){
    let response =await fetch("https://masai-e5c9.onrender.com/users",{
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
       ...data
        })

    }).then((res)=>{
        return  res.status ==201? alert("Registeration Successful"):alert("something went wrong try again")
      })
  
}
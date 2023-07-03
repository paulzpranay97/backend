let token  = JSON.parse(localStorage.getItem("token"))

if(token){
    getData()
}else{
    alert("you are not autherised Login again")
    window.location.href="./login.html"
}


async function getData(){
    let response = await fetch(`https://masai-e5c9.onrender.com/users`)
    let data = await response.json()

     console.log(data)
     getTotal(data)
}


function getTotal(data){
    let Total = data.length
    let student = 0
    let professinal = 0

    data && data.forEach((el)=>{
        if(el.profession =="Student"){
            student++
        } 
        else {
            professinal++
        }
        
    })
console.log(Total,student,professinal)
    var row = document.createElement("tr")
   var col1 = document.createElement("td")
   col1.innerText = Total;
   var col2 = document.createElement("td")
   col2.innerText = student;
   var col3 = document.createElement("td")
   col3.innerText = professinal
   row.append(col1,col2,col3)
   document.querySelector("tbody").append(row)
   
}




let mainData;

let token = JSON.parse(localStorage.getItem("token"));
if (token) {
  getData("");
} else {
  alert("you are not autherised Login again");
  window.location.href = "./login.html";
}

async function getData(id) {
  let response = await fetch(
    `https://masai-e5c9.onrender.com/users/${id}`
  );
  let data = await response.json();
  if (!data.length) {
    data = [data];
  }

  mainData = data;

  displayData(data);
}

function displayData(data) {
  let Aluminie = document.querySelector("#data_container");
  Aluminie.innerHTML = null;
  data.forEach(function (el) {
    var card = document.createElement("div");
    card.setAttribute("id", "card");

    var imgdiv = document.createElement("div");
    imgdiv.setAttribute("id", "imgdiv");

    var img = document.createElement("img");
    img.src =
      "https://cdn2.vectorstock.com/i/1000x1000/25/31/user-icon-businessman-profile-man-avatar-vector-10552531.jpg";

    imgdiv.append(img);

    var name = document.createElement("h4");
    name.innerText = "Name  :" + el.name;

    var batch = document.createElement("h4");
    batch.innerText = "Batch  :" + el.batch_name;

    var age = document.createElement("h4");
    age.innerText = "Age  :" + el.age;

    var place = document.createElement("h4");
    place.innerText = "Place  :" + el.place;

    var profession = document.createElement("h4");
    profession.innerText = "Profession   :" + el.profession;

    var curdDiv = document.createElement("div");
    curdDiv.setAttribute("id", "curdDiv");

    var dltimgdiv = document.createElement("div");
    dltimgdiv.setAttribute("id", "dltimgdiv");

    var dltimg = document.createElement("img");
    dltimg.src =
      "https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg";
    dltimg.onclick = function () {
      deleteUser(el.id);
    };

    dltimgdiv.append(dltimg);

    var editimgdiv = document.createElement("div");
    editimgdiv.setAttribute("id", "editimgdiv");
  

    var editimg = document.createElement("img");
    editimg.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8NAtmSjC7VTD_fFFM6gBipEqb7xzXyHmsA_O0MRw&s";
      editimg.onclick=function(){
        ediFunction(el.id)
    }
    editimgdiv.append(editimg);

    curdDiv.append(dltimgdiv, editimgdiv);

    card.append(imgdiv, name, batch, age, place, profession, curdDiv);
    Aluminie.append(card);
  });
}

async function deleteUser(id) {
  console.log(id, "id");
  let response = await fetch(
    `https://masai-e5c9.onrender.com/users/${id}`,
    {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    }
  ).then((res)=> getData(""))
 
}

async function Searchuser() {
  let name = document.querySelector("#searchinput").value;

  if(!name) getData("")

  let response =
    await fetch(`https://masai-e5c9.onrender.com/users?name=${name}
     `);
  let data = await response.json();
  console.log(data, "filter");
  if (data.length == 0) return;
  
  console.log(name);
  displayData(data);
}

function ascedingSort() {
  let newData = mainData.sort((a, b) => a.age - b.age);
  //    console.log(newData)
  displayData(newData);
}

function descedingSort() {
  let newData = mainData.sort((a, b) => b.age - a.age);
  displayData(newData);
}

async function filterBatch() {
  let batch = document.querySelector("#filterbatch").value;
  if (batch == "All") return getData("");
  console.log(batch);
  let response =
    await fetch(`https://masai-e5c9.onrender.com/users?batch_name=${batch}
    `);
  let data = await response.json();
  // console.log(data,"filter")
  displayData(data);
}


function ediFunction(id){

    let usermodel = document.querySelector("#userModel")
    usermodel.style.display = "block"
    

    let model = document.createElement("div")
    model.setAttribute("id","model")

    let input = document.createElement("input")
    input.placeholder = "type profession "
    input.setAttribute("id","inputModel")

    let Editbut = document.createElement("button")
    Editbut.innerText= "Update"
    Editbut.onclick = function(){
        Changeprofesion(id)
    }


    model.append(input,Editbut)
    document.querySelector("#userModel").append(model)
    

}

async function Changeprofesion(id){

    let usermodel = document.querySelector("#userModel")
    usermodel.style.display = "none"


    let profession = document.querySelector("#inputModel").value
    console.log(profession)



    let response = await fetch(`https://masai-e5c9.onrender.com/users/${id}`,
    { method:"PATCH",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      profession:profession
    })

  }).then((res)=>{console.log(res)
      res.status ==200? alert("update Successful"): alert("something went wrong try again")
      return getData("")
      })
  
}
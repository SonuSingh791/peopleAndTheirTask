let inputPeople = document.querySelector(".input-people");
let inputName = document.getElementById("name")
let inputContactNo = document.getElementById("c-no");
let inputEmail = document.getElementById("email");
let addBtn = document.querySelector('.add-btn');
let dropdownContent = document.querySelector(".dropdown-content");
let addPeopleBtn = document.querySelector(".add-people-btn");
let aEle = document.querySelectorAll(".dropdown-content a")
let assignTaskContainer = document.querySelector(".assign-task-container");
let peopleName = document.querySelector(".name");
let selectedPeople = document.querySelector(".selected-people");
let selectedPeopleTask = document.querySelector(".task");
// let mainContainer = document.querySelector(".main-container");
let peopleTaskContainer = document.querySelector(".people-task-container");
let modalContainer = document.querySelector(".modal");
let assignBtn = document.querySelector(".assign-btn");
let ticketName = document.getElementById("ticket_name");
let successAlert = document.querySelector(".success-alert")
let dangerAlert = document.querySelector(".danger-alert")
let textAlert = document.querySelector(".text-alert");
let deleteAlert = document.querySelector(".delete-alert");
let theme = document.querySelector(".theme");
let dropBtn = document.querySelector(".dropbtn")
let search = document.getElementById("myInput");
let closeModal = document.querySelector(".close");
let closeInput = document.querySelector(".close-input");
let taskArr = [];
let pos=1;
let root = document.querySelector(':root');
function set_property(){
    setTimeout(() => {
        root.style.setProperty('--position', 'fixed');
        root.style.setProperty('--ticketPosition', 'relative');
        root.style.setProperty('--opacity', '1');
    }, 100);
    root.style.setProperty('--beforeLeft', '0%');
    root.style.setProperty('--afterLeft', '0%');
}
set_property();
function myFunction() {
    document.getElementsByClassName("dropdown-wrapper")[0].classList.toggle("show");
  }
  theme.addEventListener("click", (e) => {
      if(theme.innerText === "light_mode"){
          theme.innerText = "dark_mode"
        //   theme.style.color = "black"
          root.style.setProperty("--color", "black")
          document.body.style.background = "#bbfcfc";
          
        }
        else{
            theme.innerText = "light_mode";
            // theme.style.color = "white"
            root.style.setProperty("--color", "white")
            document.body.style.background = "#161623";
      }
  })
  closeModal.addEventListener("click", (e) => {
      modalContainer.style.display = "none";
      ticketName.value = "";
  })
  closeInput.addEventListener("click", (e) => {
      inputPeople.style.display = "none"
      inputName.value=""
      inputEmail.value=""
      inputContactNo.value=""
  })
  addBtn.addEventListener("click", (e) => {
      if(inputName.value===""){
          textAlert.style.top = "0px"
          setTimeout(() => {
              textAlert.style.top = "-4rem";
          }, 2000);
      }
      else{
          let a = document.createElement("a");
          a.setAttribute("href", "#");
          a.innerHTML=inputName.value
          dropdownContent.appendChild(a);
          aEle = dropdownContent.querySelectorAll("a");
          console.log(aEle)
          inputPeople.style.display = "none";
          inputName.value=""
          inputEmail.value=""
          inputContactNo.value=""
          handlePeople()
      }
  })
  addPeopleBtn.addEventListener("click", (e) => {
    //   console.log(e)
    inputPeople.style.display = "flex";
  })
  aEle.forEach((a) => {
    a.addEventListener("click", ()=>fun(a))
})
  function handlePeople(){
      aEle.forEach((a) => {
          a.removeEventListener("click", fun);
          a.addEventListener("click", ()=>fun(a))
    })
  }
function fun(a)  {
    inputPeople.style.display = "none";
    // assignTaskContainer.style.display = "block";
    modalContainer.style.display = "flex";
    peopleName.innerText = a.innerText;
}
assignBtn.addEventListener("click", (e) => {
    if(ticketName.value!==""){
        let task = [];
    let objIdx = taskArr.find((o)=> o.Name==peopleName.innerText);
    // let pos = taskAr
    // console.log(idx)
    task.push({task:ticketName.value, isCompleted:"Pending"})
    if(objIdx){
        // console.log(idx)
        objIdx.Tasks.push({task:ticketName.value, isCompleted:"Pending"});
    }
    else{
        if(taskArr.length > 0){
            let currPos = taskArr[taskArr.length - 1].Position + 1;
            // console.log(currPos)
            taskArr.push({Name:peopleName.innerText,Tasks:task,Position:currPos})
        }
        else{
            taskArr.push({Name:peopleName.innerText,Tasks:task,Position:1})
        }
    }
    // console.log(taskArr)
    modalContainer.style.display = "none";
    ticketName.value = "";
    PeopleAndTheirTask();
    // console.log(peopleName.innerText)
    let idx = taskArr.findIndex((o) => o.Name===peopleName.innerText)
    console.log(idx)
    // if(window.innerWidth > 300)
    // console.log(window.innerWidth)
    if(window.innerWidth > 300 && window.innerWidth < 768){
        setTimeout(() => {
            let noOfTaskInArow =Math.ceil(taskArr[idx].Tasks.length) 
            console.log(noOfTaskInArow)
            let Ypos = 400 * parseInt(taskArr[idx].Position) + (noOfTaskInArow * 280)
            window.scrollTo(0, Ypos);
            
        }, 100);
    }
    else{
        setTimeout(() => {
            let noOfTaskInArow =Math.ceil(taskArr[idx].Tasks.length/4) 
            console.log(noOfTaskInArow)
            let Ypos = 400 * parseInt(taskArr[idx].Position) + (noOfTaskInArow * 300)
            window.scrollTo(0, Ypos);
            
        }, 100);
    }
    }
    else{
        textAlert.style.top = "0px";
        setTimeout(() => {
            textAlert.style.top = "-4rem";
        }, 2000);
    }
    
})

function PeopleAndTheirTask(){

    peopleTaskContainer.innerHTML=""
    // mainContainer.innerHTML = "";
    // peopleTaskContainer.appendChild(mainContainer);
    taskArr.forEach((o)=>{
        let h1 = document.createElement("h1");
        h1.classList.add("selected-people");
        h1.innerText = o.Name + "'s " + "Task";
        // peopleTaskContainer.insertBefore(h1,mainContainer);
        peopleTaskContainer.appendChild(h1);
        // peopleTaskContainer.appendChild(mainContainer);
        for(let i = 0;i<o.Tasks.length;i++){
            let isCompleted = o.Tasks[i].isCompleted;
            let isDone = isCompleted==="Completed"?"done":""
            console.log(o.Tasks[i].task)
            let div = document.createElement("div");
            div.classList.add("main-container");
            div.innerHTML = `<div class="task-container">
                                <h3 class="task">${i + 1}. ${o.Tasks[i].task}</h3>
                                <div class="submit-task">
                                    
                                    <div class="upload-btn">Upload<input type="file" /></div>
                                    <button class="submit-btn">Submit</button>
                                    <button class="delete-btn">Delete</button>
                                    <div class="check-icon">
                                        <div class="check material-icons">${isDone}</div>
                                    </div>
                                </div>
                            </div>
            `
            peopleTaskContainer.appendChild(div);
            let submitTaskContainer = div.querySelector(".submit-task")
            handleFileSubmition(submitTaskContainer,o.Tasks[i]);
            handleDelete(submitTaskContainer, i, o.Name,h1);
        }

    })
}


function handleFileSubmition(submitTaskContainer,o){
    let file = null;
    submitTaskContainer.children[0].addEventListener("change", (e) => {
        file = e.target.files[0];
        // console.log(file);
    })
    submitTaskContainer.children[1].addEventListener("click", (e) => {
        if(file){
            successAlert.style.top = "0px";
            setTimeout(() => {
                successAlert.style.top = "-4rem";
            }, 2000);
            o.isCompleted = "Completed"
            submitTaskContainer.children[3].children[0].innerHTML = "done";
        }
        else{
            // alert("please select file")
            dangerAlert.style.top = "0px"
            setTimeout(() => {
                dangerAlert.style.top = "-4rem"
            }, 2000);
        }
    })

}
function handleDelete(submitTaskContainer, idx, name,h1){
    submitTaskContainer.children[2].addEventListener("click", (e) => {
        let obj;
        taskArr.forEach((o) => {
            if(o.Name===name){
                console.log(o);
                console.log(idx)
                console.log(o.Tasks[idx]);
                if(o.Tasks[idx].isCompleted==="Completed"){
                    o.Tasks.splice(idx,1);
                    submitTaskContainer.parentElement.remove();
                    PeopleAndTheirTask();
                }
                else{
                    deleteAlert.style.top = "0px"
                    setTimeout(() => {
                        deleteAlert.style.top = "-4rem"
                    }, 2000);
                }
                obj = o;
            }
        })          

        if(obj.Tasks.length==0){
            let indx = taskArr.findIndex((ob) => ob.Name===name);
            console.log(indx)
            taskArr.splice(indx,1);
            h1.remove();
            console.log(obj)
            PeopleAndTheirTask()
        }
    })
}

  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  modalContainer.addEventListener("mousedown", (event) => {
    let shiftX = event.clientX - modalContainer.getBoundingClientRect().left;
    let shiftY = event.clientY - modalContainer.getBoundingClientRect().top;
  
    modalContainer.style.position = 'absolute';
    modalContainer.style.zIndex = 1000;
    // document.body.append(modalContainer);
  
    moveAt(event.pageX, event.pageY);
  
    // moves the modalContainer at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      modalContainer.style.left = pageX - shiftX + 'px';
      modalContainer.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the modalContainer on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the modalContainer, remove unneeded handlers
    modalContainer.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      modalContainer.onmouseup = null;
    };
  
  
  modalContainer.ondragstart = function() {
    return false;
  };
  })

  
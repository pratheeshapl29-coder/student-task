function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `
        ${task}
        <button class="delete" onclick="deleteTask(this)">Delete</button>
    `;

    document.getElementById("taskList").appendChild(li);
    input.value = "";
}

function deleteTask(button) {
    button.parentElement.remove();
}
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();


function addTask(){

    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if(taskText === ""){
        alert("Enter a task");
        return;
    }

    let task = {
        name: taskText,
        completed:false
    };

    tasks.push(task);

    saveTasks();

    input.value="";

    displayTasks();
}


function displayTasks(){

    let list = document.getElementById("taskList");

    list.innerHTML="";


    tasks.forEach((task,index)=>{

        let li=document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }


        li.innerHTML=`
        ${task.name}

        <div>
        <button class="complete-btn" onclick="completeTask(${index})">
        ✓
        </button>

        <button class="delete" onclick="deleteTask(${index})">
        Delete
        </button>
        </div>
        `;


        list.appendChild(li);

    });


    updateProgress();

}



function completeTask(index){

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();

}



function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    displayTasks();

}



function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

}



function updateProgress(){

    let total = tasks.length;

    let completed = tasks.filter(
        task => task.completed
    ).length;


    document.getElementById("total").innerHTML=total;

    document.getElementById("completed").innerHTML=completed;

    document.getElementById("pending").innerHTML=
    total-completed;

}

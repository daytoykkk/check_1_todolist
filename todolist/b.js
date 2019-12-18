function addTodolist(){
    let obj_list = {
        todo:"",
        done: false
    };
    document.getElementById("add_list").value=document.getElementById("add_list").value.trim();
    if(document.getElementById("add_list").value.length === 0){
        alert("不能为空噢！");
        return ;
    }
    

    obj_list.todo = document.getElementById("add_list").value;
    todolist.push(obj_list);

   saveData(todolist);

    document.getElementById("add_list").value="";
    load();

}


function load(){
    let todo = document.getElementById("todolist"),
    done = document.getElementById("donelist"),
    todocount = document.getElementById("todocount"),
    donecount = document.getElementById("donecount"),
    todoString = "",
    doneString = "",
    todoCount = 0,
    doneCount = 0;
   
    todolist = loadData();
    
    if (todolist != null){
    for (var i=0; i<todolist.length; i ++){
    if(!todolist[i].done){
    todoString += "<li>" + "<input type='checkbox' onchange='update("+i+", \"done\", true)'>"
        + "<p id='p-"+i+"' onclick='edit("+i+")'>" + todolist[i].todo + "</p>" +
        "<a onclick='remove("+i+")'>-</a>" +
        "</li>"; 
       todoCount ++;
       }
   else{
    doneString += "<li>"
     + "<input type='checkbox' "
     + "onchange='update("+i+", \"done\", false)' checked>"
     + "<p id='p-"+i+"' onclick='edit("+i+")'>" + todolist[i].todo + "</p>"
     + "<a onclick='remove("+i+")'>-</a>"
     + "</li>";
    doneCount ++;
    }
     }

     todo.innerHTML = todoString;
     done.innerHTML = doneString;
     todocount.innerHTML = todoCount;
     donecount.innerHTML = doneCount;
    }
    else {
     todo.innerHTML = "";
     done.innerHTML = "";
     todocount.innerHTML = 0;
     donecount.innerHTML = 0;
    }
}

function edit(i) {
    let p = document.getElementById('p-' + i);
    let area = null;

    p.onclick = function(){
        editStart();
    };

    function editStart(){
        area = document.createElement('input');
        area.className='edit';
        area.value = p.innerHTML;

        area.onkeydown = function(event){
            if(event.key=='Enter'){
                this.onblur();
            }
        };
    area.onblur = function(){
            editEnd();
            
        };

        p.replaceWith(area);
        area.focus();
       
    };

   function editEnd(){
       p.innerHTML = area.value;
       area.replaceWith(p);
       update(i,"todo",area.value);
   }
    
}


function update(i,field,value){
    todolist[i][field] = value;
    saveData(todolist);
    load();
}

function remove(i) {
    todolist.splice(i,1);

    saveData(todolist);

    load();
}


function saveData(data){
    localStorage.setItem("mytodolist", JSON.stringify(data));
}

function loadData(){
    let hisTory = localStorage.getItem("mytodolist");
    if(hisTory!=null){
        return JSON.parse(hisTory);
    }

    else { return []; }
}

function clear() {
    localStorage.clear();
    load();
}

window.addEventListener("load",load);
document.getElementById("clearbutton").onclick = clear;
document.getElementById("add_list").onkeypress = function(event) {
    if(event.keyCode === 13){
        addTodolist();
    }
};



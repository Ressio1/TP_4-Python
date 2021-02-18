GetAll();
function GetAll ()
{
    const tableau = document.getElementById("table1");
    var result = new XMLHttpRequest();
    tableau.innerHTML="<thead class=\"thead-dark\"><tr><th scope=\"col\">Id</th><th scope=\"col\">Deadline</th><th scope=\"col\">Title</th><th scope=\"col\">Description</th><th scope=\"col\">Done</th></tr></thead>";
    var valeurs;
    result.open("get", "http://127.0.0.1:5000/todo", true);
    result.send();
    result.responseType = "json";
    result.onload = function() {
    var Finale = result.response;
    Finale.forEach(element => {
        tr = document.createElement('tr');
        valeurs = element[0];
        td1 = document.createElement('td');
        td1.innerHTML = valeurs;

        valeurs = element[1];
        td2 = document.createElement('td');
        td2.innerHTML = valeurs;

        valeurs = element[2];
        td3 = document.createElement('td');
        td3.innerHTML = valeurs;

        valeurs = element[3];
        td4 = document.createElement('td');
        td4.innerHTML = valeurs;

        valeurs = element[4];
        td5 = document.createElement('td');
        td5.innerHTML = valeurs;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        tableau.appendChild(tr);
    });
    }    
};

function PostTask()
{
    var DeadLine = document.getElementById("InputDeadline1");
    var Title = document.getElementById("inputTitle1");
    var Description = document.getElementById("InputDescription1");
    var Done = document.getElementById("InputDone1");
    var data = {};
    data.deadline = DeadLine.value;
    data.title  = Title.value;
    data.Description = Description.value;
    data.done = Done.value;
    var json = JSON.stringify(data);
    var result = new XMLHttpRequest();
    result.open("POST", "http://127.0.0.1:5000/todo", true);
    result.setRequestHeader('Content-type','application/json; charset=utf-8');
    result.send(json);
    result.onload = function() {
        GetAll();
    }
}   

function GetDateTask()
{
    const tableau = document.getElementById("table1");
    tableau.innerHTML="<thead class=\"thead-dark\"><tr><th scope=\"col\">Id</th><th scope=\"col\">Deadline</th><th scope=\"col\">Title</th><th scope=\"col\">Description</th><th scope=\"col\">Done</th></tr></thead>";

    var result = new XMLHttpRequest();
    var valeurs;
    var DeadLine = document.getElementById("InputDeadline");
    var params = '?date='+DeadLine.value;
    result.open("GET", "http://127.0.0.1:5000/todo"+params, true);
    result.send();
    result.responseType = "json";
    result.onload = function() {
        var Finale = result.response;
        Finale.forEach(element => {
            tr = document.createElement('tr');
            valeurs = element[0];
            td1 = document.createElement('td');
            td1.innerHTML = valeurs;
        
            valeurs = element[1];
            td2 = document.createElement('td');
            td2.innerHTML = valeurs;
        
            valeurs = element[2];
            td3 = document.createElement('td');
            td3.innerHTML = valeurs;
        
            valeurs = element[3];
            td4 = document.createElement('td');
            td4.innerHTML = valeurs;
        
            valeurs = element[4];
            td5 = document.createElement('td');
            td5.innerHTML = valeurs;
        
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tableau.appendChild(tr);
        });
        }    
};

function GetIdTask()
{
    const tableau = document.getElementById("table1");
    tableau.innerHTML="<thead class=\"thead-dark\"><tr><th scope=\"col\">Id</th><th scope=\"col\">Deadline</th><th scope=\"col\">Title</th><th scope=\"col\">Description</th><th scope=\"col\">Done</th></tr></thead>";

    var result = new XMLHttpRequest();
    var valeurs;
    var Id = document.getElementById("InputId");
    var params = Id.value;
    result.open("GET", "http://127.0.0.1:5000/todo/"+params, true);
    result.send();
    result.responseType = "json";
    result.onload = function() {
        var Finale = result.response;
        Finale.forEach(element => {
            tr = document.createElement('tr');
            valeurs = element[0];
            td1 = document.createElement('td');
            td1.innerHTML = valeurs;
        
            valeurs = element[1];
            td2 = document.createElement('td');
            td2.innerHTML = valeurs;
        
            valeurs = element[2];
            td3 = document.createElement('td');
            td3.innerHTML = valeurs;
        
            valeurs = element[3];
            td4 = document.createElement('td');
            td4.innerHTML = valeurs;
        
            valeurs = element[4];
            td5 = document.createElement('td');
            td5.innerHTML = valeurs;
        
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tableau.appendChild(tr);
        });
        }    
};

function DeleteTask()
{
    var result = new XMLHttpRequest();
    var valeurs;
    var Id = document.getElementById("InputId");
    var params = Id.value;
    result.open("DELETE", "http://127.0.0.1:5000/todo/"+params, true);
    result.onload = function() {
        GetAll();
    }
    result.send();
    
}

function UpdateTask()
{
    var identifiant = document.getElementById("Id1");
    var DeadLine = document.getElementById("InputDeadline1");
    var Title = document.getElementById("inputTitle1");
    var Description = document.getElementById("InputDescription1");
    var Done = document.getElementById("InputDone1");
    var data = {};
    var test = identifiant.value;
    data.deadline = DeadLine.value;
    data.title  = Title.value;
    data.Description = Description.value;
    data.done = Done.value;
    var json = JSON.stringify(data);
    var result = new XMLHttpRequest();
    result.open("PUT", "http://127.0.0.1:5000/todo/"+test, true);
    result.setRequestHeader('Content-type','application/json; charset=utf-8');
    result.send(json);
    result.onload = function() {
        GetAll();
    }
}   
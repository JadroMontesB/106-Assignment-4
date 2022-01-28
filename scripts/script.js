let isImportant = false;
var isAsideVisible = true;

function toggleImportant(){

    let icon = $(".iImportant")

    if(isImportant)
    {
      icon.removeClass("fas").addClass("far");
      isImportant = false;

    }
    else
    {
        icon.removeClass("far").addClass("fas");
        isImportant = true;
    }


}

function toggleDetails(){

    let aside = $("aside");
    
    if(isAsideVisible)
    {
        aside.hide();
        isAsideVisible = false;
    }
    else
    {
        aside.show();
        isAsideVisible = true;
    }

}

function saveTask(){

    let tittle = $("#txtTitle").val();
    let dueDate = $("#txtdueDate").val();
    let location = $("#txtLocation").val();
    let description = $("#txtDes").val();
    let participants = $("#txtPar").val();
    let color = $("#txtColor").val();
    
    if(!tittle){

        alert("Error - Complete the title")
        return;
    }



    let theTask = new Task(isImportant,tittle, dueDate, location, description, participants, color );

    $.ajax({

        type: "POST",
        url: "https://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(theTask),
        contentType: "application/json",


        success: function(response){

            console.log("Server says: ", response);
            let savedTask = JSON.parse(response);

            displayTask(saveTask);
            ClearForm();
        

        },

        error: function(details){

            console.log("Save Failed", details);
        }

    });

}

function ClearForm(){

    $("#txtTitle").val("");
    $("#txtdueDate").val("");
    $("#txtLocation").val("");
    $("#txtDes").val("");
    $("#txtPar").val("");
    $("#txtColor").val("");

}

function displayTask(task){

    let syntax = `

    <div class="task" style ="border: 2px solid ${task.color}">
    
        <div class="task-title">

            <h5 class = h5-title> Tittle: ${task.tittle}</h5>
            <p> Description: ${task.description}</p>
            <p> Participants: ${task.participants}</p>
    
        </div>

        <div class="task-middle">

            <h5 class="h5-title"> Location: ${task.location}</h5>
            <p> Date: ${task.dueDate}</p>
      

            
        </div> 
        
        
    </div>


    `;

    $(".task-container").append(syntax);
        
}

function deleteTask(){

    $.ajax({

        type: 'DELETE',
        url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Jadrukis",
        success: function(){

            $(".task-container").html("");
        }

    });
}


function testResquest(){

    $.ajax({

        url:"https://restclass.azurewebsites.net/api/test",
        type:"GET",

        success: function(response){

            console.log("Server says: ", response);

        },

        error: function(details){

            console.log("Req Failed", details);
        }

    });

}

function fetchTask(){

    $.ajax({

        type:"GET",
        url: "https://fsdiapi.azurewebsites.net/api/tasks",

        success: function(response){

            let allTasks = JSON.parse(response);

            for(let i=0; i< allTasks.length; i++)
            {

                let task = allTasks[i];
                 
                if(task.user === "Jadrukis"){

                    displayTask(task)

                }              
            }

        },

        error: function(details){

            console.log("Retrieve failed", details);
        }

    });

}


function init(){

    console.log("Calendar");

    fetchTask();


    $("#btnSave").click(saveTask);
    $("#btnDelete").click(deleteTask);
    $(".iImportant").click(toggleImportant);
    $("#btnToggleDetails").click(toggleDetails);

}

window.onload = init;
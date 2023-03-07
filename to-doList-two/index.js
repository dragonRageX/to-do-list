let form = document.querySelector("#form");
let input = document.querySelector("#input");
let msg = document.querySelector("#msg");
let posts = document.querySelector("#posts");
let tasksToDo = document.querySelector("#tasks-to-do");
let tasksDone = document.querySelector("#tasks-done");
let checkbox = document.querySelector(".checkbox");
let postButton = document.querySelector(".post-button");
let updateButton = document.querySelector(".update-button");

let readToDoPost;
let readDonePost;
function readPosts()
{
    fetch("https://inspectbackend.herokuapp.com/todo")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            tasksToDo.innerHTML = "";
            tasksDone.innerHTML = "";
            data.map(object => {
                if(object.status === "To Do" || object.status === "Doing")
                {
                    readToDoPost += `
                    <div class = "my-to-do-post">
                        <p>${object.work}</p>
                        <span class="options">
                            <i onClick="copyInfo(this, ${object._id}, ${object.work}, ${object.status})" class="fas fa-edit"></i>
                            <i onClick="deletePosts(this, ${object._id})" class="fas fa-trash-alt"></i>
                            <input onClick = "toDoToDone(this)" type="checkbox" name="checkbox" class = "checkbox" />
                        </span>
                    </div>
                    `;
                }
                else if(object.status === "Done")
                {
                    readDonePost += `
                    <div class = "my-done-post">
                        <p>${object.work}</p>
                        <span class="options">
                            <i onClick="copyInfo(this, ${object._id}, ${object.work}, ${object.status})" class="fas fa-edit"></i>
                            <i onClick="deletePosts(this, ${object._id})" class="fas fa-trash-alt"></i>
                        </span>
                    </div>
                    `;
                }
            })
            tasksToDo.innerHTML = readToDoPost;
            tasksDone.innerHTML = readDonePost;
        })
        .catch(err => console.error(err));
}
readPosts();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Button Clicked!");
    //if(something)
    /*{*/formValidation(/*createPosts()*/);    //WHENEVER WE SUBMIT OUR POST, WE WOULD INVOKE A FUNCTION THAT WOULD POST THE CONTENTS OF THAT PARTICULAR POST TO THE URL MENTIONED AND input.value = data.title; let id = 200 (GLOBAL VARIABLE) THEN IN THE FUNCTION WE WOULD INCREMENT THE id BY 1 EVERYTIME.
    //else
    //{formValidation(updatePosts())}
})

let id = 0;
let data;
function formValidation(/*dummyFunction()*/)
{
    if(input.value === "")
    {
        msg.innerHTML = "Posts cannot be blank!";
    }
    else
    {
        console.log("Submit Success");
        msg.innerHTML = "";
        id = id + 1;
        data = {
            _id: id,
            work: input.value,
            status: "To Do",
            date: "2022-08-14T20:08:29.168Z",
            priority: false,
            __v: 0
        };
        if(tab === -1)
        {
            editPosts();
            tab = 1;
        }
        else if(tab === 1)
        {
            createPosts();//dummyFunction()   // USE ASYNC CALLBACK FUNCTIONS (ADD FUNCTION AS A PARAMETER) TO TURN THIS INTO A SYNCHRONOUS FUNCTION AND HENCE THERE IS NO NEED TO CREATE A NEW BUTTON TO UPDATE POSTS.
        }
    }
}

function createPosts()
{
    fetch("https://inspectbackend.herokuapp.com/todo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("POST Request Successful!: ", data);
            readPosts();
            input.value = "";
        })
        .catch((error) => {
            console.error("Error:", error);
        })
}

function deletePosts(e, id)
{
    fetch("https://inspectbackend.herokuapp.com/todo/{id}", {
        method: "DELETE"
    })
        .then((response) => response.json())
        .then((result) => {
            // e.parentElement.parentElement.remove();
            console.log(id);
            console.log("Deletion Successful");
            console.log(result);
            readPosts();
        })
        .catch((error) => {
            console.error("Error:", error);
        })
}

let updateId;
let updateStatus;
let tab = 1;
function copyInfo(e, id, inputValue, status)
{
    input.value = inputValue;
    e.parentElement.parentElement.remove();
    tab = -1;
    updateId = id;
    updateStatus = status;
}
    // postButton.style.display = "none";
    // updateButton.style.display = "block";
    // updateButton.addEventListener("click", updatePost());
    // // let data = 
    // updatePost()
    // {
    //     console.log("Button Clicked!");
    //     if(input.value === "")
    //     {
    //         msg.innerHTML = "Posts cannot be blank!";
    //     }
    //     else
    //     {
    //             const data = {
    //             _id: id, 
    //             work: input.value, 
    //             status: status, 
    //             date:"2022-10-30T01:51:09.339Z", 
    //             priority:false, 
    //             __v:0
    //         }
function editPosts()
{
    const updatedData = {
        _id:updateId,
        work:input.value,
        status:updateStatus,
        date:"2022-10-30T01:51:09.339Z",
        priority:false,
        __v:0
    };
    fetch("https://inspectbackend.herokuapp.com/todo" + "/" + updateId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    })
        .then((response) => response.json())
        .then((updatedData) => {
            console.log("PUT Request Successful!: ", updatedData);
            readPosts();
        })
        .catch((error) => {
            console.error("Error:", error);
        })
        // }
    // }
}

function toDoToDone(e)   //THE CHECKBOX NEXT TO THE UPDATE AND DELETE ICONS IS BASICALLY TO CHANGE A 'TO-DO' OR 'DOING' TASK TO 'DONE' ON TICKING THE CHECKBOX.
{
    if(e.checked == true)
    {
        console.log("Checkbox checked");
    }
    else
    {
        console.log("Checkbox unchecked");
    }
}

let form = document.querySelector("#form");
let input = document.querySelector("#input");
let msg = document.querySelector("#msg");
let posts = document.querySelector("#posts");

//READ OR GET REQUEST USING fetch
let readPost;
let arrayOfObjects = [];
function readPosts()
{
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((data) => {
            posts.innerHTML = "";
            console.log(data);
            arrayOfObjects.push(data);
            data.map(object => {
                readPost += `
                <div class = "my-post">
                <p>${object.title}</p>
                <span class="options">
                    <i onClick="editPost(this)" class="fas fa-edit"></i>
                    <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
                </span>
                </div>
                `;
            })
            posts.innerHTML = readPost;
        })
        .catch(err => console.error(err));
}
readPosts();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Button Clicked!");

    formValidation();    //WHENEVER WE SUBMIT OUR POST, WE WOULD INVOKE A FUNCTION THAT WOULD POST THE CONTENTS OF THAT PARTICULAR POST TO THE URL MENTIONED AND input.value = data.title; let id = 200 (GLOBAL VARIABLE) THEN IN THE FUNCTION WE WOULD INCREMENT THE id BY 1 EVERYTIME.
})

function formValidation()
{
    if(input.value === "")
    {
        msg.innerHTML = "Posts cannot be blank!";
    }
    else
    {
        console.log("Submit Success");
        msg.innerHTML = "";
        postContent();
        // readPosts();   //IDEALLY WE SHOULD HAVE USED THIS PROCESS, BUT SINCE THIS API IS A DUMMY API WE CAN'T POST ONTO THE API. HENCE, WE MAKE USE OF THE createPost() FUNCTION TO ADD NEW POSTS ONTO THE SCREEN BUT IT DOES NOT SHOW UP ON THE ORIGINAL API.
    }
}

let data;
let id = 0;
function postContent()
{
    id = id + 1;
    data = {
        userId: id,
        id: arrayOfObjects.length,
        title: input.value,
        completed: false
    };
    // post.push(input.value.split());   //FOR MAKING ARRAY OF ARRAYS
    fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("POST Request Successful!: ", data);
            readPost += `
            <div class = "my-post">
            <p>${data.title}</p>
            <span class="options">
                <i onClick="editPost(this)" class="fas fa-edit"></i>
                <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
            </span>
            </div>
            `;
            posts.innerHTML = readPost;
            input.value = "";
            arrayOfObjects[0].push(data);
            // arrayOfObjects.map(object => object.id = arrayOfObjects.length);
            console.log(arrayOfObjects);
        })
        .catch((error) => {
            console.error("Error:", error);
        })
}

// let newPostIndex;
// function createPost()
// {
//     posts.innerHTML += `
//     <div class = "my-post">
//       <p>${post[post.length - 1]}</p>
//       <span class="options">
//         <i onClick="editPost(this)" class="fas fa-edit"></i>
//         <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
//       </span>
//     </div>
//     `;   // WE CAN ALSO USE post.at(-1) OR post.slice(-1)
//     //newPostIndex = post.length - 1;

//     input.value = "";   //SHOULDN'T THE POSTS AND THE DATA STAY AFTER REFRESHING (HERE, THE DATA AND THE POSTS VANISH AFTER REFRESHING!)?
// }

function deletePost(e)
{
    // post.splice(newPostIndex, 1);
    arrayOfObjects.splice(this, 1);
    e.parentElement.parentElement.remove();   //NOW TRY REMOVING THE ELEMENT/INFORMATION FROM THE posts ARRAY.
    console.log(arrayOfObjects);
}

function editPost(e)
{
    arrayOfObjects.splice(this, 1);
    console.log('Alternate PUT Request Successful: ' + arrayOfObjects[arrayOfObjects.length - 1]);
    input.value = e.parentElement.previousElementSibling.innerHTML;
    e.parentElement.parentElement.remove();
}

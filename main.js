//Trayendo el json al JS
fetch("db.json")
  .then((resp) => resp.json())
  .then((data) => {
    let postTemplate = "";
    //Ciclo para recorrer y   mostrar cada uno de los post que existen en el Json.
    data.forEach((post) => {
      postTemplate += `
        <div class='post'>
            <h1 class='post-titulo'>
                ${post.title}
            </h1>
            <div class='post-subtitulo'>
                ${post.subtitle}
            </div>
            <div class='post-texto'>
                ${post.text}
            </div>
            <div class='post-fecha'>
                Posted at: ${post.date}
            </div>
        </div>
    `;
    });
    document.getElementById("post").innerHTML = postTemplate; //imprimiendo la variable postTemplate
  });

function showPost(data) {
  let postTemplate;
  data.forEach((post) => {
    postTemplate += `
        <div class='post'>
            <h1 class='post-titulo'>
                ${post.title}
            </h1>
            <div class='post-subtitulo'>
                ${post.subtitle}
            </div>
            <div class='post-texto'>
                ${post.text}
            </div>
            <div class='post-fecha'>
                Posted at: ${post.date}
            </div>
        </div>
    `;
  });
  document.getElementById("post").innerHTML = postTemplate; //imprimiendo la variable postTemplate
}

document.getElementById("addPost").addEventListener("submit", addPost);

const output = document.getElementById("input-error");

function addPost(e) {
  e.preventDefault();

  let title = document.getElementById("title");
  let subtitle = document.getElementById("subtitle");
  let text = document.getElementById("text");

  if (title === "" || text === "") {
    output.innerText = "Please enter a Title and a Text to post";

    setTimeout(() => {
      output.style.display = "none";
    }, 3000);
    return;
  } else {
    console.log("Post enviado");

    fetch("db.json")
      .then((resp) => resp.json())
      .then((data) => {
        const newPost = {
          title: title.value,
          subtitle: subtitle.value,
          text: text.value,
          date: fecha(),
        };

        data = [...data, newPost];
        showPost(data)

      });
      
      // title.value = '';
      // subtitle.value ='';
      // text.value = '';
  }
}

function template(posts) {
  return `
      ${post(posts.title, posts.subtitle, posts.text, posts.date)}
  `;
}

const newPost = document.getElementById("app-post-btn");
newPost.innerText = "New post!";

newPost.addEventListener("click", showForm);

const form = document.getElementById("addPost");

function showForm() {
  if (form.style.display === "flex") {
    form.style.display = "none";
    newPost.innerText = "New post!";
  } else if (form.style.display != "flex") {
    form.style.display = "flex";
    newPost.innerText = "Cancel";
  }
}

const date = new Date();
const day = date.getDate().toString();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hours = date.getHours().toString();
const minutes = date.getUTCMinutes().toString();

function minuto() {
  if (minutes.length === 1) {
    return "0" + minutes;
  } else {
    return minutes;
  }
}

function fecha() {
  return day + "/" + month + "/" + year + "  -  " + hours + ":" + minuto();
}

document.getElementById("head-fecha").innerHTML += fecha();

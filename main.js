//Trayendo el json al JS
fetch('db.json')
  .then(resp => resp.json())
  .then(data => {
    let postTemplate = '';
    //Ciclo para recorrer cada uno de los post que existen en el Json.
    data.posts.forEach(post =>{ 
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
                ${post.date}
            </div>
        </div>
    `;
    })
    document.getElementById('post').innerHTML= postTemplate; //imprimiendo la variable postTemplate
  })


document.getElementById('posting').addEventListener
('click', addPost)

function addPost(e){
  e.preventDefault();

  let title = document.getElementById('title').value;
  let subtitle = document.getElementById('subtitle').value;
  let text = document.getElementById('text').value;

  fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title, subtitle: subtitle, text: text }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
    });
    
}


function template(posts){
  return `
      ${post(
        posts.title,
        posts.subtitle,
        posts.text,
        posts.date
      )}
  `
};

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
  return (day + "/" + month + "/" + year + "  -  " + hours + ":" + minuto());
}

document.getElementById('head-fecha').innerHTML += fecha();

document.getElementById('api').addEventListener
('click', getApi)

function  getApi(){
  fetch('db.json')
   .then(resp => resp.json())
   .then(data => console.log(data.posts))
}
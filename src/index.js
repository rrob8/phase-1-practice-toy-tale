let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


fetch("http://localhost:3000/toys")
.then((reponse) => reponse.json())
.then((data) => cardCreator(data))

function cardCreator(data) {
  console.log(data)
  data.forEach((toy) =>{
    const toyCollection = document.getElementById('toy-collection')
    const toyCard = document.createElement('div');
    toyCard.className = 'card'
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const p = document.createElement('p')
    p.id = `toy${toy.id}`
    const button = document.createElement('button')
    
    h2.textContent = toy.name
    toyCard.appendChild(h2);
    
    img.src = toy.image
    img.className = 'toy-avatar'
    toyCard.appendChild(img)
    
    p.textContent = toy.likes
    toyCard.appendChild(p)

    button.className ='like-btn'
    button.id = toy.id
    button.textContent = "Like ❤️"
    toyCard.appendChild(button)
    button.addEventListener("click",()=>{
      console.log('runs')
      console.log('This is toy.likes:', toy.likes)
       toy.likes = parseInt(toy.likes) + 1
      p.textContent = toy.likes
      console.log("After we have incremented:",toy.likes)
      fetch(`http://localhost:3000/toys/${toy.id}`, {
    method:"PATCH",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      'likes': toy.likes
    })
  })
    }  
    )

    toyCollection.appendChild(toyCard)
  })
}

const createToy = document.getElementsByClassName('add-toy-form')

// NEW TOY SUBMISSION EVENT POST

createToy[0].addEventListener('submit', (e)=>{
  e.preventDefault()
  console.log('i was submitted')
   const formGroup = document.getElementsByClassName('input-text')
   const toyName = formGroup[0]
  const toyPic = formGroup[1]


  const toyObject = {
    name: toyName.value,
    image: toyPic.value,
    likes: 0
  }
  fetch('http://localhost:3000/toys', {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(toyObject)

    })
  .then(response => response.json())
   .then(toy => cardCreator([toy]) )
    })

// Fetch request for PATCH
// function patchLikes (toy) {
//   let likeCounter = document.getElementById(`toy${toy.id}`)
//   console.log(`toy${toy.id}`)
//   console.log(likeCounter)
  
//   fetch(`http://localhost:3000/toys/${toy.id}`, {
//     method:"PATCH",
//     headers:{
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify({
//       'likes': ''
//     })
//   })
//   .then(response => response.json())
//   .then(newToy => {
    
    


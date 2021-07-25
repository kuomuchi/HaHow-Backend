const xhr = new XMLHttpRequest()
xhr.open('GET', '/heroes', true)
// xhr.setRequestHeader("","");

window.localStorage.removeItem("user")


const userData = {
    id:0,
    hero: undefined
}

xhr.onreadystatechange = function () {
  if(xhr.readyState == 4 && xhr.status == 200){
    let heroArray = "";
    heroArray = xhr.responseText;
    heroArray = JSON.parse(heroArray).heroes
    
    for(let num = 0; num < heroArray.length; num++){

        // create hero div
        let outElement = document.getElementById("hero_list")
        let newChild = document.createElement("div")
        newChild.classList.add("hero")

        newChild.addEventListener("click", () => {
            userData.hero = heroArray[num].name
            document.getElementsByClassName("select_hero")[0].textContent = "Your hero: " + heroArray[num].name
        })

        newChild.textContent = heroArray[num].name
        outElement.appendChild(newChild)

        // add hero image
        outElement = document.getElementsByClassName("hero")[num]
        newChild = document.createElement("img")
        newChild.src = heroArray[num].image
        outElement.appendChild(newChild)

    }

  }
    
}
xhr.send()

document.getElementById("start").addEventListener("click", () => { // click start

    if(userData.hero === undefined){
        alert("Pick a hero")
    }else{
        userData.id = Date.now()
        window.localStorage.setItem("user", JSON.stringify(userData))

        window.location.href = "/room.html"
        
    }
})
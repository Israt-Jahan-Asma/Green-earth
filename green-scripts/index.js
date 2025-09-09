

const loadContainer = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
}
const loadAllPlants = () => {
    manageSpinner(true)
    fetch('https://openapi.programming-hero.com/api/plants')
        .then(res => res.json())
        .then(data => {
             removeActive();
             const allBtn =document.getElementById('all-plants');
             if(allBtn) allBtn.classList.add('active')
            displayPlantCard(data.plants)
            
        })
}
const removeActive = ()=>{
    const plantButtons = document.querySelectorAll('.plant-btn')
    
    plantButtons.forEach(btn=>btn.classList.remove('active', 'bg-[#15803D]', 'text-white'))
    
}
const loadPlantCardContainer = (id) => {
 manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`button-category-${id}`)
            clickBtn.classList.add('active')
            
        displayPlantCard(data.plants)

           
        })
}
const manageSpinner=(status)=>{
if(status==true){
    document.getElementById('spinner').classList.remove('hidden')
    document.getElementById('plant-card-container').classList.add('hidden')
} else{
    document.getElementById('plant-card-container').classList.remove('hidden')
    document.getElementById('spinner').classList.add('hidden')
}
}

const loadPlantDetail= async (id)=>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    const res= await fetch(url)
    const details= await res.json()
    displayPlantDetails(details.plants);
    
}

const displayPlantDetails = (plant)=>{
console.log(plant);
const detailsBox = document.getElementById('details-container')
detailsBox.innerHTML = `

<div class="card bg-base-100 ">

  <figure>
    <img class="h-60 object-cover w-full rounded-md"
      src="${plant.image}" />
  </figure>
  <div class="card-body py-2 px-0">
   <h2 class="card-title"> ${plant.name} </h2>

    <p class="font-normal pt-2 text-[#1F2937]"> <b> Description:</b> ${plant.description} </p>
<a class="font-normal"> <b> Category: </b>${plant.category} </a>
 <div class="font-semibold ">  <b> Price: </b>${plant.price}</div>

  </div>
</div>

`
document.getElementById('plant_modal').showModal()
}
const displayPlantCard = (plants) => {
    const PlantCardContainer = document.getElementById('plant-card-container');
    PlantCardContainer.innerHTML=''

    plants.forEach(plant => {
        console.log(plant);

        const plantCard =document.createElement('div')
        plantCard.innerHTML= `
        <div class="card bg-base-100 w-82 shadow-sm p-4 rounded-lg">
  <figure>
    <img class="h-60 object-cover w-full rounded-md"
      src="${plant.image}" />
  </figure>
  <div class="card-body py-2 px-0">
    <h2 class="card-title"> ${plant.name} </h2>

    <p class="font-light text-[#1F2937]"> ${plant.description}</p>

    <div class="card-actions justify-between items-center">
      <a onclick="loadPlantDetail(${plant.id})" class="btn  bg-[#DCFCE7] border-0 shadow-none rounded-4xl text-[#15803D] font-normal">${plant.category} </a>
      <div class="font-semibold ">${plant.price}</div>
    </div>
    <a class="btn mt-2 bg-[#15803D] border-0 shadow-none rounded-4xl text-white font-normal">Plant a Tree</a>
  </div>
</div>
        
        `
        PlantCardContainer.append(plantCard)
    });
 manageSpinner(false)
}
const displayCategory = (categories) => {
    const plantContainer = document.getElementById('plant-container');
    plantContainer.innerHTML = ''
const allBtn = document.createElement('button')
    allBtn.id = 'all-plants'
    allBtn.className = 'p-2 w-full text-left my-2 rounded-md hover:bg-[#15803D] hover:text-white plant-btn'
    allBtn.textContent = 'All Plants'
    allBtn.onclick = () => loadAllPlants()
    plantContainer.append(allBtn)

    for (let category of categories) {

        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `

     <button id="button-category-${category.id}" onclick=loadPlantCardContainer('${category.id}') class="p-2  w-full text-left my-2 rounded-md hover:bg-[#15803D] hover:text-white plant-btn">${category.category_name} </button>
    
    `
        plantContainer.append(btnDiv)
    }

}

loadContainer()
loadAllPlants()
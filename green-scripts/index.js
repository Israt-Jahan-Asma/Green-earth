

const loadContainer = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
}
const loadPlantCardContainer = (id) => {

    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
        displayPlantCard(data.plants)

        })
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
      <a class="btn bg-[#DCFCE7] border-0 shadow-none rounded-4xl text-[#15803D] font-normal">${plant.category} </a>
      <div class="font-semibold ">${plant.price}</div>
    </div>
    <a class="btn mt-2 bg-[#15803D] border-0 shadow-none rounded-4xl text-white font-normal">Plant a Tree</a>
  </div>
</div>
        
        `
        PlantCardContainer.append(plantCard)
    });

}
const displayCategory = (categories) => {
    const plantContainer = document.getElementById('plant-container');
    plantContainer.innerHTML = ''

    for (let category of categories) {

        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
     <button onclick=loadPlantCardContainer('${category.id}') class="p-2 border border-red-600 w-full text-left my-2 rounded-md hover:bg-[#15803D] hover:text-white">${category.category_name} </button>
    
    `
        plantContainer.append(btnDiv)
    }

}
loadContainer()
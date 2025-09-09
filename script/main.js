const loadPlantsCard = () => {

    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((json) => {
            displayPlantsCard(json.plants);
            addBtnListener();
        })

}

const displayPlantsCard = (plants) => {

    const plantsContainer = document.getElementById("plants-container");
    plantsContainer.innerHTML = "";
    for (const plant of plants) {
        const cart = document.createElement("div");
        cart.innerHTML = `<div class="card p-3 h-[380px] bg-white">
                        <img class="h-[180px] w-[320px] rounded-lg" src="${plant.image}" alt="">
                        <h2 onclick="loadModal(${plant.id})" class="text-lg font-semibold cursor-pointer">${plant.name}</h2>
                        <p class="text-xs">${plant.description}</p>
                        <div class="flex justify-between items-center py-3">
                            <p class="text-[#15803D] bg-[#DCFCE7] font-bold rounded-lg px-2 ">${plant.category}</p>
                            <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}</p>
                        </div>
                        <button class="btn border-none bg-[#15803D] text-white  rounded-xl add-btn">Add To Cart</button>
                    </div>`
        plantsContainer.append(cart)
    }
    manageSpinner(false);
}
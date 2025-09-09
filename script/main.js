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
const removeActive = () => {
    const categoryBtn = document.querySelectorAll(".active-button");
    for (const btn of categoryBtn) {
        btn.classList.remove("active")
    }
}

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((json) => displayCategories(json.categories))
}

const loadCategoriesByPlant = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {

            removeActive();
            const clickBtn = document.getElementById(`click-button-${id}`);
            clickBtn.classList.add('active')
            displayCategoriesByPlant(data.plants);
            addBtnListener();
        });
}

const displayCategoriesByPlant = (plants) => {
    const categoryContainer = document.getElementById("plants-container");
    categoryContainer.innerHTML = "";

    for (const plant of plants) {
        const cart = document.createElement("div");
        cart.innerHTML = `<div class="card p-3 h-[380px] bg-white">
                        <img class="h-[180px] w-[320px]  rounded-lg" src="${plant.image}" alt="">
                        <h2 onclick="loadModal(${plant.id})" class="text-lg font-semibold cursor-pointer">${plant.name}</h2>
                        <p class="text-xs">${plant.description}</p>
                        <div class="flex justify-between items-center py-3">
                            <p class="text-[#15803D] bg-[#DCFCE7] font-bold rounded-lg px-2 ">${plant.category}</p>
                            <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}</p>
                        </div>
                        <button class="btn border-none bg-[#15803D] text-white  rounded-xl add-btn">Add To Cart</button>
                    </div>`
        categoryContainer.append(cart)
    }
    manageSpinner(false);
}


const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";
    for (const category of categories) {
        const divBtn = document.createElement("div");
        divBtn.innerHTML = `<button id="click-button-${category.id}" onclick = "loadCategoriesByPlant('${category.id}')" 
        class="btn btn-ghost hover:bg-[#15803D] w-full hover:text-white justify-start active-button">${category.category_name}</button>`
        categoryContainer.append(divBtn)
    }
}
loadCategories()
loadPlantsCard()



let cartItems = {};
let totalPrice = 0;

const addBtnListener = () => {
    const addBtns = document.getElementsByClassName("add-btn");

    for (const btn of addBtns) {
        btn.addEventListener("click", function () {


            const cardTitle = btn.parentNode.childNodes[3].innerText;
            console.log(cardTitle);

            const cardPrice = parseInt(btn.parentNode.childNodes[7].childNodes[3].innerText);
            console.log(cardPrice)
            alert(`added to card ${cardTitle}`)

            // for total price
            const totalPrice = parseInt(document.getElementById("total-price").innerText);
            console.log(totalPrice)
            const currentPrice = cardPrice + totalPrice;
            document.getElementById("total-price").innerText = currentPrice;




            const cartContainer = document.getElementById("cart-container");

            const cartItem = document.createElement("div");
            cartItem.innerHTML = `<div class="cart flex justify-between items-center p-3 my-3 bg-[#DCFCE7] rounded-lg">
                            <div>
                                <h1 class="font-semibold text-lg pb-1">${cardTitle}</h1>
                                <p class="text-sm font-medium"><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${cardPrice} </span>
                                <i class="fa-solid fa-xmark"></i> <span id = "total-quantity">1</span> </p>
                            </div>
                            <div>
                                <p class="remove-btn cursor-pointer">❌</p>
                            </div>
                        </div>
                       `;
            cartContainer.append(cartItem);
            cartItem.querySelector(".remove-btn").addEventListener("click", function () {
                cartItem.remove();
            });

            cartContainer.append(cartItem);


        });

    }
};


const loadModal = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    console.log(url)
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayModal(data.plants));
};

const displayModal = (plant) => {
    console.log(plant)
    const modalDetailsBox = document.getElementById("details-container");
    modalDetailsBox.innerHTML = `<div class="card p-3 w-[350px]  bg-white">
                        <img class="h-[180px] w-[320px]  rounded-lg" src="${plant.image}" alt="">
                        <h2 onclick="loadModal(${plant.id})" class="text-lg font-semibold cursor-pointer">${plant.name}</h2>
                        <p class="text-xs">${plant.description}</p>
                        <div class="flex justify-between items-center py-3 ">
                            <p class="text-[#15803D] bg-[#DCFCE7] font-bold rounded-lg px-2 ">${plant.category}</p>
                            <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}</p>
                        </div>
                        
                    </div>`
    document.getElementById("plants_modal").showModal();
};


const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("plants-container").classList.add("hidden");
    }
    else {
        document.getElementById("plants-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}
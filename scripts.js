const list = document.querySelector('ul')
const btnBurguerMenu = document.querySelector('.btn-burguer')
const btnFoodMenu = document.querySelector('.btn-food')
const btnVeganMenu = document.querySelector('.btn-vegan')
const btnBuying = document.querySelector('.btn-buying')

let itemsState = {};

let allProducts = [...menuBurguer, ...menuFood];

let currentProducts = [];

function formatCurrency(value) {
    const newValue = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return newValue
}

function menuOption(productsArray, menuType) {

    let myLi = ''

    productsArray.forEach((product, index) => {
        myLi += `
                <li>
                    <img src=${product.src}>
                    <p class="item-name">${product.name}</p>
                    <p class="item-price">${formatCurrency(product.price)}</p>
                    <button class="btn-add" onclick="addBuy()" value="+" id="btn-${menuType}-${index}">+</button>
                </li>
            `

    })

    list.innerHTML = myLi

    addEventListenersToButtons();

}

function veganOption() {

    const burguerVegan = menuBurguer.filter((product) => product.vegan)
    const foodVegan = menuFood.filter((product) => product.vegan)

    const menuVegan = burguerVegan.concat(foodVegan)

    menuOption(menuVegan)
}

function coverBurguer() {
    const coverBurguerBack = document.getElementById('cover')

    coverBurguerBack.src = './img/capa1.jpg'
}

function coverFood() {
    const coverFoodBack = document.getElementById('cover')

    coverFoodBack.src = './img/capaFood.jpg'
}

function coverVegan() {
    const coverVenganBack = document.getElementById('cover')

    coverVenganBack.src = './img/capaVegan.jpg'
}

function addEventListenersToButtons() {

    document.querySelectorAll('.btn-add').forEach((button) => {
        button.addEventListener('click', function () {
            addBuy(this.id)
        })
    })
}

function menuCheckout(productsArray) {

    let addedItems = currentProducts.filter((_, index) => itemsState[`btn-${index}`] && itemsState[`btn-${index}`].added);
    
    let myLi = ''

    addedItems.forEach((product, index) => {
        myLi += `
                <li>
                    <img src=${product.src}>
                    <p class="item-name">${product.name}</p>
                    <p class="item-price">${formatCurrency(product.price)}</p>
                    <button class="btn-add" onclick="addBuy()" value="-" id="btn-${index}">-</button>
                </li>
            `

    })

    list.innerHTML = myLi;
}



function addBuy(buttonId) {

    console.log('Item Adicionado', buttonId)

    let button = document.getElementById(buttonId);
    let index = buttonId.split('-')[1];

    if (button.innerHTML === '+') {
        button.innerHTML = '-';

        itemsState[buttonId] = { added: true, index: parseInt(index) };
    } else if (button.innerHTML === '-') {
        button.innerHTML = '+';

        if (itemsState[buttonId]) {
            itemsState[buttonId].added = false;
        }
    }
}






btnBurguerMenu.addEventListener('click', () => {
    currentProducts = menuBurguer;
    menuOption(menuBurguer, 'burguer');
});

btnFoodMenu.addEventListener('click', () => {
    currentProducts = menuFood;
    menuOption(menuFood, 'food');
});

btnVeganMenu.addEventListener('click', () => {
    const burguerVegan = menuBurguer.filter((product) => product.vegan);
    const foodVegan = menuFood.filter((product) => product.vegan);
    currentProducts = [...burguerVegan, ...foodVegan];
    menuOption(currentProducts, 'vegan');
    coverVegan();
});

btnBuying.addEventListener('click', menuCheckout)


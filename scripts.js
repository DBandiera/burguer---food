const list = document.querySelector('ul')
const btnBurguerMenu = document.querySelector('.btn-burguer')
const btnFoodMenu = document.querySelector('.btn-food')
const btnVeganMenu = document.querySelector('.btn-vegan')
const btnBuyning = document.querySelector('.btn-buying')
const btnAdd = document.querySelector('.btn-add')

function formatCurrency(value) {
    const newValue = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return newValue
}

function menuOption(productsArray) {

    let myLi = ''

    productsArray.forEach((product) => {
        myLi += `
                <li>
                    <img src=${product.src}>
                    <p class="item-name">${product.name}</p>
                    <p class="item-price">${formatCurrency(product.price)}</p>
                    <button class="btn-add" onclick="addBuy()" value="+">+</button>
                </li>
            `

    })

    list.innerHTML = myLi

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

function addBuy() {
    console.log('Item Adicionado')
    const pressBtnAdd = document.querySelector('.btn-add')

    if (pressBtnAdd.value === '+') {

        pressBtnAdd.innerHTML = '-'

    }
}






btnBurguerMenu.addEventListener('click', () => menuOption(menuBurguer))
btnFoodMenu.addEventListener('click', () => menuOption(menuFood))
btnVeganMenu.addEventListener('click', veganOption, coverVegan)
btnBuyning.addEventListener('click', () => console.log('carrinho'))























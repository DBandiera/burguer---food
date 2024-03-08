const list = document.querySelector('ul');
const btnBurguerMenu = document.querySelector('.btn-burguer');
const btnFoodMenu = document.querySelector('.btn-food');
const btnVeganMenu = document.querySelector('.btn-vegan');
const btnBuying = document.querySelector('.btn-buying');

let itemsState = {};
let currentProducts = [];

function formatCurrency(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function addEventListenersToButtons() {
    document.querySelectorAll('.btn-add').forEach((button) => {
        button.addEventListener('click', function () {
            addBuy(this.id);
        });
    });
}

function addBuy(buttonId) {
    let button = document.getElementById(buttonId);
    let action = button.getAttribute('value');
    let [menuType, index] = buttonId.split('-');

    if (action === '+') {
        button.innerHTML = '-';
        button.setAttribute('value', '-');
        let itemToAdd = currentProducts.find((_, idx) => `${menuType}-${idx}` === buttonId);
        // itemsState[buttonId] = true;
        if (itemToAdd) {
            itemsState[buttonId] = { ...itemToAdd, menuType: menuType, added: true };
        }
    } else if (action === '-') {
        button.innerHTML = '+';
        button.setAttribute('value', '+');
        // delete itemsState[buttonId];

        if (itemsState[buttonId]) {
            itemsState[buttonId].added = false;
        }
    }
}

function menuOption(productsArray, menuType) {
    currentProducts = productsArray;

    let myLi = '';

    productsArray.forEach((product, index) => {
        myLi += `
            <li>
                <img src="${product.src}">
                <p class="item-name">${product.name}</p>
                <p class="item-price">${formatCurrency(product.price)}</p>
                <button class="btn-add" value="+" id="${menuType}-${index}">+</button>
            </li>
        `;
    });

    list.innerHTML = myLi;
    addEventListenersToButtons();
}

function menuCheckout() {
    list.innerHTML = '';
    let addedItems = Object.values(itemsState).filter(item => item.added);

    if (addedItems.length === 0) {
        list.innerHTML = '<li class="msg-error">Nenhum item adicionado ao carrinho</li>';
        return;
    }

    let itemsByMenu = addedItems.reduce((acc, item) => {
        if (!acc[item.menuType]) {
            acc[item.menuType] = [];
        }
        acc[item.menuType].push(item);
        return acc;
    }, {});

    for (let menuType in itemsByMenu) {
        let menuItems = itemsByMenu[menuType];
        // let menuHeader = `<h3>Items from ${menuType}</h3>`;
        let myLi = menuItems.map(item => `
            <li>
                <img src="${item.src}">
                <p class="item-name">${item.name}</p>
                <p class="item-price">${formatCurrency(item.price)}</p>
            </li>
        `).join('');

        list.innerHTML += myLi;
    }

    list.innerHTML += `<button class="btn-send-order">Enviar Pedido</button>`

    document.querySelector('.btn-send-order').addEventListener('click', sendOrder);

}

function sendOrder() {
    alert('Pedido enviado com sucesso')
}

btnBurguerMenu.addEventListener('click', () => menuOption(menuBurguer, 'burguer'));
btnFoodMenu.addEventListener('click', () => menuOption(menuFood, 'food'));
btnVeganMenu.addEventListener('click', () => {
    const burguerVegan = menuBurguer.filter(product => product.vegan);
    const foodVegan = menuFood.filter(product => product.vegan);
    const menuVegan = [...burguerVegan, ...foodVegan];
    menuOption(menuVegan, 'vegan');
});
btnBuying.addEventListener('click', menuCheckout);
let cardBody = document.getElementById('cards-body')
let totalPriceP = document.getElementById('total-price')

function showCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cardBody.innerHTML = ""

    let itemsTotalprice = 0;

    cart.forEach(item => {
        const itemTotalPrice = item.product_price * item.quantity;
        itemsTotalprice += itemTotalPrice

        cardBody.innerHTML += `
            <hr>
            <div class="card-item" data-id="${item.id}">
                <div class="card-img-descrpition">
                    <img src="${item.url}" alt="${item.product_name}" />
                    <div class="card-description">
                        <p class="card-name">${item.product_name}</p>
                        <div class="card-about">
                            <p class="card-info">${item.product_description}</p>
                            <p class="card-price">Цена за 1 шт: ${item.product_price} руб.</p>
                            <p class="item-total-price" data-id="${item.id}">Тотал цена: ${itemTotalPrice} руб.</p>
                        </div>
                        <div class="card-favorite">
                            <button>В избранное</button>
                            <button class="delete-btn" data-id="${item.id}">Удалить</button>
                        </div>
                    </div>
                </div>
                <div class="card-qtyBtns">
                    <button class="plus-btn" data-id="${item.id}">+</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="minus-btn" data-id="${item.id}">-</button>
                </div>
            </div>
        `;
    });

    totalPriceP.textContent = `Общая сумма: ${itemsTotalprice} руб.`;

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            removeFromCart(productId);
            showCartItems();
        });
    });

    document.querySelectorAll('.plus-btn').forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute('data-id');
            updateQuantity(productId, 1);
            showCartItems();
        });
    });

    document.querySelectorAll('.minus-btn').forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute('data-id');
            updateQuantity(productId, -1);
            showCartItems();
        });
    });
}

function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);

    let newQuantity = cart[itemIndex].quantity + change;

    if (newQuantity > 0) {
        cart[itemIndex].quantity = newQuantity;
    } else {
        removeFromCart(productId);
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}

showCartItems();





document.getElementById('form').addEventListener('submit', (ev) => {
    ev.preventDefault();
    let formData = new FormData(ev.target)
    let formValues = [...formData];
    let customerInfo = {};
    formValues.forEach((item) => {
        customerInfo[item[0]] = item[1];
    });

    let obj = JSON.parse(localStorage.getItem('cart'));
    let customerName = customerInfo.customerName;

    const requestBody = JSON.stringify({
        customerName,
        obj
    });

    fetch("http://localhost:5000/add-orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: requestBody
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
});






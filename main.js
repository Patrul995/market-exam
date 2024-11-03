let list = document.getElementById('main-block');

function showList() {
    fetch("http://localhost:5000/goods")
        .then(res => res.json())
        .then(data => {
            list.innerHTML = "";

            const selectElement = document.querySelector("select");
            const selectedValue = selectElement.value;

            if (selectedValue === "desc") {
                data.sort((a, b) => b.product_price - a.product_price);
            } else if (selectedValue === "asc") {
                data.sort((a, b) => a.product_price - b.product_price);
            }

            data.forEach(item => {
                list.innerHTML += `
                    <div class="container">
                        <div class="container-img">
                            <div class="container-img-icons">
                                <i class="material-symbols-outlined" data-product='${JSON.stringify(item)}'>shopping_bag</i>
                                <i class="material-symbols-outlined">favorite</i>
                            </div>
                            <img src="${item.url}"/>
                        </div>
                        <div class="container-name">${item.product_name}</div>
                        <div class="container-info">
                            ${item.product_description}
                        </div>
                        <div class="container-price">${item.product_price} руб.</div>
                    </div>
                `;
            });

            document.querySelectorAll('.container-img-icons .material-symbols-outlined').forEach((item) => {
                item.addEventListener('click', () => {
                    const product = JSON.parse(item.getAttribute('data-product'));
                    addToCart(product);
                });
            });
        })
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

showList();






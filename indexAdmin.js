let listAdmin = document.getElementById("all-list")

function showListAdmin(data) {
    data.forEach((item) => {
        const customerDiv = document.createElement('div');
        customerDiv.classList.add('customer-block');

        customerDiv.innerHTML += `
        <hr>
        <div>
         <button>Delete</button>
         <button>Change</button>
         </div>
            <p><strong>Имя покупателя: </strong> ${item.customerName}</p>   
        `;

        let totalPrice = 0;

        const parsedObj = JSON.parse(item.obj);

        parsedObj.forEach(product => {
            customerDiv.innerHTML += `
                <div class="product-details">
                    <p>Товар: ${product.product_name}.</p>
                    <p>Цена товара: ${product.product_price} руб.</p>
                    <p>Количество: ${product.quantity}.</p>
                </div>
            `;

            totalPrice += product.product_price * product.quantity;
        });

        const totalPriceP = document.createElement('p')
        totalPriceP.innerHTML += `Общая цена для <strong>${item.customerName}</strong>: ${totalPrice}`

        listAdmin.appendChild(customerDiv);
        listAdmin.appendChild(totalPriceP);
    });
}

function getOrders() {
    fetch("http://localhost:5000/orders", {
        method: "GET",
    })
        .then((res) => res.json())
        .then((data) => {
            showListAdmin(data)
            console.log(data)
        });
}

getOrders() 
let purchaseList = JSON.parse(window.localStorage.getItem("cart"));

let table = document.querySelector("tbody");
let totalRow = document.querySelector(".totalRow");

function fillPurchaseList() {

    // first we clean the table
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    // then we fill with info
    for (const item of purchaseList) {
        let tr = document.createElement('tr');
        tr.innerHTML = `<tr><td class="remove">X</td><td><img src="${item.img}" class="thumbnail"></td><td class="cart-item-name">${item.name}</td><td>1</td><td>${item.price}</td></tr>`;
        // table.insertBefore(tr,totalRow);
        table.appendChild(tr);
    }
    // calculate purchase total
    let purchaseTotal = [...purchaseList].reduce(function (sum, item) {
        return sum + parseFloat(item.price);
    }, 0);

    // //updating purchase total
    let trTotal = document.createElement("tr");
    trTotal.innerHTML = `<tr class="totalRow"><td></td><td></td><td></td><td>Total</td><td class="totalPurchase">$${purchaseTotal}</td></tr>`;
    table.appendChild(trTotal);

    // document.querySelector(".totalPurchase").textContent = `$${purchaseTotal}`;

    //updating local storage with product list
    window.localStorage.setItem("cart", JSON.stringify(purchaseList));
};
fillPurchaseList();

function removeItem() {
    [...document.querySelectorAll(".remove")].forEach(function (remove) {
        remove.addEventListener("click", function () {
            let itemName = this.parentElement.querySelector(".cart-item-name").textContent; //get name of the product clicked;
            // console.log(itemName);
            purchaseList.forEach(function (item) {
                if (item.name == itemName) {
                    // console.log(item.name);
                    purchaseList.splice(purchaseList.indexOf(item), 1);
                }

            });
            //update summary table data
            fillPurchaseList();

            //re run listener
            removeItem();
        });
    });

}
removeItem();
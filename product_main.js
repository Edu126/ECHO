let itemQuantity = document.querySelector(".itemQuantity");

if(window.localStorage.getItem("cart").length > 0){
    itemQuantity.textContent = JSON.parse(window.localStorage.getItem("cart")).length;
}
else itemQuantity.textContent = 0;





// Define json path, make request, wait for response and parse json info
async function getItems() {

    const requestURL = 'https://raw.githubusercontent.com/Edu126/art-gallery/main/products.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    let items = await response.json();
    // console.log(items);

    // companies = companies.companies;

    // for (let company of companies){
    //     console.table(company);
    // }

    populateItems(items.products);
    await addCart();

}
getItems();




function populateItems(items) {
    let productCatalog = document.querySelector(".products-catalog");
    let addBtn = `<button class="button-hover-addcart button"><span>Add to cart +</span><i class="fa fa-shopping-cart"></i></button>`;

    for (let item of items) {



        let itemContainer = document.createElement("div");
        const picElement = document.createElement("img");
        const itemName = document.createElement("p");
        const itemAuthor = document.createElement("p");
        const itemPrice = document.createElement("p");



        picElement.src = item.img_url;  
        itemName.textContent = item.name;
        itemName.classList.add("name");

        itemAuthor.textContent = item.author;
        itemName.classList.add("author");

        itemPrice.textContent = `$${item.price}`;
        itemPrice.classList.add("price");
        itemPrice.setAttribute("data-price",item.price);

        itemContainer.classList.add("product-card");

        //append details to item container
        itemContainer.append(picElement,itemName,itemAuthor,itemPrice);
      
        itemContainer.innerHTML += addBtn;
      

        // append final div to page Container

        productCatalog.appendChild(itemContainer);
    }


    console.log("hi");
}


//create empty array to store results
let purchaseArray = [];

// class to create new item objects
class purchaseList {
    constructor(name,price,img){
        this.name = name;
        this.price = price;
        this.img = img;
    }
}


function addCart() {[...document.querySelectorAll(".button-hover-addcart")].forEach(function(add){
    add.addEventListener("click",function(){

        //get name and price
        let productName = add.parentElement.querySelector(".name").textContent; // product name
        let productPrice = add.parentElement.querySelector(".price").dataset.price; // product price
        let img = add.parentElement.querySelector("img").getAttribute("src");  // product image

        //create a new element with the data
        let product = new purchaseList(productName,productPrice,img);

        //adding the new element to the purchase array
        purchaseArray.push(product);

        //updating local storage with product list
        window.localStorage.setItem("cart",JSON.stringify(purchaseArray));

        // console.log(product);
        let itemQuantity = purchaseArray.length;
        document.querySelector(".itemQuantity").textContent = `${itemQuantity}`;
        
    });
});}
addCart();






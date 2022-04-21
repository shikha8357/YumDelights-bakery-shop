let carts = document.querySelectorAll('.add-cart');
let product = [];


async function getProduct() {
    const response = await axios.get('http://localhost:5000/product');
    console.log(response.data);
    product = response.data.product;
        populateProduct();
}
getProduct();



function populateProduct() {
    const container = document.querySelector('.container')
    const productHtml = product.map((product, i) => {
        return (
            `
     <div class="image">
        <img src="${product.image}" alt="" id="">
        <h3>${product.name}</h3>
        <h3>${product.price}</h3>
        <a class="add-cart ${i + 1}" href="#">Add To Cart</a>
    </div>
     `
        )

    })
    if (container) {
        container.innerHTML += productHtml.toString();
        addCartAction();
    }
}

// let product = [
//     {
//         name: "vanilla cake",
//         flavour: "vanilla",
//         price: 250,
//         incart: 0
//     },
//     {
//         name: "blackforest cake",
//         flavour: "blackforest",
//         price: 350,
//         incart: 0
//     },
//     {
//         name: "strawberry cake",
//         flavour: "strawberry",
//         price: 450,
//         incart: 0
//     },
//     {
//         name: "Chocolate Muffins",
//         flavour: "Chocolate-Muffins",
//         price: 550,
//         incart: 0
//     },
//     {
//         name: "Sprinkle-Cherry-strawberry cupcake",
//         flavour: "Sprinkle-Cherry-strawberry",
//         price: 650,
//         incart: 0
//     },
//     {
//         name: "Easy Little Pandas cupcake",
//         flavour: "Easy-Little-Pandas",
//         price: 750,
//         incart: 0
//     },
//     {
//         name: "Cheese-Nut cake",
//         flavour: "Cheese-Nut",
//         price: 850,
//         incart: 0
//     },
//     {
//         name: "Chocolate-Bourborn-Caramel cupcake",
//         flavour: "Chocolate-Bourborn-Caramel",
//         price: 950,
//         incart: 0
//     },
//     {
//         name: "fruit cake",
//         flavour: "fruite",
//         price: 1050,
//         incart: 0
//     }];

function addCartAction() {
    const hoverProduct = document.getElementsByClassName('image');
    let carts = document.querySelectorAll('.add-cart');

    for (let i = 0; i < hoverProduct.length; i++) {
        hoverProduct[i].addEventListener('mouseover', () => {
            console.log("hovering-products");
            carts[i].classList.add('showAddCart');
            console.log("add to cart is working");
        })

        hoverProduct[i].addEventListener('mouseout', () => {
            console.log("hovering-products");
            carts[i].classList.remove('showAddCart');

        })
    }

    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
            cartNumber(product[i]);
            totalCost(product[i]);
        })

    }

}
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumber(product[i]);
        totalCost(product[i]);
        // manageQuantity(product[i]);
    })

}

function onLoadCartnumber() {
    let productnumber = localStorage.getItem('cartNumber')
    if (productnumber) {
        document.querySelector('.nav-link1 span').textContent = productnumber;
    }

}

function cartNumber(product) {

    let productnumber = localStorage.getItem("cartNumber");
    productnumber = parseInt(productnumber);
    if (productnumber) {
        localStorage.setItem("cartNumber", productnumber + 1);
        document.querySelector('.nav-link1 span').textContent = productnumber + 1;
    }
    else {
        localStorage.setItem("cartNumber", 1);
        document.querySelector('.nav-link1 span').textContent = 1;
    }
    setItem(product);
}

function setItem(product) {
    let cartItem = localStorage.getItem("productInCart");
    cartItem = JSON.parse(cartItem);


    if (cartItem != null) {
        if (cartItem[product.flavour] == undefined) {
            cartItem = {
                ...cartItem,
                [product.flavour]: product
            }
        }
        cartItem[product.flavour].incart += 1;


    }
    else {
        product.incart = 1;
        cartItem = {
            [product.flavour]: product
        }
    }

    localStorage.setItem("productInCart", JSON.stringify
        (cartItem));
}



function totalCost(product) {

    let cartCost = localStorage.getItem("totalCost")
    // console.log("my cartCost is", cartCost);
    // console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost +
            product.price);
    }
    else {
        localStorage.setItem("totalCost", product.price);
    }
    // manageQuantity();
}

function displayCart() {
    let cartItem = localStorage.getItem("productInCart");
    cartItem = JSON.parse(cartItem);
    let productContainer = document.querySelector(".product");
    let cartCost = localStorage.getItem("totalCost")

    console.log(cartItem);
    if (cartItem && productContainer) {
        // console.log("running");}

        productContainer.innerHTML = " ";
        Object.values(cartItem).map(item => {
            productContainer.innerHTML += `
 <div class="product">

  <span  class="span-style">${item.name}</span>
 
  
  <img src="./images/${item.flavour}.PNG">

  
  </div>

    <div class="price1">&#8377;${item.price},00 
    
    <span>${item.incart}</span>
    

    </div>

 

   <div class="totalprice">
    <span>&#8377;${item.incart * item.price},00</span>
    </div> `;
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Basket Total</h4>
            <h4 class="basketTotal">&#8377;${cartCost},00</h4></div>
         `
    }
}


// let btnMinus=document.querySelector('#minus');
// let btnAdd=document.querySelector('#add');
// btnMinus.addEventListener('click',()=>{
//     productInCart.incart=parseInt(productInCart.incart)+1;
// })

function manageQuantity() {
//     let btnMinus=document.querySelector('#minus');
// let btnAdd=document.querySelector('#add');
// btnMinus.addEventListener('onclick',()=>{
//     let cartItems = localStorage.getItem('productInCart');
//     cartItem = JSON.parse(cartItem);

//     productInCart.incart=parseInt(productInCart.incart)-1;
// })
    let decreaseButton = document.querySelectorALL('.decrease');
    let increaseButton = document.querySelectorAll('.increase');
    let cartItems = localStorage.getItem('productInCart');
    let currentQuantity = 0;
    let currentProduct="";
    // let cartItem = string;
    cartItem = JSON.parse(cartItem);
    console.log(cartItem);

    for (let i = 0; i < decreaseButton; i++) {
        decreaseButton[i].addEventListener('click', () => {
            currentQuantity = decreaseButton[i].parentElement.querySelector('span').textContent = productnumber;
            console.log(currentQuantity);
            currentProduct = decreaseButton[i].parentElement.previousElementSibling.previousSibling;
            console.log(currentProduct);

            if (cartItem[currentProduct].incart > 1) {
                cartItem[currentProduct].incart -= 1;
                cartNumber(cartItem[currentProduct], "decrease");
                totalCost(cartItem[currentProduct], "decrease");
                localStorage.setItem('productInCart', JSON.stringify(cartItem));
                displayCart();
            }

        });
    }

    for(let i=0;i<increaseButton.length;i++){
        increaseButton[i].addEventListener('click',()=>{
            console.log("Increase button");
            currentQuantity=increaseButton[i].parentElement.querySelector('span').textContent=incart+1;
            console.log(currentQuantity);

            currentProduct=increaseButton[i].parentElement.previousElementSibling.previous;
            console.log(currentProduct);

            cartItem[currentProduct].incart+=1;
            cartNumber(cartItem[currentProduct]);
            totalCost(cartItem[currentProduct]);
            localStorage.setItem('productInCart',JSON.stringify(cartItem));
            displayCart();

        })
    }    
}
onLoadCartnumber();
displayCart();

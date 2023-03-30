let cartIcon = document.querySelector("#cart_icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//open cart
cartIcon.onclick = () =>{
    cart.classList.add("active")   
};

//close cart
closeCart.onclick = () =>{
    cart.classList.remove("active")
};

//cart Working JS
if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
    
}


//Making Function
function ready(){ 
    
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i=0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click',removeCartItem)
        
    }
    //Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i=0; i < quantityInputs.length; i++){
    var input = quantityInputs[i]     
    input.addEventListener('change',quantityChanged)
    }

    //Add to Cart
    var addCart = document.getElementsByClassName("add-cart")
    for (var i=0; i < addCart.length; i++){
        var button=addCart[i]
        button.addEventListener('click', addCartClicked)
    }

    //Buy Button Work
    document
    .getElementsByClassName('btn-buy')[0]
    .addEventListener("click",buyButtonClicked)

    

}





//Buy BUtton
function buyButtonClicked(){
    var fullname=document.getElementById("fullname").value;
    var username=document.getElementById("usrname").value;
    var phone_num=document.getElementById("ph").value;


    if(fullname =='' || username=='' || phone_num==''){
        alert("Pls enter the form to buy the product")
        return false;  
    }

    else{
        alert('Your Order is placed')
        var cartContent = document.getElementsByClassName('cart_content')[0]
        while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
        invoice();
        }
        

    updateTotal()
        
    }


function invoice(){
    document.getElementById("invoice_full").innerHTML = "Name: " + document.getElementById("fullname").value; 
    document.getElementById("invoice_user").innerHTML = "Username: " + document.getElementById("usrname").value; 
    document.getElementById("invoice_phone").innerHTML = "Phone: " + document.getElementById("ph").value; 
}

        

    
    
    
    


    
}

//Remove items form cart
function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    updateTotal()
}

//Qunatity Chnages
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
        
    }
    updateTotal()
    
}
//Add To cart
function addCartClicked(event){
    
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('product-title')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('product_img')[0].src
    alert(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateTotal()
}
function addItemToCart(title, price, imageSrc){
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart_b')
    var cartItems = document.getElementsByClassName("cart_content")[0]
    var cartItemsNames = cartItems.getElementsByClassName('product_c')
    
    for (var i=0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
        alert("You have already add this item to cart")
        return
            }
        
        
    }
    var cartBoxContent = `
                        <img src="${imageSrc}" alt="" class="c_img">
                        <div class="detail_box">
                                <div class="product_c">${title}</div>
                                <div class="price_c">${price}</div>
                                <input type="number" value="1" class="cart-quantity" onchange="updateTotal()">
                        </div>
                        <!--remove cart-->
                        <i class="bx bxs-trash-alt cart-remove"></i>`

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox)
cartShopBox
.getElementsByClassName('cart-remove')[0]
.addEventListener("click",removeCartItem)

cartShopBox
.getElementsByClassName('cart-quantity')[0]
.addEventListener("change",quantityChanged)
}





//Update Total

function updateTotal(){
    var cartContent = document.getElementsByClassName("cart_content")[0]
    var cartBoxes = cartContent.getElementsByClassName("cart_b")
    var total=0
    for (var i=0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName("price_c")[0]
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
        
        var price =parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total=total+(price*quantity)
        
    
    }
    //If price contain some cents value
    total=Math.round(total*100)/100;

    document.getElementsByClassName('total-price')[0].innerText = "$" + total
    
}











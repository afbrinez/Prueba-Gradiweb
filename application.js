const apiUrl = "https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js";
const productTitle = document.getElementById("product-title");
const productImage = document.getElementById("slider-contenedor");
const productPrice = document.getElementById("product-price");
const comparePrice = document.getElementById("compare-product-price");
const productColor = document.getElementById("product-color");
const productSize = document.getElementById("product-size");
const productDescription = document.getElementById("description-container");
const productVendor = document.getElementById("product-vendor");
const inputQty = document.getElementById("quantity");
const totalPrice = document.getElementById("total-price");
const btnAddToCart = document.getElementById("btnaddtocart");
const productFrom = document.getElementById("product-form");
const imagesDesktop = document.getElementById("slider-desktop");


let dataPrice;

async function getInfo(){
    const data = await fetch(apiUrl);
    const response = data.json();
    return response;
}

(function setInfo(){
    getInfo().then(data => {

        data.images.forEach(imagen => {
            productImage.innerHTML += `<div class="miSlider fade" id="miSlider fade"><img src="https:${imagen}" alt=""></div>`
            imagesDesktop.innerHTML += `<div class="imageSlider"><img src="https:${imagen}" alt=""></div>`
        });

        productTitle.innerHTML = data.title;

        productPrice.innerHTML = `$ ${data.price}`;

        comparePrice.innerHTML = `$ ${data.compare_at_price}`;

        data.options.forEach(element => {
            element.values.forEach(el => {
                if(element.name === "Color"){
                    productColor.innerHTML += `<div class="border-color" id="${el}"><label class="label-color" style="background:${el};" id="${el}"><input type="radio" name="colores" class="input-color" for="product-form" value="${el}"></label></div>`;
                }
                else{
                    productSize.innerHTML += `<label class="label-size" id="${el}"><input type="radio" name="size" class="input-size" for="product-form" value="${el}">${el}</label>`;
                                        
                }
            });
        }); 

        productDescription.innerHTML = `<p class="product-description">${data.description}</p>`;

        productVendor.innerHTML = data.vendor;

        totalPrice.innerHTML = data.price;

        dataPrice = data.price;

        btnAddToCart.addEventListener("click", (event)=>{
            event.preventDefault();
            let mensaje = "La variante selecionada es: "
            for(let submit of productFrom ){
                if(submit.name ==="colores"){
                    if(submit.checked){
                        mensaje += submit.value + " / "
                    }
                }
                else if(submit.name === "size"){
                    if(submit.checked){
                        mensaje += submit.value
                    }
                }
            }
            showModal(data.title, mensaje);         
        })

        for(let submit of productFrom ){
            submit.addEventListener("click", ()=>{
                if(submit.name ==="colores"){
                    if(submit.checked){
                        const colorlabels = document.querySelectorAll(".border-color");
                        colorlabels.forEach(element => {
                            element.classList.remove("activeColor")
                        });
                        let colorlabel= document.getElementById(submit.value);
                        colorlabel.classList.add("activeColor");
                    }
                }
                else if(submit.name === "size"){
                    if(submit.checked){
                        const sizelabels = document.querySelectorAll(".label-size");
                        sizelabels.forEach(element => {
                            element.classList.remove("activeSize");
                        });
                        let sizelabel = document.getElementById(submit.value);
                        sizelabel.classList.add("activeSize");
                        
                    }
                }
            }) 
        }


    });

})();

function showModal(title, message){
    const modal = document.getElementById("modal");
    const titleModal = document.getElementById("title-modal");
    const varianteModal = document.getElementById("variante-modal");
    const closeModal = document.getElementById("close-modal");

    modal.classList.add("activeModal");
    closeModal.addEventListener("click", () =>{
        modal.classList.remove("activeModal");
    })

    titleModal.innerHTML = title;
    varianteModal.innerHTML = message;
}

function lessButton(){
    let contador = parseInt(inputQty.value);
    if (contador > 1){
        contador -= 1;
        inputQty.value = contador;
        totalPrice.innerHTML -= dataPrice;
    }
}

function plusButton(){
    let contador = parseInt(inputQty.value);
    if (contador < 10){
        contador += 1;
        inputQty.value = contador;
        totalPrice.innerHTML = dataPrice * contador;
    }
}
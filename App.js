class Product {
    constructor (name, price, year){
        this.name= name;
        this.price= price;
        this.year= year; 
    }
};

class UI {
    addProduct(product1) {
       const productList= document.getElementById('product-list');
       const element= document.createElement('div');
       element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product1.name}
                    <strong>Product Price</strong>: ${product1.price}
                    <strong>Product Year</strong>: ${product1.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
       `;
       productList.appendChild(element);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if (element.name==='delete') {
            element.parentElement.parentElement.parentElement.remove();
        }
    }

    showMessage(message, cssClass) {
        const div= document.createElement('div');
        div.className = `alert alert-${cssClass}`;
        div.appendChild (document.createTextNode(message));
        //Show in DOM
        const container= document.querySelector(".container");
        const app= document.querySelector("#App");
        container.insertBefore(div, app);

        setTimeout(function(){
            document.querySelector(".alert").remove();
        }, 3000)
    }
};

//DOM events
document.getElementById('product-form').addEventListener('submit', 
    function(e) {
        const name= document.getElementById('name').value;
        const price= document.getElementById('price').value;
        const year= document.getElementById('year').value;

        const product1= new Product (name, price, year);
        const ui= new UI();

        if (name==="" || price==="" || year==="") {
           return ui.showMessage("Complete Fields Please!", "danger mt-4");
        };

        ui.addProduct(product1);
        ui.resetForm();
        ui.showMessage("Product Added Successfully!", "success mt-4");

        e.preventDefault();
});

document.getElementById('product-list').addEventListener('click',
    function(e){
        const ui = new UI();
        ui.deleteProduct(e.target);
        ui.showMessage("Product Deleted Successfully!", "info mt-4");
    });
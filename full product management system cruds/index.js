let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let tbody =  document.getElementById('tbody');
let mood = 'create';
let temp;

// get Total

function getTotal(){
    if (price.value != '' ){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#07d344';
    }else{
        total.innerHTML = '';
        total.style.background = 'red';
    }
}

// create product

let productData;

if(localStorage.product != null){
    productData = JSON.parse(localStorage.product);
}else{
    productData = [];
}

function creatProduct(){
    let setProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    // count
    
    if(title.value !='' 
        && price.value !='' 
        && count.value  < 100 
        && category.value != ''){
        if(mood === 'create'){
            if(setProduct.count > 1){
                for(let i = 0; i < setProduct.count; i++){
                    productData.push(setProduct)
            }
            }else{
                productData.push(setProduct)
            }
        }else{
            productData[temp] = setProduct;
            mood = 'create';
            submit.innerHTML = 'create'
            count.style.display = 'block'
        }
        clearInputs()
    }
    // save localStorage
    localStorage.setItem('product', JSON.stringify(productData))

    readData()
}

// clear inputs 

function clearInputs(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read 

function readData(){
    getTotal();

    let table = '';
    let i = 0;
    for( ; i < productData.length; i++){
        table += `
            <tr>
                <td> ${i+1} </td>
                <td> ${productData[i].title} </td>
                <td> ${productData[i].price} </td>
                <td> ${productData[i].taxes} </td>
                <td> ${productData[i].ads} </td>
                <td> ${productData[i].discount} </td>
                <td> ${productData[i].total} </td>
                <td> ${productData[i].category} </td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `
    }
    tbody.innerHTML = table
    let btnDelete = document.getElementById('btnDelete')
    if(productData.length > 0 ){
        btnDelete.innerHTML = `
            <button onclick="deleteAllData()">Delete All (${productData.length})</button>
        `
    }else{
        btnDelete.innerHTML = ''
    }
}
readData()

// delete

function deleteData(i){
    productData.splice(i, 1);
    localStorage.product = JSON.stringify(productData)
    readData()
}

// delete all

function deleteAllData(){
    localStorage.clear()
    productData.splice(0);
    readData()
}

// update

function updateData(i){
    title.value = productData[i].title;
    price.value = productData[i].price;
    taxes.value = productData[i].taxes;
    ads.value = productData[i].ads;
    discount.value = productData[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = productData[i].category;
    submit.innerHTML = 'update';
    mood =  'update';
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

// search

let searchMood = 'title' ;

function search(id){
    let search = document.getElementById('search');
    if(id === 'searchTitle'){
        searchMood = 'title';
    }else{
        searchMood = 'Category';
    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    readData()
}

function searchValue(value){
    let table = '';
    for(let i= 0; i<productData.length; i++){
        if(searchMood == 'title'){
            if(productData[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td> ${i+1} </td>
                    <td> ${productData[i].title} </td>
                    <td> ${productData[i].price} </td>
                    <td> ${productData[i].taxes} </td>
                    <td> ${productData[i].ads} </td>
                    <td> ${productData[i].discount} </td>
                    <td> ${productData[i].total} </td>
                    <td> ${productData[i].category} </td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `
            }
        }else{
            if(productData[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td> ${i+1} </td>
                    <td> ${productData[i].title} </td>
                    <td> ${productData[i].price} </td>
                    <td> ${productData[i].taxes} </td>
                    <td> ${productData[i].ads} </td>
                    <td> ${productData[i].discount} </td>
                    <td> ${productData[i].total} </td>
                    <td> ${productData[i].category} </td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `
            }
        }
    }
    tbody.innerHTML = table;
}


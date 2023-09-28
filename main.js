let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let catagory = document.getElementById('catagory')
let submit = document.getElementById('submit')
let mood =  'create' ;
let tmp;

function getTotal(){
   if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;

    total.innerHTML = result;
    total.style.background = '#040'
   }else{
    total.innerHTML = '';
    total.style.background = '#a00d02'

   }

}


let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = []
}

submit.onclick = function (){
    let newPro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catagory:catagory.value.toLowerCase(),

    }
    // dataPro.push(newPro)
    if(title.value != '' && price.value != '' && catagory.value != '' 
    && newPro.count < 500
    
    ){

        if (mood === 'create'){

            if(newPro.count > 1){
                for (let i = 0 ; i < newPro.count; i++  ){
                    dataPro.push(newPro)
                }
            }else{
                dataPro.push(newPro);
            }
         }else{
             dataPro[ tmp ] =newPro
             mood = 'create'
             submit.innerHTML = 'create'
             count.style.display = "block"
         }
         clearData()

    }

    localStorage.setItem('product',   JSON.stringify(dataPro)
            )
            showData()
}


function clearData(){
   title.value = '',
   price.value = '',
   taxes.value = '',
  ads.value = '',
    discount.value = '',
    total.innerHTML = '',
    count.value = '',
    catagory.value = ''

}

function showData(){
    getTotal()
    let table = '';
    for(let i = 0; i < dataPro.length ; i++){
        table +=  `
             <tr>
                <td> ${i+1} </td>
                <td> ${dataPro[i].title} </td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].catagory}</td>
                <td>
                <button id="update"  onclick="updateData( ${i})" >update</button>
                </td>
                <td><button  onclick="deleteData( ${i} )" id="delete">delete</button></td>
            </tr>

        
        
        `   
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelet = document.getElementById('deletAll')
    if(dataPro.length > 0){
        btnDelet.innerHTML = `
        <button onclick="deletAll()" > deleteAll (${dataPro.length}) </button>
        
        `
    }else{
        btnDelet.innerHTML = ''

    }
}
showData()



function deleteData(i){
dataPro.splice(i,1);
localStorage.product = JSON.stringify(dataPro);
showData()
}

function deletAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()

}


function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none'
    catagory.value = dataPro[i].catagory;
    submit.innerHTML = 'update'
    mood = 'update'
    tmp = i
    scroll({
        top:0,
        behavior: 'smooth'
    })

}


let searchMood = 'title'

function getsearchMood(id)
        // let search = document.getElementById('search')
// search.focus

{
    let search = document.getElementById('search')

if (id == 'searchTitle') {
    searchMood = 'title'
    search.placeholder= 'search by title'
} else{
    searchMood = 'Catogary'
    search.placeholder= 'search by Catogary'
}  
search.value = ''
showData()
search.focus()

console.log(searchMood)
}

function searchData(value){

    let table = ''
if (searchMood == 'title'){

    for(let i = 0 ; i <dataPro.length; i++ ){
        if(dataPro[i].title.includes(value.toLowerCase())){

            table +=  `
            <tr>
               <td> ${i} </td>
               <td> ${dataPro[i].title} </td>
               <td>${dataPro[i].price}</td>
               <td>${dataPro[i].taxes}</td>
               <td>${dataPro[i].ads}</td>
               <td>${dataPro[i].discount}</td>
               <td>${dataPro[i].total}</td>
               <td>${dataPro[i].catagory}</td>
               <td>
               <button id="update"  onclick="updateData( ${i})" >update</button>
               </td>
               <td><button  onclick="deleteData( ${i} )" id="delete">delete</button></td>
           </tr>

       
       
       `   



        }
    }

}



else {
    for(let i = 0 ; i <dataPro.length; i++ ){
        if(dataPro[i].catagory.includes(value.toLowerCase())){

            table +=  `
            <tr>
               <td> ${i} </td>
               <td> ${dataPro[i].title} </td>
               <td>${dataPro[i].price}</td>
               <td>${dataPro[i].taxes}</td>
               <td>${dataPro[i].ads}</td>
               <td>${dataPro[i].discount}</td>
               <td>${dataPro[i].total}</td>
               <td>${dataPro[i].catagory}</td>
               <td>
               <button id="update"  onclick="updateData( ${i})" >update</button>
               </td>
               <td><button  onclick="deleteData( ${i} )" id="delete">delete</button></td>
           </tr>

       `   
        }
    }

}
document.getElementById('tbody').innerHTML = table;

}





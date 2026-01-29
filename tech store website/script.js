const products = [  //This is a list of products.  In JavaScript, this is called an array.
  {id:1,name:"Gaming Laptop",price:1999,cat:"laptop",img:"img/g.jpg"},
  {id:2,name:"Iphone 17 promax",price:5500,cat:"mobile",img:"img/images.jpeg"},
  {id:3,name:"Macbook pro",price:3500,cat:"laptop",img:"img/mp.jpeg", height:"10px"},
  {id:4,name:"iphone X",price:999,cat:"mobile",img:"img/x.jpeg" },
  {id:5,name:"Samsung glaxy x20 ultra",price:1299,cat:"mobile",img:"img/s.jpeg" },
  {id:6,name:"Hp Probook",price:1199,cat:"laptop",img:"img/p.jpeg" },                   //JS uses this data to show products, filter, sort, and open modal
  {id:7,name:"oppo A5g",price:899,cat:"mobile",img:"img/o.jpeg" },
  {id:8,name:"Dell",price:1399,cat:"laptop",img:"img/d.jpeg" },
  {id:9,name:"Google Pixel 10",price:1199,cat:"mobile",img:"img/g1.jpeg" },
  {id:10,name:"ultra watch",price:999,cat:"Accessories",img:"img/w.jpeg" },
  {id:11,name:"Earpods",price:1099,cat:"Accessories",img:"img/e.jpeg" },
  {id:12,name:"Charger",price:599,cat:"Accessories",img:"img/c.jpeg" }
];

let wishlist = JSON.parse(localStorage.getItem("wish")) || [];  //Try to get wishlist from browser memory If nothing is saved → use empty list
let cart = 0;  // Start cart count from 0  Increase when user clicks Add
const list = document.getElementById("productList");
function render(data){  //render= display products on screen  data= list of product to show
  list.innerHTML="";
  data.forEach(p=>{ //p= single product go through each product one by one 
    list.innerHTML+=`        
    <div class="col-md-4">
      <div class="product-card">
        <img src="${p.img}">
        <h5>${p.name}</h5>
        <p class="text-accent">$${p.price}</p>
        <button class="btn btn-sm btn-outline-light quick" data-id="${p.id}">Quick View</button>
        <button class="btn btn-sm btn-outline-light wish" data-id="${p.id}">❤</button>
        <button class="btn btn-sm btn-accent add">Add</button>
      </div>
    </div>`;
  });        //all of these code make product card
}

render(products);   // without this page will be empty

/* FILTER */  //1 document.querySelectorAll(...)   querySelectorAll → select many elements     ".category-filter .btn" → all buttons inside category filter
document.querySelectorAll(".category-filter .btn").forEach(b=>{    //forEach → loop through each button   b → one button at a time
  b.onclick=()=>{    // When this button is clicked Run the code inside { }
    document.querySelectorAll(".category-filter .btn").forEach(x=>x.classList.remove("active")); // Select all buttons again Remove active class from all
    b.classList.add("active");  //Add active class to the button you clicked This changes its color/style (CSS)
    const c=b.dataset.cat;
    render(c==="all"?products:products.filter(p=>p.cat===c));    //IF:  category is "all" show all products ELSE: show only products that match category
                      // Go through all products
                      // Keep only those where category matches
                      //Remove the rest
  }
});

/* SORT */  
document.getElementById("sortPrice").onchange=e=>{//Find the dropdown and .onchange = e => { Meaning:When user changes optionExample:User selects Low → High
  let v=e.target.value; //e → event (change event) target → the dropdown value → selected option value
  let sorted=[...products];//Makes a copy of products array  Does NOT change original products
  if(v==="low") sorted.sort((a,b)=>a.price-b.price); //if user sectlect low to high example 100 200 300
  if(v==="high") sorted.sort((a,b)=>b.price-a.price);// if user selects high to low ecample 300 200 100
  render(sorted);//Show the sorted products on screen  Without this line, sorting happens but user sees nothing.
};

/* CLICK EVENTS */
document.addEventListener("click",e=>{
  if(e.target.classList.contains("quick")){                          // “Did user click a button with class quick?”
    let p=products.find(x=>x.id==e.target.dataset.id);                //Look inside products array Find product with same id
    mTitle.innerText=p.name;                                           // Set modal title
    mImg.src=p.img;                                                     //Set modal image
    mPrice.innerText="$"+p.price;                                       //Set modal price
    bootstrap.Modal.getOrCreateInstance(quickViewModal).show();         //“Open the popup”
  }
  //wishlist
  if(e.target.classList.contains("wish")){                            // kya user na wishlist ko click kya
    wishlist.push(e.target.dataset.id);                               //Add product ID to wishlist array
    localStorage.setItem("wish",JSON.stringify(wishlist));            //Save wishlist in browser memory  Even after refresh, wishlist stays
    wishCount.innerText=wishlist.length;                              //Show total wishlist items in navbar
  }
   // cart section
  if(e.target.classList.contains("add")){                         // kya user na add to cart ko click kya
    cart++;                                                         //Increase cart count by 1
    cartCount.innerText=cart;                                      //Update navbar number
  }
});

wishCount.innerText=wishlist.length;                                 // When page loads, show correct wishlist number  (From localStorage)


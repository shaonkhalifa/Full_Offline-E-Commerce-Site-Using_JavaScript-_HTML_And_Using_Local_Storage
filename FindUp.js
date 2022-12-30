function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

var db;
var currentEdit = null;

$(document).ready(function () {
    var openReq = indexedDB.open("DetailsDB", 1);
    openReq.onupgradeneeded = function (e) {
        db = e.target.result;

        var store = db.createObjectStore("Details", { keyPath: "id", autoIncrement: true });
        console.log(store);
    }

    openReq.onsuccess = function (e) {
        db = e.target.result;
        console.log(db);
        readAll();
    }
});

function readAll() {
    var tx = db.transaction(["Details"], "readonly");
    var req = tx.objectStore("Details").openCursor();
    req.onsuccess = function (e) {
        var cursor = e.target.result;
        if (!cursor) return;
        $(".rightBody").append(

            `<div id="produtItems" class="produtItems">
                  <div class="imgContainer ">
                      <img class="productImg" src="Images/${cursor.value.Image}" alt="Bat" />
                  </div>
                  <div class="productDetalils">
                      <div>
                          <h4 class="productName">Product Name:&nbsp&nbsp<a>${cursor.value.ProductName}</a> </h4>
                      </div>
                      <p class="priceTag">
                          <span class="productPrice ">Price:&nbsp &nbsp<a><u>${cursor.value.Price}</u></a>  BDT</span>
                      </p>
                      <div class="cartBtn">
                          <button id="addToCart" class="addTocart" onclick="openForm()" data-product-id="${cursor.key}">Add To Cart</button>
                          
                      </div>
                  </div>
              </div>`
        )
        cursor.continue();
    }
    req.onerror = function (err) {
        console.log(err);
    }
};
$("#searchButton").on('click', function () {

    var searchText = $("#searchButton").val();
    var tx = db.transaction(["Details"], "readonly");
    var req = tx.objectStore("Details").openCursor();
    req.onsuccess = function (e) {
        var cursor = e.target.result;
        if (!cursor) return;
        if (cursor.value.ProductName.toLowerCase().includes(searchText.toLowerCase())) {
            $(".rightBody").append(

                `<div id="produtItems" class="produtItems">
                                  <div class="imgContainer ">
                                       <img class="productImg" src="Images/${cursor.value.Image}" alt="Bat" />
                                  </div>
                              <div class="productDetalils">
                                  <div>
                                      <h4 class="productName">Product Name:&nbsp&nbsp<a>${cursor.value.ProductName}</a> </h4>
                                  </div>
                                      <p class="priceTag">
                                          <span class="productPrice ">Price:&nbsp &nbsp<a><u>${cursor.value.Price}</u></a>  BDT</span>
                                      </p>
                                   <div class="cartBtn">
                                      <button id="addToCart" data-id="${cursor.key}ss">Add To Cart</button>
                                      <button id="goToCart" class="goTocart" onclick="openForm()">Go To Cart</button>
                                  </div>
                              </div>
                          </div>`
            )
        }
        cursor.continue();
    }
    req.onerror = function (err) {
        console.log(err);
    }
});



          //function totall() {
          //    var unitPrice = document.getElementById("Price").value;
          //    var quntity = document.getElementById("Price").value;
          //    document.getElementById("Price") = unitPrice * quntity;

          //}
          //function mortgageCalc() {
          //    var amountBorrowed;
          //    var mortgageTerm;
          //    var monthlyCost;
          //    var result = document.getElementById('monthlyCost')
          //    amountBorrowed = document.getElementById("amountBorrowed").value;
          //    mortgageTerm = document.getElementById("mortgageTerm").value;
          //    mortgageTerm *= 12;
          //    monthlyCost = (amountBorrowed / mortgageTerm);
          //    console.log(monthlyCost);
          //    result.innerHTML = monthlyCost
          //}

          //function totall() {
          //    var num1;
          //    var num2;
          //    var Total;
          //    var result = document.getElementById('mulPrice')
          //    var uprice = parseInt(document.getElementById("UnitPrice").value);
          //    var quantity = parseInt(document.getElementById("quntity").value);
          //    monthly = uprice * quantity;
          //    result.innerHTML = Total;

          //    /*document.getElementById("Price") = total;*/
          //    /*if (total > 100) console.log("It's over!");*/
          //}
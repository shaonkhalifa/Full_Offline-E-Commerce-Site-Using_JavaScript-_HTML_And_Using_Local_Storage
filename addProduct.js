var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

var db;
var currentEdit = null;

$(document).ready(function () {
    var openReq = indexedDB.open("ProductDB", 1);
    openReq.onupgradeneeded = function (e) {
        db = e.target.result;

        var store = db.createObjectStore("ProductTable", { keyPath: "id", autoIncrement: true });
        console.log(store);
    }

    openReq.onsuccess = function (e) {
        db = e.target.result;
        console.log(db);
        readAll();


    }
});

function readAll() {
    var tx = db.transaction(["ProductTable"], "readonly");
    var req = tx.objectStore("ProductTable").openCursor();
    req.onsuccess = function (e) {
        var cursor = e.target.result;
        if (!cursor) return;
        $(".middle2").append(

            `<div id="produtItems" class="produtItems">
                <div class="imgContainer ">
                    <img class="productImg" src="Images/${cursor.value.Image} alt="Bat" />
                </div>
                <div class="productDetalils">
                    <div>
                        <h4 class="productName">Product Name:&nbsp&nbsp<a>${cursor.value.ProductName}</a> </h4>
                    </div>
                    <p class="priceTag">
                        <span class="productPrice ">Price:&nbsp &nbsp<a><u>${cursor.value.Price}</u></a>  BDT</span>
                    </p>
                    <div class="cartBtn">
                        <button id="addToCart">Add To Cart</button>
                        <button id="goToCart" class="goTocart" onclick="openForm()">Go To Cart</button>
                    </div>
                </div>
            </div>`

            //`<div id="Product-item" class="Product-item">
            //            <p>${cursor.value.ProductName}</p>
            //            <img src="Images/${cursor.value.ProductImage}" width="130" height="140" />
            //            <p>Price : ${cursor.value.Price}tk</p>
            //            <button id="btncart">Add to cart</button>
            //        </div>`

        )
        cursor.continue();
    }
    req.onerror = function (err) {
        console.log(err);
    }
}
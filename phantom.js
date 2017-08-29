var page = new WebPage(), testindex = 0, loadInProgress = false;

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log("load started");
};

page.onLoadFinished = function() {
  loadInProgress = false;
  console.log("load finished");
};

var steps = [
  function() {
    //Load Login Page
    page.open("https://www.aliexpress.com/");
  },
  function() {
    //Search Product By Id
    page.includeJs("https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js", function() {
      page.evaluate(function() {
        var idProduct = "32544859436"
        $("#search-key").val(idProduct);
        $("#form-searchbar > div.searchbar-operate-box > input").click();
      });
    });
  },
  function() {
    //Load Product Page
    page.evaluate(function() {
      console.log("load Product Page Success");
    });
  },
  function() {
    //Scrap data
    page.evaluate(function() {
      var idProduct = "32544859436"
      var product = {}
      product.id = idProduct;
      product.pictures = []
      var img = document.getElementsByClassName("img-thumb-item")
      for(var i = 0; i<img.length; i++){
        product.pictures.push(img[i].baseURI)
      }
      product.categories = []
      var arrCategories = document.querySelectorAll('.ui-breadcrumb > .container > a')
      for(var j = 0; j<arrCategories.length; j++){
        if(j > 1){
          var obj = {}
          var link = arrCategories[j].href
          obj.categoryId = link.split('/category/')[1].split('/')[0]
          obj.categoryName = arrCategories[j].innerText
          product.categories.push(obj)
        }
      }
      product.productName = document.getElementsByClassName('product-name')[0].innerText
      product.productRatingScore = document.getElementsByClassName('percent-num')[0].innerText
      product.productRatingNumberOfVotes = document.getElementsByClassName('rantings-num')[0].innerText
      product.numberOfOrder = document.getElementsByClassName('order-num')[0].innerText.split(' ')[0]
      product.stockAvailable = document.getElementById('j-sell-stock-num').innerText.split(' ')[0]
      product.numberWishlist = document.getElementsByClassName('wishlist-num')[0].innerHTML
      product.shippingWeight = document.getElementsByClassName('packaging-item')[1].getElementsByClassName('packaging-des')[0].innerHTML
      product.storeName = document.getElementsByClassName('shop-name')[0].getElementsByTagName('a')[0].innerText
      product.storeId = document.getElementsByClassName('shop-name')[0].getElementsByTagName('a')[0].href.split('/store/')[1]
      product.storeLocation = document.getElementsByClassName('store-address')[0].innerText
      product.storeRating = document.querySelector('.positive-percent a').innerText
      product.storeOpenSince = document.querySelector('.store-open-time span').innerText

      console.log(JSON.stringify(product));
    })
  }
];


interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    console.log("step " + (testindex + 1));
    steps[testindex]();
    testindex++;
  }
  if (typeof steps[testindex] != "function") {
    console.log("test complete!");
    phantom.exit();
  }
}, 50);

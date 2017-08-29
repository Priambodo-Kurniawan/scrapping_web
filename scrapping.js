var page = require('webpage').create();
var urlProduct

page.open("https://www.aliexpress.com/", function(status) {
  page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js', function() {
    page.evaluate(function() {
      var idProduct = '32544859436'
      $("#search-key").val(idProduct);
      $("#form-searchbar > div.searchbar-operate-box > input").click();
    });

    page.onLoadFinished = function() {
      urlProduct = page.evaluate(function() {
        return window.location.href;
      })
      console.log(urlProduct);
      phantom.exit();
    };
  });
});


// console.log(urlProduct);
//
// page.open(urlProduct, function(status) {
//   page.evaluate(function() {
//     var idProduct = '32544859436'
//     var product = {}
//     product.id = idProduct;
//     product.pictures = []
//     var img = document.getElementsByClassName('img-thumb-item')
//     for(var i = 0; i<img.length; i++){
//       product.pictures.push(img[i].baseURI)
//     }
//     console.log(JSON.stringify(product));
//   })
//
//   page.onLoadFinished = function() {
//   }
// })

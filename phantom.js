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
    page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js', function() {
      page.evaluate(function() {
        var idProduct = '32544859436'
        $("#search-key").val(idProduct);
        $("#form-searchbar > div.searchbar-operate-box > input").click();
      });
    });
  },
  function() {
    //Load Product Page
    page.evaluate(function() {
      console.log('load Product Page Success');
    });
  },
  function() {
    //Scrap data
    page.evaluate(function() {
      var idProduct = '32544859436'
      var product = {}
      product.id = idProduct;
      product.pictures = []
      var img = document.getElementsByClassName('img-thumb-item')
      for(var i = 0; i<img.length; i++){
        product.pictures.push(img[i].baseURI)
      }
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

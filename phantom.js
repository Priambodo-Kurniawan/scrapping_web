var page = require('webpage').create();
var testindex = 0, loadInProgress = false;

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log('load started');
}

page.onLoadFinished = function() {
  loadInProgress = false;
  console.log(('load finished'));
}

var steps = [
  function() {
    page.open('https://www.aliexpress.com/');
  },
  function() {
    page.evaluate(function() {
      var searchInput = document.getElementById('search-key');
      console.log('searchInput');
      searchInput.value='32544859436';
      return
    })
  },
  function() {
    page.evaluate(function() {
      var buttonSearch = document.getElementsByClassName('search-button');
      for(var i=0; i< buttonSearch.length; i++) {
        if(buttonSearch[i].getAttribute('type') == 'submit'){
          buttonSearch[i].submit();
          return;
        }
      }
    })
  },
  function() {
    page.evaluate(function() {
      console.log(document.querySelectorAll('html')[0].outerHTML);
    });
  }
];

interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == 'function') {
    console.log('step ' + (testindex + 1));
    steps[testindex]();
    testindex++;
  }
  if (typeof steps[testindex] !== 'function') {
    console.log('test complete!');
    phantom.exit();
  }
}, 50)
// console.log('The default user agent is ' + page.settings.userAgent);
// page.settings.userAgent = 'SpecialAgent';

// page.open('https://www.google.co.id/', function(status) {
//   if (status !== 'success') {
//     console.log('Unable to access network');
//   } else {
//     var ua = page.evaluate(function() {
//       return document.getElementById('_eEe').textContent;
//     });
//     console.log(ua);
//   }
//   phantom.exit();
// });

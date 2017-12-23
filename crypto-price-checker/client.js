var coinList = [];
var dom = document.getElementById("coin-results");
var domPrice = document.getElementById("price-results");

var data = fetch("https://www.cryptonator.com/api/currencies").then(function(value) {
  return value.json();
}).then(function(jsonValue){
  coinList.push(jsonValue);
});

var inputBar = document.getElementById("input");
inputBar.addEventListener('keyup', function(input){
  
  var autosuggest = document.getElementById('coin-results');
  autosuggest.style.display = 'block';
  
  var textValue = inputBar.value;
  var coinArray = coinList[0].rows;
  var regex = new RegExp(textValue, "gi");
  
  var matches = coinArray.filter(function(values) {
    return values.code.match(regex) || values.name.match(regex);
  });
  
  console.log(matches);
  
  var listElements = document.createElement("ul");
  listElements.setAttribute('class','currency-list');
  
  for (var x in matches) {
    var item = document.createElement("li");
    item.addEventListener('click', showPrice);
    
    item.innerHTML = matches[x].code + ' - ' + matches[x].name;
    listElements.appendChild(item);
    
    item.dataset.ticker = matches[x].code.toLowerCase();
    console.log(listElements);
  }  
  dom.innerHTML = "";  
  dom.appendChild(listElements);
});

function showPrice(event) {
  console.log(this.dataset.ticker);
  
  var autosuggest = document.getElementById('coin-results');
  autosuggest.style.display = 'none';
  
  let data = fetch("https://api.cryptonator.com/api/full/" + this.dataset.ticker + "-usd").then(function(value) {
    return value.json();
  }).then(function(jsonValue) {
    domPrice.innerHTML = '$'+Math.round(jsonValue.ticker.price * 100) / 100;
    console.log(jsonValue);
  });
}
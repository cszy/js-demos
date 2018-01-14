/*
  Example 1: new keyword and explicit use of prototype chain
*/

function Sport(name){
  this.sportName = name;
  var secretName = 'shhh';
  var self = this;
  
  // "this" is bound to the call site, which is tellSecret()
  const tellSecret = function(){
    console.log(secretName + ' ' + this.sportName); //"shhh undefined"
    console.log(secretName + ' ' + self.sportName); //"shhh Soccer"
  }
  tellSecret();
  
  // Lexically scoped "this" using an ES6 arrow function
  const tellEs6Secret = () => {
    console.log(secretName + ' ' + this.sportName); //"shhh Soccer"
  }
  tellEs6Secret();
  
  hoist(); // "this was hoisted"
  function hoist(){
    console.log('this was hoisted');
  }
  
  console.log(hoist2); // undefined
  
  // console.log(hoist3); // "error"
  
  var hoist2 = function(){
    console.log('this was also hoisted');
  }
  hoist2(); // "this was also hoisted"
}

Sport.prototype.publicAnnouncement = function() {
  console.log('call me!');
}

var sport1 = new Sport('Soccer');
console.log(sport1.sportName); // "Soccer"
sport1.publicAnnouncement(); // "call me!"

Soccer.prototype = Object.create(Sport.prototype);

function Soccer(){
  Sport.call(this,'Soccer in detail');
}

var soccer = new Soccer();
console.log(soccer.sportName); // "Soccer in detail"


/*
  Example 2 - OLOO
*/

const genericTvDeal = {
  amount: '',
  network: 'The Network',
  setAmount: function(amt) { this.amount = amt; }
}

var deal = Object.create(genericTvDeal);
console.log(deal.network); // "The Network"
deal.setAmount(100);
console.log(deal.amount); // 100


/*
  Example 3 - OLOO with multiple objects and prototype links
*/
var game = {
  init: (name) => {
    this.name = name;
  },
  displayName: () => {
    console.log(this.name);
  }
}

game.init('Zelda');
game.displayName();

var consoleGame = Object.create(game);

consoleGame.setConsole = (consoleName) => {
  this.console = consoleName;
}

consoleGame.getConsole = () => {
  return this.console;
}

consoleGame.setConsole('N64');
console.log(consoleGame.getConsole());
consoleGame.displayName();
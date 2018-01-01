class Blockchain {
  constructor(name) {
    console.log(name + ': constructor ran');
    this.name = name;
  }
  
  addBlock() {
    console.log(this.name + ': Adding block from function on Blockchain\'s prototype');
  }
}

var myChain = new Blockchain('TurnoverChain'); //Console: "TurnoverChain: constructor ran"

myChain.addBlock(); //Console: "TurnoverChain: Adding block from function on Blockchain's prototype"

class Coin extends Blockchain {
  constructor(name) {
    super(name);
    this.coinName = name;
  }
  
  totalSupply() {
    console.log("Returning the total supply of: " + this.coinName);
  }
}

var myCoin = new Coin('Pittcoin'); //Console: "Pittcoin: constructor ran"

console.log('Property of Coin: ' + myCoin.coinName); //Console: "Property of Coin: Pittcoin"
console.log('Property of Blockchain: ' + myCoin.name); //Console: "Property of Blockchain: Pittcoin"

class MinableCoin extends Coin {
  constructor(algorithm, name) {
    super(name);
    this.algorithm = algorithm;
  }
}

var myMinable = new MinableCoin('sha256', 'Pitthash'); //Console: "Pitthash: constructor ran"
myMinable.totalSupply(); //Console: "Returning the total supply of: Pitthash"
myMinable.addBlock(); //Console: "Pitthash: Adding block from function on Blockchain's prototype"
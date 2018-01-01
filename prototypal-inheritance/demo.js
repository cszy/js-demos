function Blockchain(name) {
    console.log(name + ': constructor ran');
    this.name = name;
}

Blockchain.prototype.addBlock = function() {
  console.log(this.name + ': Adding block from function on Blockchain\'s prototype');
}

var myChain = new Blockchain('Demo Chain');

/*
  What happened?
  
  1) A new Object (myChain) was created
  2) The internal prototype of myChain (__proto__) was linked to the prototype of 
  Blockchain
  
  Note that these are all the same (try them out to confirm):
  
  console.log(Object.getPrototypeOf( myChain ));
  console.log(Blockchain.prototype);
  console.log(myChain.__proto__);

  3) The "constructor" of Blockchain (function Blockchain()) was executed, which 
  in turn adds a property of .name to "this". Remember that "this" points to the 
  call site from which Blockchain was created.
  
  In other words, myChain, which is the call site, gets the property .name
*/

myChain.addBlock();

/*
  What happened?
  
  1) A function called addBlock() that exists on myChain is attempted to be called.
  2) addBlock() does not exist on myChain
  3) Javascript moves "up the prototype chain" to look for addBlock()
  Remember that myChain.__proto__ === Blockchain.prototype
  4) addBlock() is found on Blockchain.prototype and executed
  
*/

Coin.prototype = Object.create( Blockchain.prototype );

function Coin(name) {
  Blockchain.call(this, name);
  
  /*
    What happened?
    
    1) We called the "parent"'s constructor to initialize the object (Blockchain)
  */
  
  this.coinName = name;
}

Coin.prototype.totalSupply = function(){
  console.log("Returning the total supply of: " + this.coinName);
}

/*
  What happened?
  
  1) A new object, Coin, has its prototype linked to Blockchain's prototype
  
  Note that this is true:
  
  console.log(Blockchain.prototype.isPrototypeOf( myCoin ));
  
  These are also true, which show the "prototype chain":
  
  console.log(Object.getPrototypeOf( myCoin ) === Coin.prototype);
  console.log(Object.getPrototypeOf( Coin.prototype ) === Blockchain.prototype);
  
  Question: Why didn't we use: Coin.prototype = new Blockchain(); for this?
  
  Answer: We could, however, using the "new" keyword causes the constructor to run.
  In this case, we just want to link the prototypes, not run the constructor.
  Try it out with new Blockchain() to see this in action.
*/

var myCoin = new Coin('Pittcoin');
console.log('Property of Coin: ' + myCoin.coinName);
console.log('Property of Blockchain: ' + myCoin.name);
myCoin.addBlock();
myCoin.totalSupply();

/*
  What happened?
  
  1) A new Object (myCoin) was created
  2) The internal prototype of myCoin (__proto__) was ALREADY linked to the 
  prototype of Blockchain (see above)
  3) The "constructor" of Coin (function Coin()) was executed, which 
  in turn adds a property of .coinName to "this". Remember that "this" points to the 
  call site from which Coin was created.
  
  In other words, myCoin, which is the call site, gets the property .coinName
*/

MinableCoin.prototype = Object.create( Coin.prototype );

function MinableCoin(algorithm, name) {
  Coin.call(this, name);
  this.algorithm = algorithm;
}

var myMinable = new MinableCoin('sha256', 'Pitthash');
myMinable.totalSupply();
myMinable.addBlock();
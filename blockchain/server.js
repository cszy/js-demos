var express = require('express');
const crypto = require('crypto');

var blocks = [];
const difficulty = '00';
var message = '';

var app = express();
app.use(express.static('public'));
app.get("/", function (request, response) {
  message = request.query.message;
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/mine", function (request, response) {
  var blockchain = new Blockchain();
  blockchain.addBlock(message);

  response.send(blocks);
});

function Blockchain(){
  this.genesisData = 'Christmas for the robber barons';
  this.genesisHash = '00123456789';
}

Blockchain.prototype.addBlock = function(data) {
  let blockData, blockHash;
  
  if(blocks.length > 0){    
    blockData = data;
    blockHash = blocks[blocks.length-1].hash;
  }else {
    blockData = this.genesisData;
    blockHash = this.genesisHash;
  }
  
  this.hashData(blockData, blockHash).then(function(item){
    blocks.push(item);
  });
};

Blockchain.prototype.hashData = function(data, hash) {
  return new Promise(function(resolve, reject) {    
    calculateHash(0);
    function calculateHash(nonce){
      let dataString = `${data}${Date.now()}${hash}${blocks.length}`;
      let calculatedHash = crypto.createHmac('sha256', hash).update(dataString + nonce).digest('hex');
      
      if( calculatedHash.substring(0, 2) === difficulty ) {
        return resolve({height: blocks.length+1, lastBlock: hash, hash: calculatedHash, coinbase: data});
      } else if (nonce < 20000) {        
        calculateHash(nonce++);
      }else {
         reject(Error("Couldn't get a hash")); 
      }
    };
  });
};

var listener = app.listen(process.env.PORT, function () {
  console.log('Listening on port ' + listener.address().port);
});
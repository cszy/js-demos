(function(){
  fetch('/mine').then(function(response) {
    return response.text();
  }).then(function(item) {
    console.log('Blockchain is now...');
    console.log(item);
  });
})();
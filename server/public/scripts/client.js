console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

  //Add transfer koala button for updateKoala function below

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas



function updateKoala(transferKoala) {
  console.log('in updateKoala', transferKoala); //create transfer object above

  let id = transferKoala.id

  $.ajax({
    method: 'PUT',
    url: `/koalas/${id}`,
    data: transferKoala,
  })
    .then(function (response) {
      console.log('Response from server.', response);
      getKoalas();
    })
    .catch(function (error) {
      console.log('Error in POST', error)
      alert('Unable to get koalas at this time. Please try again later.');
    });
}

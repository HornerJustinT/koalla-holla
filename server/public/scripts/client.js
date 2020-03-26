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
      name: $( '#nameIn' ).val(),
      age: $( '#ageIn' ).val(),
      gender: $( '#genderIn' ).val(),
      readyForTransfer: $( '#readyForTransferIn' ).val(),
      notes: $( '#notesIn' ).val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
}).then( function( response ){
    // response is the array of songs
    render( response )
}).catch( function( err ){
    // handle errors
    alert( 'error getting koalas. see console for details' );
    console.log( err );
})
  
} // end getKoalas




function updateKoala(koalaToSend){
  console.log('in saveKoala', koalaToSend );
  // ajax call to server to get koalas

  $.ajax({
    method: 'PUT',
    url: `/koala/${id}`,
    data: koalaToSend,
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


function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: newKoala
}).then( function( response ){
    console.log( 'back from POST with:', response );
    // Get songs again, so we see new one added
    getKoalas();
}).catch( function( err ){
    alert( 'error adding track. see console for details' );
    console.log( err );
}) 
 
}

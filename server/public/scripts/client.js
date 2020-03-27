console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

  //Add transfer koala button for updateKoala function below

}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala(koalaToSend);
  });
  $( '#viewKoalas' ).on( 'click', 'button', transferKoala);
}
function transferKoala(){
  console.log('in transferKoala', $(this).parent().parent().children(":first-child").text());
  console.log( $(this).parent().parent().children(":nth-child(5)"));
  
  let transferKoalaObject = {
          id:$(this).parent().parent().children(":first-child").text(),
          name:$(this).parent().parent().children(":nth-child(2)").text(),
          age: $(this).parent().parent().children(":nth-child(3)").text(), 
          gender: $(this).parent().parent().children(":nth-child(4)").text(),
          readyForTransfer: $(this).parent().parent().children(":nth-child(5)").text().substring(0,1),
          notes: $(this).parent().parent().children(":nth-child(6)").text(),
        }
  console.log(transferKoalaObject);
  updateKoala(transferKoalaObject);// with object made

}
function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function (response) {
    // response is the array of songs
    render(response)
  }).catch(function (err) {
    // handle errors
    alert('error getting koalas. see console for details');
    console.log(err);
  })

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



function saveKoala(koalaToSend) {
  console.log('in saveKoala', koalaToSend);

  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#genderIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');

  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: koalaToSend
  }).then(function (response) {
    console.log('back from POST with:', response);
    // Get songs again, so we see new one added
    getKoalas();
  }).catch(function (err) {
    alert('error adding track. see console for details');
    console.log(err);
  })
}


// Display koalas on the DOM 
function render(koalas) {
  console.log('In render', koalas);
  $('#viewKoalas').empty();

  // add each song to the DOM
  for (let koala of koalas) {
    $('#viewKoalas').append(`
              <tr>
                  <td>${ koala.id }</td>
                  <td>${ koala.name }</td>
                  <td>${ koala.age }</td>
                  <td>${ koala.gender }</td>
                  <td>${ koala.ready_to_transfer }<button class="transfer">Transfer</button></td>
                  <td>${ koala.notes }</td>
              </tr>`);
  }
}
console.log("connected");


$('.submit-button').on('click',  function (e) {
  e.preventDefault();

  console.log('clicked')
  const event = {
    eventName: document.getElementById('inputEventName').value.trim(),
    hostName: document.getElementById('inputHostName').value.trim(),
    address: document.getElementById('inputAddress').value.trim(),
    city: document.getElementById('inputCity').value.trim(),
    eventDescription: document.getElementById('inputEventDescription').value.trim(),
    indoorEvent: document.getElementById('gridCheck1').checked,
    outdoorEvent: document.getElementById('gridCheck2').checked,
    virtualEvent: document.getElementById('gridCheck3').checked,
    numberofAttendees: document.getElementById('exampleFormControlSelect1').value.trim(),
    dateTime: document.getElementById('inputDateTime').value.trim(),
    status: 0,   // status -1 , 0 , 1 denied, pending, approved 
  };
  if (event.eventName===''|| event.hostName===''|| event.address ===''|| event.city===''|| event.dateTime ==='') {
    return
  }
  console.log(event);
    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then((response) => {
        response.json(); 
        // location.href = "/createvent.html"; 
      });
       document.getElementById('inputEventName').value = '',
       document.getElementById('inputHostName').value= '',
       document.getElementById('inputAddress').value= '',
      document.getElementById('inputCity').value= '',
      document.getElementById('inputEventDescription').value ='',
       document.getElementById('exampleFormControlSelect1').value ='',
       document.getElementById('inputDateTime').value= ''




});



// $('.submit-button').click( function (e){
//      e.preventDefault();

// });

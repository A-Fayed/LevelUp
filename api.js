var ApiRespond = '';

$.ajax({ url: 'https://levelup-assessment-backend-ddmwdsdlta.now.sh/api/getFormSchema',
		method: 'GET',
		success:function(data){
			ApiRespond = data ;
			createForm();
		},

		error:function(error){
			console.log(error);
		},
	});


// ----- APPENDING TO HTML ----------------------------------------------------------------------------------


function createForm (){
	$('.API').append('<form>');

	for (i=0; i< Object.keys(ApiRespond).length; i++){
		var propertyName = Object.keys(ApiRespond)[i];
		var propertyType = ApiRespond[propertyName].type;
		var propertyValue = ApiRespond[propertyName].value;

		$('form').append('<p>');
			if ( propertyName ==='secret' || propertyName ==='submit' ) {
				$('p').last().append($('<label>').text(propertyName).attr({ 'class': 'visually-hidden', 'for': propertyName, 'value': propertyValue}));
				$('p').last().append($('<input>').attr({'type': propertyType, 'name': propertyName, 'id':propertyName}));	
			} else {
				$('p').last().append($('<label>').text(propertyName).attr('for', propertyName));
				$('p').last().append($('<input>').attr({'type': propertyType, 'name': propertyName, 'id':propertyName}));	
				}
			}
	};



// ----- FETCH INPUTS TO AN OBJECT AND CUSTOMISE IT LIKE RESPONSE EXAMPLE -------------------------------------

var obj = {};

function createResponse (){	
	var myinput = document.querySelectorAll('input');
	for (i=0; i<myinput.length; i++) {
		if (ApiRespond[Object.keys(ApiRespond)[i]].type === 'checkbox'){
			myinput[i].value = myinput[i].checked;
		} else if (ApiRespond[Object.keys(ApiRespond)[i]].type === 'hidden'){
			myinput[i].value = ApiRespond[Object.keys(ApiRespond)[i]].value;
		}

	obj[Object.keys(ApiRespond)[i]] = myinput[i].value;
	 if(myinput[i].type === 'number' ){
	 	obj[Object.keys(ApiRespond)[i]] = Number(obj[Object.keys(ApiRespond)[i]]);
	 } else if (myinput[i].type === 'checkbox'){
	 	obj[Object.keys(ApiRespond)[i]] = Boolean(obj[Object.keys(ApiRespond)[i]]);
	 }

	 delete obj['submit'];
	};

};

// ----- POSTING AS JSON RESPONSE -----------------------------------------------------------------------------

var finalResponse = '';

$('.API').on('submit','form', function(event){
	event.preventDefault();
	createResponse();
	finalResponse = JSON.stringify(obj, null, '\t') ;
	console.log(finalResponse);

	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://levelup-assessment-backend-ddmwdsdlta.now.sh/api/submission",
	  "method": "POST",
	  "headers": {
	    "Content-Type": "application/json"
	  },
	  "processData": false,
	  "data": finalResponse
	}

	$.ajax(settings).done(function (response) {
	  console.log(response);
	});

});


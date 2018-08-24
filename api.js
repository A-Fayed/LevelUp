var ApiRespond = '';

$.ajax({ url: 'https://levelup-assessment-backend-odvoreherl.now.sh/api/getFormSchema',
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

		$('form').append('<p>');
			if ( propertyName ==='secret' || propertyName ==='submit' ) {
				$('p').last().append($('<label>').text(propertyName).attr({ 'class': 'visually-hidden', 'for': propertyName}));
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
		}

	obj[Object.keys(ApiRespond)[i]] = myinput[i].value;
	};
	delete obj["secret"];
	delete obj["submit"];
};

// ----- POSTING AS JSON RESPONSE -----------------------------------------------------------------------------

$('.API').on('submit','form', function(event){
	event.preventDefault();
	createResponse();

	$.ajax({ url: 'https://levelup-assessment-backend-odvoreherl.now.sh/api/submission' ,
		method: 'POST',
		data: JSON.stringify(obj),
		dataType: 'json',
		success:function(data){
			console.log(data);
		},

		error:function(error){
			console.log(error);
		},
	});
});


var jsonUrl = "https://developer.setmore.com/api/v1/o/oauth2/token?refreshToken=dd51e2a9d25muTwhH10_XGYejeJvLj-QLhJnK-ikNrfIX";

//function call to get the access token
$.getJSON(jsonUrl, function(data) {
	  token = JSON.stringify(data);
	  console.log(token);
	  Access = JSON.parse(token);
	  window.access_token = Access.data.token.access_token;
	  console.log(access_token);
	  $('#result').text(access_token);
}, "json");

//function to get the service list 
setTimeout(function(){
$.ajax({
	type: "GET",
	url: "https://developer.setmore.com/api/v1/bookingapi/services",
	beforeSend: function(xhr) {
		xhr.setRequestHeader('Content-Type', 'application/json');
	    xhr.setRequestHeader('Authorization', 'Bearer '+ window.access_token);
	},
		  
	success: function (data){
		a=data;
		console.log(data); 
		}
});
}, 2000);

//function to create the list of services for the selected staff
function services(staffID) {
	document.getElementById("staff").style.display = 'none';
	document.getElementById("service").style.display = 'block';
	staff=staffID.split(" ");
	window.staffKey = staff[0];
	window.staffName = staff[1];
	for(i=0;i<a.data.services.length;i++)
	{
		staffs=a.data.services[i].staff_keys;
		for(j=0;j<staffs.length;j++){
			if(staffs[j]==staffKey){
				list="serviceList";
				var clickFunc=datepicker;
				console.log(a.data.services[i].service_name);
				createList(clickFunc,list,a.data.services[i].key,a.data.services[i].service_name);
			}
		}
	}
}

//function to get the staff list and to create the list of staffs in the account
setTimeout(function(){
	$.ajax({
		type: "GET",
		url: "https://developer.setmore.com/api/v1/bookingapi/staffs",
		beforeSend: function(xhr) {
	        xhr.setRequestHeader('Content-Type', 'application/json');
	        xhr.setRequestHeader('Authorization', 'Bearer '+ window.access_token);
	    },
		success: function (data){
			b=data;
			list="staffList";
			var clickFunc=services;
			for(i=0;i<b.data.staffs.length;i++)
			createList(clickFunc,list,b.data.staffs[i].key,b.data.staffs[i].first_name);
			console.log(data);
		}
	});
}, 2000);

//function to get the slots avaiable for the selected staff,service and the date
function slots() {

	window.selected_date = $("#datePicker1").val();
	var data = {"staff_key":window.staffKey ,"service_key": window.serviceKey, "selected_date":selected_date,"off_hours":false,"double_booking" : false,"slot_limit" : 30};
	$.ajax({
		type: "POST",
		url: "https://developer.setmore.com/api/v1/bookingapi/slots",
		beforeSend: function(xhr) {
	        xhr.setRequestHeader('Content-Type', 'application/json');
	        xhr.setRequestHeader('Authorization', 'Bearer '+ window.access_token);
	    },
	    data:JSON.stringify(data),
		success: function (data){
			c=data;
			list = "slotsList";
			var clickFunc = showCustomer;
			console.log(data); 
			for(i=0;i<c.data.slots.length;i++)
			createList(clickFunc,list,c.data.slots[i],c.data.slots[i]);
		}
	});
}

//function to show the form to enter details of the customer
function showCustomer(time){
	timing=time.split(" ");
	window.startHour=timing[0];
	document.getElementById("date").style.display = 'none';
	document.getElementById("customerForm").style.display = 'block';
	
}

//function to get the details of the customer
function getCustomer(){
	fname=document.getElementById("firstName");
	lname=document.getElementById("lastName");
	email=document.getElementById("email");
	customerDetails={
		"first_name" : fname.value,
		"last_name" : lname.value,
		"email_id" : email.value
	};
	customer(customerDetails);
}

//function call to create the customer in the account
function customer(customerDetails) {
	var data = {"first_name":customerDetails.first_name,"last_name":customerDetails.last_name,"email_id":customerDetails.email_id};
		$.ajax({
			type: "POST",
			url: "https://developer.setmore.com/api/v1/bookingapi/customer/create",
			beforeSend: function(xhr) {
		       xhr.setRequestHeader('Content-Type', 'application/json');
		       xhr.setRequestHeader('Authorization', 'Bearer '+ window.access_token);
		   },
		   data:JSON.stringify(data),
		   success: function (data){
			   cust=data;
			   console.log(data);
			   window.customerKey = cust.data.customer.key;
			   confirmation();
		   }
		});
}

//function to show the block which shows the appointment details before confirming the appointment
function confirmation(){
	document.getElementById("customerForm").style.display = 'none';
	document.getElementById("appointmentConfirmation").style.display = 'block';
	apptDetails();
}

//function to convert the selected date, and time to the suitable ISO form
function apptDetails(){
	startDate = selected_date.split("/").reverse().join("-");
	start = startDate + " " + startHour + " UTC";
	startingdate = new Date(start);
	window.startTime = startingdate.toISOString();

	endingTime = new Date(startingdate.getTime()+ 30*60000);
	window.endTime = endingTime.toISOString();
	document.getElementById('serviceName').innerHTML = serviceName;
	document.getElementById('staffName').innerHTML = staffName;

	document.getElementById('appointmentTime').innerHTML = startDate + " " + startHour;
	document.getElementById('yourInfo').innerHTML = customerDetails.first_name +" "+ customerDetails.last_name;

}

//function call to create the appointment
function appointment() {
	var data = {"staff_key" : staffKey,
	          "service_key" : serviceKey,      
	          "customer_key" : customerKey,  
	          "start_time" : startTime,     
	          "end_time"  : endTime};
	
	$.ajax({
		type: "POST",
		url: "https://developer.setmore.com/api/v1/bookingapi/appointment/create",
		beforeSend: function(xhr) {
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader('Authorization', 'Bearer '+ window.access_token);
		},
		data:JSON.stringify(data),
		success: function (data){
			cust=data;
			console.log(data); 
			confirmed();
		}
	});
}

//function to create the datepicker form
function datepicker(serviceKey) {
	document.getElementById("service").style.display = 'none';
	document.getElementById("date").style.display = 'block';
	service=serviceKey.split(" ");
	window.serviceKey = service[0];
	window.serviceName = service[1];

	
	var node = document.createElement("p");
	
	node.value = "Date: ";
	
	var textBox = document.createElement("INPUT");
	textBox.setAttribute("type", "text");
	textBox.className = "text";
	textBox.id =  "datePicker1";
	node.appendChild(textBox);
	document.getElementById("datepicker").appendChild(node);  
	datePick();
	
}

//function to add the datepicker into the page
var datePick =   function() {   
	$( "#datePicker1" ).datepicker({
		beforeShowDay: $.datepicker.noWeekends,
		dateFormat: 'dd/mm/yy',
		onSelect   : slots
	});
} 

//function to show the appointment confirmed page
function confirmed(){
	document.getElementById("appointmentConfirmation").style.display = 'none';
	document.getElementById("appointmentConfirmed").style.display = 'block';
	document.getElementById('serviceN').innerHTML = serviceName;
	document.getElementById('staffN').innerHTML = staffName;

	document.getElementById('appointmentT').innerHTML = startDate + " " + startHour;
	document.getElementById('yourI').innerHTML = customerDetails.first_name +" "+ customerDetails.last_name;
}

//function to create the list 
function createList(clickFunc,list,id,name)
{
  	var node = document.createElement("LI");
  	node.class = "";
  	node.id =  id +" "+name;
  	node.className = "createdList";
  	var para = document.createElement("label");
  	para.id = id +" "+name;
  	var textnode = document.createTextNode(name);
  	para.appendChild(textnode);
  	node.appendChild(para);
  	node.onclick = function() { 
  		clickFunc(this.id);
  	};
  	document.getElementById(list).appendChild(node);  	
}

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="application/xhtml+xml; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Setmore API</title>
    <link rel="stylesheet" type="text/css" href="api.css">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script>
     
     </script>
  <body>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  	<script type="text/javascript" src="api.js"></script>
  	<script type="text/javascript" src="jqueryUI.js"></script>
    <h1>Setmore booking page</h1>
    
   	<div id="date" style = 'display:none'>
   	<h2>Select Date</h2>
   	<div id="datepicker">
   	</div>
   	<ul id="slotsList"></ul>
   	</div>
   	
   	<div id="service" style = 'display:none'>
   	<h2>Choose Service</h2>
    <ul id="serviceList"></ul>
   	</div>
   	
   	<div id="staff">
   	<h2>Choose Staff</h2>
    <ul id="staffList"></ul>
   	</div>
    
    
    
   	<div id ='customerForm' class = "contact" style = 'display:none'>
        <label id='customerHeader'> Enter your Information</label><br>
		<label id= "firstNameDiv" style="margin-right: 3px;">First Name*</label>:<input type="text" id='firstName' ><br>
		<label id ='lastNameDiv'>  Last  Name</label>:<input type ="text" id ='lastName' ><br>
		<label id='emailDiv' style="margin-right: -19px;">Email address*</label>:<input type = "text" id = "email" ><br>
		<input type="button" value ="Continue" id='customerSubmit' onclick="getCustomer()">
	</div>
	
	<div id = "appointmentConfirmation" class = "contact" style = 'display:none'>
 		<label>Appointment details</label><br>
  		<label style="padding-right: 22px;">Service Name</label>:<label id="serviceName"></label><br>
  		<label style="padding-right: 43px;">Staff Name</label>:<label id="staffName"></label><br>
  		<label style="padding-right: 0px;margin-right: 9px;">Appointment time</label>:<label id="appointmentTime"></label><br>
 		<label style="margin-right: 38px;">Your Info</label>:<label id="yourInfo"></label><br>
 		<label id="yourEmail"></label><br>
 		<input type="button" value ="confirm Booking" id='bookAppointment' onclick="appointment()"><br>
  	</div>
   
   	<div id = "appointmentConfirmed" class = "contact" style = 'display:none'>
   		<label>Appointment Confirmed!!!</label><br>
  		<label style="padding-right: 22px;">Service Name</label>:<label id="serviceN"></label><br>
  		<label style="padding-right: 43px;">Staff Name</label>:<label id="staffN"></label><br>
  		<label style="padding-right: 0px;margin-right: 9px;">Appointment time</label>:<label id="appointmentT"></label><br>
 		<label style="margin-right: 38px;">Your Info</label>:<label id="yourI"></label><br>
 		<label id="yourEmail"></label><br>
   	</div>
  </body>
</html>
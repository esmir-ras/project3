document.getElementById("myForm").addEventListener("submit", function(e){
    
    var username = document.getElementsByName("username")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var subject = document.getElementsByName("subject")[0].value;
    var message = document.getElementsByName("message")[0].value;
    var errorMessage = "";

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    emailChecked = re.test(email);

    if(username.length < 6){
      errorMessage = "Name should be more than 5 characters.\n";
      document.getElementsByClassName('nameError')[0].innerText = errorMessage;
    }else{
      document.getElementsByClassName('nameError')[0].innerText = "";
    }

    if(!emailChecked){
      errorMessage = "Must be a valid email address.\n";
      document.getElementsByClassName('emailError')[0].innerText = errorMessage;
    }else{
      document.getElementsByClassName('emailError')[0].innerText = "";
    }

    if(subject.length < 16){
      errorMessage = "Subject should be more than 15 characters.\n";
      document.getElementsByClassName('subjectError')[0].innerText = errorMessage;
    }else{
      document.getElementsByClassName('subjectError')[0].innerText = "";
    }

    if(message.length < 26){
      errorMessage = "Message should be more than 25 characters.\n";
      document.getElementsByClassName('messageError')[0].innerText = errorMessage;
    }else{
      document.getElementsByClassName('messageError')[0].innerText = "";
    }
    if(errorMessage != ""){
      e.preventDefault(); 
    }
    
  });
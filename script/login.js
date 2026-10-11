// console.log('login functionality');


document.getElementById ("sign-btn").addEventListener("click",function(){
    const nameInput = document.getElementById("input-name");
    const enterName = nameInput . value ;
     console.log(enterName);
const inputPin = document.getElementById("input-pin");
const pin = inputPin . value ;
console.log(pin);
if(enterName == "admin" && pin == "admin123" ){
    alert("signin success");
    window.location.assign("/home.html");
}else{
    alert("signin Failed");
    return;
}


})
// console.log('login functionality');


document.getElementById ("sign-btn").addEventListener("click",function(){
    const nameInput = document.getElementById("input-name");
    const enterName = nameInput . value ;
     
const inputPin = document.getElementById("input-pin");
const pin = inputPin . value ;

if(enterName == "admin" && pin == "admin123" ){
    alert("sign-in successfull");
    window.location.assign("./home.html");
}else{
    alert("sign-in Failed");
    return;
}


})
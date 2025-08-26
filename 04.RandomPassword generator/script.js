const passwordbox=document.getElementById("password");
const length=12;

const uppercase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase="abcdefghijklmnopqrstuvwxyz"

const specialchar="!@#$%^&*()_=+{}[];:',<.>/?~`|";
const number="0123456789";
const alchars=uppercase+lowercase+specialchar+number;
function genpass(){
    let password="";
    password+=uppercase[Math.floor(Math.random()*uppercase.length)];
    password+=lowercase[Math.floor(Math.random()*lowercase.length)];
    password+=specialchar[Math.floor(Math.random()*specialchar.length)];
    password+=number[Math.floor(Math.random()*number.length)];

    while(length>password.length){
        password+=alchars[Math.floor(Math.random()*alchars.length)];
    }
    passwordbox.value=password;

}

function copypass(){

    passwordbox.select();
    document.execCommand("copy");
    console.log("Password Copied");
    alert("Password copied to clipboard ")
    

}

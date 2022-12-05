const socket = io()
import axios from "axios";

const Signup = document.getElementById("Signup");
const Login = document.getElementById("login");

const SignupForm = Signup.querySelector("form")
const LoginForm = Login.querySelector("form")

function GoSignup(event){
    event.preventDefault()
    const inputID = SignupForm.querySelector("#SignupID")
    const inputPW = SignupForm.querySelector("#SignupPW")
    const confirmPW = SignupForm.querySelector("#confirmPW")
    if(inputID.value == ""){
        alert('아이디를 입력해주세요.')
    }
    if(inputPW.value == ""){
        alert('비밀번호를 입력해주세요')
    }
    if(confirmPW.value == ""){
        alert('비밀번호 확인란을 입력해주세요.')
    }
    if(inputPW.value !== confirmPW.value){
        alert('비밀번호와 비밀번호 확인란이 같지 않습니다.')
        inputPW.value == ""
        confirmPW.value == "" 
    }  
    axios({
        method:"POST",
        url:"http://localhost:3000/user/signup",
        data: {
            userId: inputID.value,
            password: inputPW.value,
            confirmPassword: confirmPW.value
        },        
    }).then(function(response){
        console.log(response)                
        alert("회원가입을 축하드립니다!")
        // window.location.replace("/")
        }
    )    

    // $.ajax({
    //     type:"POST",
    //     url:"/user/signup",
    //     dataType:'json',
    //     data:{
    //         userId: inputID.value,
    //         password: inputPW.value,
    //         confirmPassword: confirmPW.value            
    //     },        
    //     success: function (response) {
    //         console.log(response)                
    //         alert("회원가입을 축하드립니다!")
    //         // window.location.replace("/")            
    //     },
    //     error: function(response){
    //         if(response.status === 409){
    //             alert('이미 존재하는 아이디입니다.')
    //         }
    //     } 
    // })    
    inputID.value === ""
    inputPW.value === ""
    confirmPW.value === "" 
    console.log(inputID.value)
    console.log(inputPW.value) 
}

// function GoSignup(event){
      
// }

function GoLogin(event){
    event.preventDefault()
    const LoginID = LoginForm.querySelector("#LoginID")
    const LoginPW = LoginForm.querySelector("#LoginPW")
    LoginID.value = ""
    LoginPW.value = ""    
}

Signup.addEventListener("submit", GoSignup)
Login.addEventListener("submit", GoLogin)


// Socket Login

function setCookie(key, value, expiredays) {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays); // 현재 시각 + 일 단위로 쿠키 만료 날짜 변경
    //todayDate.setTime(todayDate.getTime() + (expiredays * 24 * 60 * 60 * 1000)); // 밀리세컨드 단위로 쿠키 만료 날짜 변경
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
    }

function getCookie(name) {
    const value = document.cookie.match(`(^|;)?${name}=([^;]*)(;|$)`);
    return value? value[2] : null;
    }




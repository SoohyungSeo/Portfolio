const Signup = document.getElementById("Signup");
const Login = document.getElementById("login");
// const SocialLogin = document.getElementById("SocialLogin")

const SignupForm = Signup.querySelector("form")
const LoginForm = Login.querySelector("form")
// const SocialLoginForm = SocialLogin.querySelector("form")


const cookie = document.cookie
console.log(cookie)

function GoSignup(event){
    event.preventDefault()
    const inputID = SignupForm.querySelector("#SignupID")
    const inputNickname = SignupForm.querySelector('#SignupNickname')
    const inputPW = SignupForm.querySelector("#SignupPW")
    const confirmPW = SignupForm.querySelector("#confirmPW")
    if(inputID.value == ""){
        alert('아이디를 입력해주세요.')
        event.preventDefault()
    }
    if(inputNickname.value == ""){
        alert('닉네임을 입력해주세요.')
        event.preventDefault();
    }
    if(inputPW.value == ""){
        alert('비밀번호를 입력해주세요')
        event.preventDefault()
    }
    if(confirmPW.value == ""){
        alert('비밀번호 확인란을 입력해주세요.');
        event.preventDefault();
    }  
    $.ajax({
        type:"POST",
        url:"/user/signup",
        dataType:'json',
        data:{
            userId: inputID.value,
            nickname: inputNickname.value,
            password: inputPW.value,
            confirmPassword: confirmPW.value            
        },        
        success: function (response) {           
            alert("회원가입을 축하드립니다!")
            window.location.href ='http://localhost:3000'         
        },
        error: function(jqXHR, textStatus, errorThrown){
            if(jqXHR.responseJSON["message"] === "이미 가입된 아이디입니다."){
                alert('이미 가입된 아이디입니다.')
                window.location.href ='http://localhost:3000'
            }
            if(jqXHR.responseJSON["message"] === "비밀번호와 비밀번호 확인란이 같지 않습니다."){
                alert('비밀번호와 비밀번호 확인란이 같지 않습니다.')
            }
            if(jqXHR.responseJSON["message"] === "아이디는 최소 4자리 최대 15자리입니다."){
                alert('아이디는 최소 4자리 최대 15자리입니다.')
            }
            if(jqXHR.responseJSON["message"] === "비밀번호는 최소 8자리 이상 30자리 미만입니다."){
                alert('비밀번호는 최소 8자리 이상 30자리 미만입니다.')
            }
            if(jqXHR.responseJSON["message"] === "이미 존재하는 닉네임입니다."){
                alert('이미 존재하는 닉네임입니다.')
            }
        } 
    });    
}

function GoLogin(event){
    event.preventDefault()
    const LoginID = LoginForm.querySelector("#LoginID")
    const LoginPW = LoginForm.querySelector("#LoginPW")
    $.ajax({
        type:"POST",
        url:"/user/login",        
        dataType:'json',
        data:{
            userId:LoginID.value,
            password:LoginPW.value
        },
        success: function(response){
            token = response.accessToken
            setCookie("Access",`Bearer ${token}`, 1)
            localStorage.setItem("Access",`Bearer ${token}`)
            localStorage.setItem("userId", response.data.userId)
            localStorage.setItem("nickname", response.data.nickname)
            alert('로그인 되었습니다.')
            window.location.href = 'http://localhost:3000/index'
        },
        error: function(jqXHR, textStatus, errorThrown){
            if(jqXHR.responseJSON["message"] === "아이디가 없거나 옳바르지 않습니다."){
                alert('아이디가 없거나 옳바르지 않습니다.')
            }
            if(jqXHR.responseJSON["message"] === "비밀번호가 옳바르지 않습니다."){
                alert('비밀번호가 옳바르지 않습니다.')
            }
        }
    })   
}

// function GoKakao(event){
//     window.location.href = 'http://localhost:3000/auth/kakao'}

// const kakaoButton = SocialLoginForm.querySelector("#kakao")
// console.log(kakaoButton)

Signup.addEventListener("submit", GoSignup)
Login.addEventListener("submit", GoLogin)
// kakaoButton.addEventListener("click", GoKakao)

//cookie Logic
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




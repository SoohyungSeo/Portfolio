const socket = io();

const Logout = document.getElementById("Logout")
const userinfo = document.getElementById("userInfo")
const Chat = document.getElementById("Chat");

const cookie = document.cookie
if(cookie === ""){
    alert('로그인 후 이용가능합니다')
    window.location.href = 'http://localhost:3000'
}
const [cookie1, cookie2] = cookie.split("=")
const [cookie3, cookie4] = cookie2.split("%20")
const token = `${cookie3} ${cookie4}`

function GoLogout(){
    $.ajax({
        type:"get",
        url:"/user/logout",
        headers: {
            'Authorization': token
        },        
        data:{},
        success: function(res){
            deleteCookie("Access")
            localStorage.removeItem("Access")
            localStorage.removeItem("userId")
            localStorage.removeItem("nickname")
            alert('로그아웃 되었습니다.')
            window.location.href ='http://localhost:3000'
        }
    })    
}

function GoUserInfo(){
    $.ajax({
        type:"get",
        url:"/user/mypage",
        headers: {
            'Authorization' : token
        },
        data:{},
        success: function(res){
            window.location.href = 'http://localhost:3000/mypage'
        }
    })
}

function GoChat(){   
    window.location.href = 'http://localhost:3000/chat'       
}
const chatButton = Chat.querySelector("#gochat")
const LogoutButton = Logout.querySelector("#GoLogout")
const userInfoButton = userinfo.querySelector("#GouserInfo")

LogoutButton.addEventListener("click", GoLogout)
userInfoButton.addEventListener("click", GoUserInfo)
chatButton.addEventListener("click", GoChat)


function deleteCookie(name){
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';    
}
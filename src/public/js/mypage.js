const userInfo = document.getElementById("userInfo")
const GoBack = document.getElementById("GoBack")
const BackButton = document.querySelector("#backButton")

const userId = localStorage.getItem("userId")
const userNickname = localStorage.getItem("nickname")

const cookie = document.cookie
if(cookie === ""){
    alert('로그인 후 이용가능합니다')
    window.location.href = 'http://localhost:3000'
}
const [cookie1, cookie2] = cookie.split("=")
const [cookie3, cookie4] = cookie2.split("%20")
const token = `${cookie3} ${cookie4}`

const id = userInfo.querySelector("#ID")
const nickname = userInfo.querySelector("#nickname");
id.innerText = `ID : ${userId}`
nickname.innerText = `Nickname : ${userNickname}`

function GoBackPage(){
    window.location.href = 'http://localhost:3000/index'
}

BackButton.addEventListener("click", GoBackPage)

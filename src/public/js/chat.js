const socket = io();

//쿠키가 없으면 페이지 입장 불가
const cookie = document.cookie
if(cookie === ""){
    alert('로그인 후 이용가능합니다')
    window.location.href = 'http://localhost:3000'
}
const [cookie1, cookie2] = cookie.split("=")
const [cookie3, cookie4] = cookie2.split("%20")
const token = `${cookie3} ${cookie4}`

const back = document.getElementById('back');
const Room = document.getElementById('Room')

const Roomform = document.querySelector('form')

function GoBackSite(){
    window.location.href = 'http://localhost:3000/index'
}

function RoomnameSubmit(event){
    event.preventDefault();
    const input = Roomform.querySelector("input");
    socket.emit("enter_room", input.value)
    console.log(input.value)
    input.value=""
}

const backButton = back.querySelector('#Goback');
backButton.addEventListener("click", GoBackSite);
Roomform.addEventListener("submit", RoomnameSubmit);

socket.on("connection", () => {
    console.log('socket on')
})
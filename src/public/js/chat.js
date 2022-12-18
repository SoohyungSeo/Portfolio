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

const Lobby = localStorage.getItem("Lobby")

const back = document.getElementById('back');
const Room = document.getElementById('Room');
const nickname = localStorage.getItem('nickname');
const LobbyChat = document.getElementById('Allchatting');
const inputChat = document.getElementById('inputChat');


const inputChatForm = inputChat.querySelector('form')
const Roomform = Room.querySelector('form')

const backButton = back.querySelector('#Goback');
const Chatting = inputChat.querySelector('#Chat');
const GoLobby = back.querySelector('#LobbyChat');
const ChatLog = LobbyChat.querySelector('#chatLog')
const SendMessage = inputChatForm.querySelector('#enterChat')
const exitLobbyButton = back.querySelector('#exitLobby');
const h3 = LobbyChat.querySelector('h3')
const h4 = LobbyChat.querySelector('h4')

SendMessage.addEventListener("click", SendChat);
backButton.addEventListener("click", GoBackSite);
Roomform.addEventListener("submit", RoomnameSubmit);
GoLobby.addEventListener("click", joinLobby);
exitLobbyButton.addEventListener("click", exitLobby)

GoLobby.hidden = false;
exitLobbyButton.hidden = true;

function SendChat(event){
    event.preventDefault();
    socket.emit("send Message", Chatting.value, Lobby, h4.innerText)
    Chatting.value=""
}

function GoBackSite(){
    window.location.href = 'http://localhost:3000/index'
}

function RoomnameSubmit(event){
    event.preventDefault();
    const input = Roomform.querySelector("input");
    socket.emit("enter_room", input.value, nickname);
    input.value=""
}

function joinLobby(event){
    event.preventDefault(); 
    $.ajax({
        type:"get",
        url:"/chat/member",
        headers:{
            'Authorization' : token
        },
        data:{},
        success: function(res){
            h4.innerText = res.data.nickname
            socket.emit("join Lobby", {room:"Lobby"}, h4.innerText);
            console.log(h4.innerText)
            localStorage.setItem("Lobby", 'Lobby')
            h3.innerText = "Lobby"            
        }
    }) 
       
}

function exitLobby(event){
    event.preventDefault();
    socket.emit("exit Lobby", {room:"Lobby"}, h4.innerText)
    localStorage.removeItem("Lobby")
    h3.innerText = ""
}

socket.on("welcome Message", (nickname) => {
    ChatLog.append("[Notice] :"+ nickname +"님이 입장하였습니다.\n")
    $('#chatLog').scrollTop($('#chatLog')[0].scrollHeight);
    GoLobby.hidden = true;
    exitLobbyButton.hidden = false;
})

socket.on("alert leave lobby", (roomname) => {
    alert('Lobby 에서 나갔습니다.')
    GoLobby.hidden = false;
    exitLobbyButton.hidden = true;
})

socket.on("receive Message", (message, nickname) => {
    ChatLog.append(nickname+":"+message+'\n')
    $('#chatLog').scrollTop($('#chatLog')[0].scrollHeight);    
})

socket.on("send Exit Message", (nickname) => {
    ChatLog.append("[Notice] :"+nickname+"님이 나갔습니다\n")
    $('#chatLog').scrollTop($('#chatLog')[0].scrollHeight);
})





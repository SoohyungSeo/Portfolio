const Logout = document.getElementById("UserInfor")

function GoLogout(){
    $.ajax({
        type:"get",
        url:"/user/logout",
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

Logout.addEventListener("click", GoLogout)

function deleteCookie(name){
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';    
}
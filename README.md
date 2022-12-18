# 개인 프로젝트
팀 프로젝트 등 여러 프로젝트를 진행하면서 내가 써보지 못한 기술들이나, 해보고 싶은 기술을 구현해보기 위해 만든 프로젝트입니다.
- **로그인** 및 **소셜로그인** 기능이 있으며, 다른사람들 모두와 Lobby 채팅방에서 채팅을 할 수도 있고, 따로 방을 만들어 채팅을 할 수도 있습니다.
- 화상채팅을 원하는 사람들을 위해 **webRTC**를 사용하여 1:1 화상채팅 기능을 넣을 예정입니다. 추후에 1:N 으로 화상채팅이 가능하게 **SFU 방식**으로 서버를 구현할 예정입니다.
- 배포는 **EC2**로 서버를 구축하고 **NginX**를 사용하여 **HTTPS 인증서**를 발급 받을 예정이며, 추가적으로 **분산 처리 및 부하**를 줄이기 위해 **Proxy pass**를 넣을 예정입니다.
- 웹서버의 보안을 위해 **Helmet**의 미들웨어들을 사용하여 좀 더 보안에 신경 쓸 예정입니다 
- **Artillery** 로 성능, 부하 및 스트레스 테스트를 진행하고 테스트 기반으로 성능 개선 및 보완 예정입니다.

## 파일구조
```
├── controllers
│       ├── chat.js
│       └── users.js
├── middleware
│       └── auth-middleware.js
├── node_modules
├── repositories
│       ├── chat.js
│       └── users.js
├── routes
│       ├── chat.router.js
│       ├── index.js
│       └── users.router.js
├── schema
│       ├── index.js
│       ├── room.js
│       ├── users.js
│       └── chat-socket.js
├── services
│       ├── chat.js
│       └── user.js
├── src  
│   │   
│   ├── public
│   │   ├── js
│   │   │    ├── chat.js
│   │   │    ├── chatroom.js
│   │   │    ├── home.js
│   │   │    ├── index.js
│   │   │    ├── mypage.js
│   │   │    └── rtc.js
│   │   ├── static
│   │   │    ├── googleLoginButton.png
│   │   │    ├── kakaobutton.png
│   │   │    └── naverbutton.png
│   │   └── style
│   │        └── stylesheet.js
│   │   
│   ├── views
│   │   ├── chat.pug
│   │   ├── chatroom.pug
│   │   ├── home.pug
│   │   ├── index.pug
│   │   ├── mypage.pug
│   │   └── webRTC.pug
│   ├── server.js
│   └── socket.js
├── .gitignore  
├── babel.config.json   
├── nodemon.json
├── package-lock.json       
└── package.json     
```
## 기술

⭕ : 구현완료
❗ : 진행중
❌ : 구현예정

| 구현 여부 | 구현 기술 | 기술 내용 |
|:---------:|:---------:|:--------:|
|⭕| Express | REST API를 위해 구현 |
|⭕| PUG , ajax | 프론트 구축 및 서버와 클라이언트 간의 API 통신 구현 |
|⭕| JsonWebToken | Access, Refresh 토큰 구현 |
|⭕| bcrypt | Salt 값을 주어 비밀번호 Hash화하여 저장 |
|⭕| PASSPORT | 로그인 및 DB까지 저장되지만 Token을 Cookie 방식이 아닌 Session 방식 후 다시 구현예정 |
|❗| Socket.IO | 기본적인 채팅만 구현. 방 설정과 채팅 저장 등 추가 기능 구현 예정 |
|❌| AWS S3 | 채팅 시 사진 등 이미지를 올릴 수 있게 구현 예정 |
|❌| webRTC | 1:1화상 채팅을 Peer to Peer 서버로 구현 예정. 추후에 1:N 채팅을 SFU 방식인 MediaSoup 으로 구현 예정 |
|❌| NginX | 서버 배포 후 분산처리 및 부하를 줄이기 위해 NginX 사용 예정 |
|❌| Helmet | 웹 서버 보안을 위해 hidePoweredBy, HSTS, noSniff, frameguard, sxxFilter 등 미들웨어 구현 예정 |
|❌| Artillery | 성능, 부하, 스트레스 테스트 및 테스트 기반으로 성능 개선 예정 |




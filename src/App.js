import logo from './logo.svg';
import './App.css';

const onNaverLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/naver"
}

const onGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google"
}

const onKakaoLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao"
}
const getData = () => {
    fetch("http://localhost:8080/my", {
        method: "GET",
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            alert(data)
        })
        .catch((error) => alert(error))
}

function App() {
  return (
      <>
          <button onClick={onNaverLogin}>NAVER LOGIN</button>
          <button onClick={onGoogleLogin}>GOOGLE LOGIN</button>
          <button onClick={onKakaoLogin}>KAKAO LOGIN</button>
      </>
  );
}

export default App;

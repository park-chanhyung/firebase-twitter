import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";
import PhoneLogin from "./routes/phonelogin";

//라우터 설정 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: 
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>,
      },
      {
        path: "profile",
        element: 
        // <ProtectedRoute>
        <Profile />
        // </ProtectedRoute>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/phonelogin",
    element: <PhoneLogin />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

// 스타일 
const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const[isLoading,setLoading] = useState(true);
  const init = async() => {
    // firebase를 통해서 로그인 여부 확인  
    //authStateReady  : 인증상태가 준비되었는지 기다림  -> 쿠키와 토큰을 읽고 백엔드와 소통해서 로그인여부를 확인하는 동안 기다림 
    await auth.authStateReady();
    // 파이어베이스 로딩 코드   true면 loading  false면 router
    setLoading(false);
  };

  // useEffect 사용해서 초기화 
  useEffect(()=>{
    init();
  },[]);

  return (
        <Wrapper>     
          <GlobalStyles />
        {/* isLoading 상태에 따라 로딩 스크린 또는 라우터를 렌더링 */}
      {isLoading ? <LoadingScreen/> : <RouterProvider router={router}/>}
        </Wrapper>

  );
}

export default App;
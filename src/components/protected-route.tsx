import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
/*
    로그인한 사용자는 protected route를 볼 수 있고 
    로그인하지 않은 경우 로그인 또느 조인페이지로 
*/
export default function ProtectedRoute({
    // children은 해당 보호된 라우트 컴포넌트의 자식 요소들을 나타낸다
    children,
}: {

    // children 속성타입=React.ReactNode 
    //컴포넌트가 렌더링할 수 있는 모든 React 요소들의 유형 포함
    children: React.ReactNode;
}) {

    // 유저 체크  null이면 login 
    const user = auth.currentUser;
    if(user === null){
        return <Navigate to="/login" />;
    }
    return children;
}
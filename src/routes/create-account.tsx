import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

//CSS 
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export default function CreateAccount() {
    // 계정 생성을 시작할때 loading을 true로 바꿈  초기값 false
    // name, email, passsword 받은값 저장 
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    //이벤트에서 target의 name을 추출
    // name 값이 인풋의name과 같다면 setName  password / email 동일 
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
        target: { name, value },
    } = e;
    
    if (name === "name") {
        setName(value);
    } else if (name === "email") {
        setEmail(value);
    } else if (name === "password") {
        setPassword(value);
    }
};
//
const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //isLoading 이 참일때 name,email.password가 비어있으면 리턴   
    if(isLoading || name ===""|| email===""||password==="") return;
    try {
      //아이디 설정
      //유저 프로필 설정
      //홈페이지 리다이렉트 
      //isloading 을 가져와서 value 변경 

      //createUserWithEmailAndPassword  파이어베이스 인증 인스턴스 사용 
      // 로그인하면 자격받고 로그인 
    setLoading(true);
    const credentials = await createUserWithEmailAndPassword(auth,email,password);
    await updateProfile(credentials.user,{
        displayName: name,
    });
        navigate("/");
    } 
    catch (e) {
    // 이미 존재하는 계정이거나 패스워드가 유효하지않으면 실패

    } finally {
        setLoading(false);
    }
};
return (
    <Wrapper>
    <Title>Silgobi Join 𝕏</Title>
    {/* Form 창 */}
    <Form onSubmit={onSubmit}>
        <Input
            onChange={onChange}
            name="name"
            value={name}
            placeholder="Name"
            type="text"
            required
        />
        <Input
            onChange={onChange}
            name="email"
            value={email}
            placeholder="Email"
            type="email"
            required
        />
        <Input
            onChange={onChange}
            value={password}
            name="password"
            placeholder="Password"
            type="password"
            required
        />
        {/* isLoading값에 따라  submit값을 바꿈 
            true면Loading false면 Create Account 
        */}
        <Input
            type="submit"
            value={isLoading ? "Loading..." : "Create Account"}
        />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
    );
}

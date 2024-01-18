import styled from "styled-components";
import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <Wrapper>
      <Form onSubmit={onLogin}>
        <Header>Log in to Blogs List</Header>
        <InputField>
          username
          <input
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            name="username"
          />
        </InputField>
        <InputField>
          password
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            value={password}
            name="password"
          />
        </InputField>
        <Button type="submit">login</Button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  min-width: 350px;
  height: 50%;
  min-height: 300px;
  gap: 1rem;
  border: 2px solid grey;
  border-radius: 8px;
  background-color: whitesmoke;
`;

const Header = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 275px;
`;

const Button = styled.button`
  width: 275px;
  height: 50px;
`;

export default LoginForm;

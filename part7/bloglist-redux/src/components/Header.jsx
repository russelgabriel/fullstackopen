import styled from "styled-components";

const Header = ({ user, handleLogout }) => {
  return (
    <Wrapper>
      <Spacer />
      <Title>Blogs List</Title>
      <UserLogout>
        Hello, {user.name}
        <Button onClick={handleLogout}>logout</Button>
      </UserLogout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-area: header;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  justify-items: center;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem 1.5rem;
  background: radial-gradient(circle at center, #f0f0f0, #c1d2d6);
  border-bottom: 1px solid black;
`;

const UserLogout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
`;

const Spacer = styled.div``;

const Button = styled.button`
  width: 100px;
  font-size: 0.75rem;
`;

export default Header;

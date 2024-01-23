import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setUser } from "../redux/reducers/userReducer";

const Header = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)

	const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUser(null))
  };

	const userLogout = () => {
		return (
			<UserLogout>
				Hello, {user.name}
				<Button onClick={handleLogout}>logout</Button>
			</UserLogout>
		)
	}

  return (
    <Wrapper>
      <NavLinks>
				<Link to="/">Home</Link>
				<Link to="/users">Users</Link>
			</NavLinks>
      <Title>Blogs List</Title>
			{user
				?	userLogout()
				: <Link to="/login" >Login</Link>
			}
    </Wrapper>
  );
};

const NavLinks = styled.nav`
	width: 100%;
	display: flex;
	gap: 8px;
`

const Wrapper = styled.div`
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

const UserLogin = styled.div`

`

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

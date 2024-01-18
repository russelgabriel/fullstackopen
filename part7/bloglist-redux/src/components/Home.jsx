import styled from "styled-components";
import { useDispatch } from "react-redux";

import { setNotification } from "../redux/reducers/notificationReducer";
import blogService from "../services/blogs";

import Blogs from "./Blogs";
import Header from "./Header";
import NewBlogForm from "./NewBlogForm";

// 720px is the breakpoint for mobile devices

const Home = ({ user, handleLogout }) => {
	const dispatch = useDispatch();

  return (
    <GridContainer>
      <Header user={user} handleLogout={handleLogout} />
      <Blogs
        user={user}
      />
      <NewBlogForm />
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "form content"
    "footer footer";
`;

export default Home;

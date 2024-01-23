import styled from "styled-components";

import Blogs from "../components/Blogs";
import NewBlogForm from "../components/NewBlogForm";

// 720px is the breakpoint for mobile devices

const HomeView = () => {

  return (
    <GridContainer>
      <Blogs />
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

export default HomeView;

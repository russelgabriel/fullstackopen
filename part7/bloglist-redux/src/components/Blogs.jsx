import { useSelector, useDispatch } from "react-redux";

import { deleteBlog } from "../redux/reducers/blogsReducer";
import { setNotification } from "../redux/reducers/notificationReducer";

import Blog from "./Blog";
import styled from "styled-components";

const Blogs = ({ user }) => {
	const dispatch = useDispatch()
	let blogs = useSelector(state => state.blogs)
	blogs = [...blogs].sort((a, b) => b.likes - a.likes)

	const handleDeleteBlog = async (blog) => {
    try {
      if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        return;
      }
			dispatch(deleteBlog(blog.id))
			const notificationConfig = {
				message: `Removed ${blog.title} by ${blog.author}`,
				type: 'success',
				timeout: 5,
			}
			dispatch(setNotification(notificationConfig))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper className="blogs-container">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleDeleteBlog={() => handleDeleteBlog(blog)}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  background: whitesmoke;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
  margin: 1.5rem;
`;

export default Blogs;

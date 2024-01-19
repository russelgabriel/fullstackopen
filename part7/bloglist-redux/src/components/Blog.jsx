import styled from "styled-components";

import Togglable from "./Togglable";

const Blog = ({ blog, user, handleLikeBlog, handleDeleteBlog }) => {
	const onLike = () => {
		handleLikeBlog(blog)
	}

	const onDelete = () => {
		handleDeleteBlog(blog)
	}
  return (
    <BlogCard className="blog">
      <div className="shown-content">
        <h2>{blog.title}</h2>
        <p>
          by <i>{blog.author}</i>
        </p>
      </div>
      <Togglable buttonLabel="view" className="hidden-content">
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes}
          <button onClick={onLike}>like</button>
        </p>
        <p>added by {blog.user.name}</p>
        {user.username === blog.user.username ? (
          <DeleteButton onClick={onDelete}>
            remove
          </DeleteButton>
        ) : null}
      </Togglable>
    </BlogCard>
  );
};

const BlogCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 0 4px 0 grey;
  gap: 0.5rem;

  & > h2 {
    font-size: 1.25rem;
  }

  & p {
    font-size: 0.8rem;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;

export default Blog;

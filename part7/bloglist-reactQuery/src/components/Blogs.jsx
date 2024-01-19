import styled from "styled-components";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { useNotificationDispatch } from "../context/NotificationContext";
import { setNotification } from "../context/NotificationContext";
import blogService from "../services/blogs";

import Blog from "./Blog";

const Blogs = ({ user }) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const previousBlogs = queryClient.getQueryData(["blogs"]);
      const updatedBlogs = previousBlogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      queryClient.setQueryData(["blogs"], updatedBlogs);
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
		onMutate: (blogToDelete) => {
      const previousBlogs = queryClient.getQueryData(["blogs"]);
      const updatedBlogs = previousBlogs.filter(
        (blog) => blog.id !== blogToDelete.id
      );
      queryClient.setQueryData(["blogs"], updatedBlogs);
		},
    onSuccess: () => {
			notificationConfig = {
				message: "Blog successfully deleted",
				type: "success",
				timeout: 5
			}
			notificationDispatch(setNotification(notificationConfig));
    },
		onError: (error, blogToDelete, context) => {
			queryClient.setQueryData(["blogs"], context.previousBlogs);
			notificationConfig = {
				message: "Error deleting blog",
				type: "error",
				timeout: 5
			}
			notificationDispatch(setNotification(notificationConfig));
		}
  });

  const handleLikeBlog = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlogMutation.mutate(updatedBlog);
  };

  const handleDeleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog);
    }
  };

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  if (result.isLoading) {
    return <Wrapper>Loading...</Wrapper>;
  }

  if (result.isError) {
    return <Wrapper>Error fetching blogs</Wrapper>;
  }

  const blogs = result.data.sort((a, b) => b.likes - a.likes);

  return (
    <Wrapper>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLikeBlog={handleLikeBlog}
          handleDeleteBlog={handleDeleteBlog}
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

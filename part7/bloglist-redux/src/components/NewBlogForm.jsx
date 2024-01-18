import styled from "styled-components";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { addBlog } from "../redux/reducers/blogsReducer";
import { setNotification } from "../redux/reducers/notificationReducer";

import Togglable from "./Togglable";

const NewBlogForm = () => {
	const dispatch = useDispatch()
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const togglableRef = useRef();


  const onSubmit = (event) => {
    event.preventDefault();
		const blog = {
			title,
			author,
			url,
		};
		const notificationConfig = {
			message: `A new blog ${title} by ${author} added`,
			type: 'success',
			timeout: 5,
		}
		dispatch(addBlog(blog))
		dispatch(setNotification(notificationConfig))
    setTitle("");
    setAuthor("");
    setUrl("");
    togglableRef.current.toggleVisibility();
  };

  return (
    <Wrapper>
      <Togglable buttonLabel="Add blog" ref={togglableRef}>
        <Form onSubmit={onSubmit}>
          <h2>Add blog</h2>
          <InputField>
            <label htmlFor="title">Title</label>
            <StyledInput
              type="text"
              id="title"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </InputField>
          <InputField>
            <label htmlFor="author">Author</label>
            <StyledInput
              type="text"
              id="author"
              onChange={(event) => setAuthor(event.target.value)}
              value={author}
            />
          </InputField>
          <InputField>
            <label htmlFor="URL">URL</label>
            <StyledInput
              type="text"
              id="URL"
              onChange={(event) => setUrl(event.target.value)}
              value={url}
            />
          </InputField>
          <InputField>
            <Button type="submit">Add</Button>
          </InputField>
        </Form>
      </Togglable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-area: form;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 1.5rem;
  height: fit-content;
  background: whitesmoke;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;

  & > h2 {
    margin-bottom: 1rem;
  }
`;

const InputField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: clamp(100px, 100%, 360px);
`;

const StyledInput = styled.input`
  width: clamp(100px, 75%, 275px);
`;

const Button = styled.button`
  width: 100%;
  font-size: 1rem;
`;

export default NewBlogForm;

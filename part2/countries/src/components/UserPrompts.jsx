import styled from "styled-components"

const UserPrompts = ({ userPrompts }) => {

  if (!userPrompts) return null

  return (
    <Wrapper>
      {userPrompts}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 60%;
  margin: 50px auto 0;
  background-color: #f5f5f5;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`
  


export default UserPrompts
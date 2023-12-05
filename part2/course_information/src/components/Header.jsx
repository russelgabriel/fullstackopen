import styled from 'styled-components'

const Header = ({ name }) => {
  return <StyledHeader>{name}</StyledHeader>
}

const StyledHeader = styled.h1`
  font-size: 1.5em;
  color: palevioletred;
`

export default Header
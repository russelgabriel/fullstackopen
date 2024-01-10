import styled from 'styled-components'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <NotiWrapper className='notification'>
      {message}
    </NotiWrapper>
  )
}

const NotiWrapper = styled.div`
  
`

export default Notification
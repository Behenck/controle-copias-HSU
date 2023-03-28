import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 45rem;
  padding: 0 0.5rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
`

export const Ellipsis = styled.p`
  padding-top: 1rem;
  color: ${(props) => props.theme['gray-100']};
  width: 2rem;
  text-align: center;
`

export const Box = styled.p`
  display: flex;
  gap: 0.5rem;
`
const ButtonStyle = styled.button`
  border: none;
  font-size: 0.875rem;
  width: 2rem;
  border-radius: 8px;
  color: ${(props) => props.theme['gray-100']};
  transition: brightness 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`
export const ButtonDisabled = styled(ButtonStyle)`
  background-color: ${(props) => props.theme['gray-400']};
`
export const Button = styled(ButtonStyle)`
  background-color: ${(props) => props.theme['blue-700']};
`

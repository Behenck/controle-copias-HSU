import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'

export const Button = styled(Dialog.Trigger)`
  background-color: transparent;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${(props) => props.theme['gray-300']};
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme['gray-100']};
  }
`

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
`
export const Select = styled.select`
  width: 100%;
  padding: 1rem;
  background: ${(props) => props.theme['gray-500']};
  color: var(--gray-300);
  border-radius: 8px;
  border: none;
  font-size: 1.125rem;
`

export const Content = styled(Dialog.Content)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 32rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme['gray-600']};
  border-radius: 8px;
  padding: 1rem;

  form {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-direction: column;

    div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 1rem;
    }
  }

  input {
    border: none;
    padding: 0.875rem 1rem;
    border-radius: 6px;
    color: ${(props) => props.theme['gray-200']};
    background-color: ${(props) => props.theme['gray-500']};
    font-size: 1.2rem;
  }
`

export const Title = styled(Dialog.Title)`
  color: ${(props) => props.theme['gray-200']};
`
export const Description = styled(Dialog.Description)`
  color: ${(props) => props.theme['gray-300']};
`

export const Cancel = styled(Dialog.Close)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${(props) => props.theme['gray-400']};
  color: ${(props) => props.theme.white};
  cursor: pointer;
  transition: brightness 0.2s;
  border: none;
  width: 6rem;
  height: 2.5rem;

  &:hover {
    filter: brightness(0.9);
  }
`
export const ButtonAction = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${(props) => props.theme['blue-700']};
  color: ${(props) => props.theme.white};
  cursor: pointer;
  transition: brightness 0.2s;
  border: none;
  width: 6rem;
  height: 2.5rem;

  &:hover {
    filter: brightness(0.9);
  }
`

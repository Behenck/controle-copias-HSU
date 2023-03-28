import styled from 'styled-components'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

export const Overlay = styled(AlertDialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
`
export const Content = styled(AlertDialog.Content)`
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

  div {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 1rem;
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

export const Button = styled(AlertDialog.Trigger)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  border-radius: 0 6px 6px 0;
  background-color: ${(props) => props.theme['red-500']};
  color: ${(props) => props.theme.white};
  cursor: pointer;
  transition: background 0.2s;
  border: none;

  &:hover {
    background-color: ${(props) => props.theme['red-600']};
  }
`

export const Title = styled(AlertDialog.Title)`
  color: ${(props) => props.theme['gray-200']};
`
export const Description = styled(AlertDialog.Description)`
  color: ${(props) => props.theme['gray-300']};
`

export const Cancel = styled(AlertDialog.Cancel)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${(props) => props.theme['gray-400']};
  color: ${(props) => props.theme.white};
  cursor: pointer;
  transition: background 0.2s;
  border: none;
  width: 6rem;
  height: 2.5rem;

  &:hover {
    background-color: ${(props) => props.theme['gray-500']};
  }
`
export const ButtonAction = styled(AlertDialog.Action)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${(props) => props.theme['red-500']};
  color: ${(props) => props.theme.white};
  cursor: pointer;
  transition: background 0.2s;
  border: none;
  width: 6rem;
  height: 2.5rem;

  &:hover {
    background-color: ${(props) => props.theme['red-600']};
  }
`

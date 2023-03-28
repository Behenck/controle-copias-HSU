import styled from 'styled-components'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;

  width: 25rem;
  background-color: ${(props) => props.theme['gray-400']};
  border-radius: 8px;
  width: 100%;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`

export const Key = styled.button`
  border: none;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme['gray-600']};
  border-radius: 8px;
  padding: 1rem 1.3rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme['gray-700']};
  }
`

export const DropdownMenuArrow = styled(DropdownMenu.DropdownMenuArrow)`
  fill: ${(props) => props.theme['gray-400']};
`

export const KeyBackspace = styled(Key)`
  width: 100%;
`

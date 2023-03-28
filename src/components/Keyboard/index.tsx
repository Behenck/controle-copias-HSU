import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Backspace } from 'phosphor-react'
import { Container, DropdownMenuArrow, Key, KeyBackspace, Row } from './styled'

interface KeyboardProps {
  onSetNumberOfCopies: (value: string) => void
}

export function Keyboard({ onSetNumberOfCopies }: KeyboardProps) {
  function setValueKeyboard(value: string) {
    onSetNumberOfCopies(value)
  }

  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content>
        <Container>
          <Row>
            <Key type="button" onClick={() => setValueKeyboard('7')}>
              7
            </Key>
            <Key type="button" onClick={() => setValueKeyboard('8')}>
              8
            </Key>
            <Key type="button" onClick={() => setValueKeyboard('9')}>
              9
            </Key>
          </Row>

          <Row>
            <Key type="button" onClick={() => setValueKeyboard('4')}>
              4
            </Key>
            <Key type="button" onClick={() => setValueKeyboard('5')}>
              5
            </Key>
            <Key type="button" onClick={() => setValueKeyboard('6')}>
              6
            </Key>
          </Row>

          <Row>
            <Key type="button" onClick={() => setValueKeyboard('1')}>
              1
            </Key>
            <Key type="button" onClick={() => setValueKeyboard('2')}>
              2
            </Key>
            <Key type="button" onClick={() => setValueKeyboard('3')}>
              3
            </Key>
          </Row>

          <Row>
            <Key type="button" onClick={() => setValueKeyboard('0')}>
              0
            </Key>
            <KeyBackspace
              type="button"
              onClick={() => setValueKeyboard('backspace')}
            >
              <Backspace size={20} />
            </KeyBackspace>
          </Row>
        </Container>

        <DropdownMenuArrow />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  )
}

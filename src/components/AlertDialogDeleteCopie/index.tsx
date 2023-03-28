import { api } from '@/services/api'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { ReactNode, useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  Button,
  Cancel,
  Content,
  Description,
  Overlay,
  ButtonAction,
  Title,
} from './styles'

interface AlertDialogDeleteCopieProps {
  id: string
  children: ReactNode
  fetchCopies: () => void
}

export function AlertDialogDeleteCopie({
  children,
  id,
  fetchCopies,
}: AlertDialogDeleteCopieProps) {
  const [password, setPassword] = useState('')

  async function handleDeleteCopie() {
    if (password === 'minhocagorda') {
      try {
        await api.post('/DeleteCopie', { id })
        fetchCopies()
        toast.success('Registro excluído com sucesso')
      } catch (err) {
        console.log(err)
      }
      setPassword('')
    } else {
      toast.error('Senha incorreta!')
      setPassword('')
    }
  }

  return (
    <AlertDialog.Root>
      <Button>{children}</Button>
      <AlertDialog.Portal>
        <Overlay />
        <Content>
          <Title>Deseja realmente excluir?</Title>
          <Description>
            Essa ação excluirá esse registro para sempre!
          </Description>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <Cancel>Cancelar</Cancel>
            <ButtonAction type="button" onClick={handleDeleteCopie}>
              Excluir
            </ButtonAction>
          </div>
        </Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

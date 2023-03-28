import axios from 'axios'
import fileDownload from 'js-file-download'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import {
  Button,
  ButtonAction,
  Cancel,
  Content,
  Description,
  Overlay,
  Select,
  Title,
} from './styles'

const ReportFormSchema = z.object({
  year: z.string(),
  month: z.string(),
})

type ReportFormInputs = z.infer<typeof ReportFormSchema>

interface ReportProps {
  children: ReactNode
}

export function Report({ children }: ReportProps) {
  async function handleReportDownload(data: ReportFormInputs) {
    const { year, month } = data
    let filename = 'copies.xlsx'
    try {
      await axios({
        url: '/api/ReportCopies',
        method: 'POST',
        responseType: 'blob',
        data: {
          year,
          month,
        },
      }).then((response) => {
        const disposition = response.headers['content-disposition']
        if (disposition && disposition.indexOf('attachment') !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
          const matches = filenameRegex.exec(disposition)
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '')
          }
        }
        fileDownload(response.data, filename)
      })
    } catch (err) {
      console.log(err)
      toast.error('Não foi possível gerar o relatório!')
    } finally {
      toast.success('Relatório gerado com sucesso!')
    }
  }

  const { register, handleSubmit } = useForm<ReportFormInputs>({
    resolver: zodResolver(ReportFormSchema),
  })

  return (
    <Dialog.Root>
      <Button>{children}</Button>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Title>Download relatório</Title>
          <Description>
            Coloque o mês e o ano desejado para fazer o download do arquivo
            excel com todos os dados.
          </Description>

          <form onSubmit={handleSubmit(handleReportDownload)}>
            <div>
              <Select {...register('month')}>
                <option value="01">Janeiro</option>
                <option value="02">Fevereiro</option>
                <option value="03">Março</option>
                <option value="04">Abril</option>
                <option value="05">Maio</option>
                <option value="06">Junho</option>
                <option value="07">Julho</option>
                <option value="08">Agosto</option>
                <option value="09">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </Select>
              <Select {...register('year')}>
                <option value="2023">2023</option>
              </Select>
            </div>

            <div>
              <Cancel>Cancelar</Cancel>
              <ButtonAction type="submit">Download</ButtonAction>
            </div>
          </form>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

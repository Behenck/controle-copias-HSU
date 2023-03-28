'use client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Header } from '@/components/Header'
import { FileXls, PlusCircle, TrashSimple } from 'phosphor-react'
import {
  Box,
  Button,
  Container,
  Counter,
  Created,
  Done,
  Info,
  NewTask,
  Select,
  Task,
  TaskList,
  Tasks,
} from './styles'
import { Keyboard } from '@/components/Keyboard'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '@/services/api'
import { toast, Toaster } from 'react-hot-toast'
// import { Pagination } from '@/components/Pagination'
import { format } from 'date-fns'
import { AlertDialogDeleteCopie } from '@/components/AlertDialogDeleteCopie'
import { Report } from '@/components/report'

const CreateCopiesFormSchema = z.object({
  nCopies: z.string(),
  sector: z.string(),
})

type CreateCopiesFormInputs = z.infer<typeof CreateCopiesFormSchema>

interface Copie {
  id: string
  sector: string
  nCopies: number
  created_at: Date
}

interface Department {
  id: string
  code: number
  name: String
  corporateName: String
  active: boolean
  created_at: Date
  updated_at: Date
}

interface Response {
  copies: Copie[]
  totalCopiesToMonth: number
  totalCopiesToDay: number
}

export default function Home() {
  const [numberOfCopies, setNumberOfCopies] = useState('')
  // const [page, setPage] = useState(1)
  const [copies, setCopies] = useState<Copie[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [totalCopiesToMonth, setTotalCopiesToMonth] = useState(0)
  const [totalCopiesToDay, setTotalCopiesToDay] = useState(0)

  const { register, handleSubmit, reset } = useForm<CreateCopiesFormInputs>({
    resolver: zodResolver(CreateCopiesFormSchema),
  })

  async function fetchCopies() {
    const response = await api.get<Response>('/ShowCopies')
    setCopies(response.data.copies)
    setTotalCopiesToMonth(response.data.totalCopiesToMonth)
    setTotalCopiesToDay(response.data.totalCopiesToDay)
  }

  useEffect(() => {
    fetchCopies()
    fetchDepartments()
  }, [])

  async function handleCreateNewCopie(data: CreateCopiesFormInputs) {
    const { nCopies, sector } = data

    try {
      await api.post('/CreateNewCopie', {
        nCopies,
        sector,
      })

      toast.success('Cópias criada com sucesso!')
      reset()
      setNumberOfCopies('')
      fetchCopies()
    } catch (err) {
      console.log(err)
      toast.success('Erro avise o suporte!')
    }
  }

  function onSetNumberOfCopies(value: string) {
    if (value === 'backspace') {
      setNumberOfCopies((state) => state.substring(0, state.length - 1))
    } else {
      setNumberOfCopies((state) => state + value)
    }
  }

  async function fetchDepartments() {
    const response = await api.get('/GetAllDepartments')

    setDepartments(response.data)
  }

  return (
    <>
      <Header />

      <Container>
        <NewTask onSubmit={handleSubmit(handleCreateNewCopie)}>
          <Select {...register('sector')}>
            {departments.map((department, key) => {
              return <option key={key}>{department.name}</option>
            })}
          </Select>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <input
                type="text"
                placeholder="Nº cópias"
                required
                value={numberOfCopies}
                {...register('nCopies')}
              />
            </DropdownMenu.Trigger>
            <Keyboard onSetNumberOfCopies={onSetNumberOfCopies} />
          </DropdownMenu.Root>

          <Button>
            Criar
            <PlusCircle size={20} />
          </Button>
        </NewTask>

        <Tasks>
          <Info>
            <Created>
              <p>Cópias no Mês</p>
              <Counter>{totalCopiesToMonth}</Counter>
            </Created>
            <Done>
              <p>Cópia no dia</p>
              <Counter>{totalCopiesToDay}</Counter>
              <Report>
                <FileXls size={22} />
              </Report>
            </Done>
          </Info>

          <TaskList>
            {copies.map((copie) => {
              return (
                <Box key={copie.id}>
                  <Task>
                    <div>
                      {format(new Date(copie.created_at), 'dd/MM/yyyy hh:mm')}
                    </div>
                    <div>{copie.sector}</div>
                    <div>
                      {copie.nCopies > 1
                        ? `${copie.nCopies} cópias`
                        : `${copie.nCopies} cópia`}
                    </div>
                  </Task>
                  <AlertDialogDeleteCopie
                    id={copie.id}
                    fetchCopies={fetchCopies}
                  >
                    <div>
                      <TrashSimple size={20} />
                    </div>
                  </AlertDialogDeleteCopie>
                </Box>
              )
            })}
          </TaskList>
        </Tasks>

        {/* <Pagination
          totalCountOfRegisters={100}
          currentPage={page}
          onPageChange={setPage}
        /> */}
      </Container>

      <Toaster />
    </>
  )
}

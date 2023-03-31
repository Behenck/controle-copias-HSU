'use client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Buildings, FileXls, PlusCircle, TrashSimple } from 'phosphor-react'
import {
  Box,
  Button,
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
import { toast } from 'react-hot-toast'
// import { Pagination } from '@/components/Pagination'
import { format } from 'date-fns'
import { AlertDialogDelete } from '@/components/AlertDialogDelete'
import { Report } from '@/components/report'
import Link from 'next/link'

const CreateCopiesFormSchema = z.object({
  nCopies: z.string(),
  departmentId: z.string(),
})

type CreateCopiesFormInputs = z.infer<typeof CreateCopiesFormSchema>

interface Department {
  id: string
  code: number
  name: string
  corporateName: string
  active: boolean
  created_at: Date
  updated_at: Date
}

interface Copie {
  id: string
  departmentsId: string
  nCopies: number
  departments: Department
  created_at: Date
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
    const { nCopies, departmentId } = data

    try {
      await api.post('/CreateNewCopie', {
        nCopies,
        departmentId,
      })

      toast.success('Cópias criada com sucesso!')
      reset()
      setNumberOfCopies('')
      fetchCopies()
    } catch (err) {
      console.log(err)
      toast.error('Erro avise o suporte!')
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
    const response = await api.post('/GetAllDepartments', { active: true })

    setDepartments(response.data.departments)
  }

  return (
    <>
      <NewTask onSubmit={handleSubmit(handleCreateNewCopie)}>
        <Select {...register('departmentId')}>
          <option value="0" disabled selected>
            -- Selecione --
          </option>
          {departments.map((department, key) => {
            return (
              <option key={key} value={department.id}>
                {department.corporateName
                  ? department.corporateName
                  : department.name}
              </option>
            )
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
            <div>
              <Report>
                <FileXls size={22} />
              </Report>
              <Link href="/departments">
                <Buildings size={22} />
              </Link>
            </div>
          </Done>
        </Info>

        <TaskList>
          {copies.map((copie) => {
            return (
              <Box key={copie.id}>
                <Task>
                  <div>
                    {format(new Date(copie.created_at), 'dd/MM/yyyy hh:mm')}
                    <div>
                      {copie.departments.corporateName
                        ? copie.departments.corporateName
                        : copie.departments.name}
                    </div>
                  </div>

                  <div>
                    {copie.nCopies > 1
                      ? `${copie.nCopies} cópias`
                      : `${copie.nCopies} cópia`}
                  </div>
                </Task>
                <AlertDialogDelete
                  id={copie.id}
                  fetch={fetchCopies}
                  url="DeleteCopie"
                >
                  <div>
                    <TrashSimple size={20} />
                  </div>
                </AlertDialogDelete>
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
    </>
  )
}

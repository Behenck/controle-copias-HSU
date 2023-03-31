'use client'

import { AlertDialogDelete } from '@/components/AlertDialogDelete'
import { api } from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import {
  ArrowLeft,
  Check,
  PencilSimple,
  PlusCircle,
  TrashSimple,
  X,
} from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import {
  Actions,
  Box,
  Container,
  Content,
  Counter,
  Created,
  Done,
  Info,
  NewDepartment,
  Row,
  DepartmentName,
  ButtonEdit,
  ButtonCreate,
} from './styles'

const CreateDepartmentsFormSchema = z.object({
  code: z.string(),
  name: z.string(),
  corporateName: z.string(),
})

type CreateDepartmentsFormInputs = z.infer<typeof CreateDepartmentsFormSchema>

interface Department {
  id: string
  code: number
  name: string
  corporateName: string
  active: boolean
  created_at: Date
  updated_at: Date
}

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [edit, setEdit] = useState(false)
  const [totalDepartments, setTotalDepartments] = useState(0)
  const [totalDepartmentsActive, setTotalDepartmentsActive] = useState(0)

  const { register, handleSubmit, reset, setValue, getValues } =
    useForm<CreateDepartmentsFormInputs>({
      resolver: zodResolver(CreateDepartmentsFormSchema),
    })

  async function handleCreateNewDepartment(data: CreateDepartmentsFormInputs) {
    const { code, name, corporateName } = data

    try {
      await api.post('/CreateNewDepartment', {
        code,
        name,
        corporateName,
      })

      toast.success('Setor criado com sucesso!')
      reset()
      fetchDepartments()
    } catch (err) {
      console.log(err)
      toast.success('Erro avise o suporte!')
    }
  }

  async function fetchDepartments() {
    const response = await api.post('/GetAllDepartments', { active: '' })

    setDepartments(response.data.departments)
    setTotalDepartments(response.data.totalDepartments)
    setTotalDepartmentsActive(response.data.totalDepartmentsActive)
  }

  function handleModifyActive(id: string, active: boolean) {
    try {
      api.post('/ModifyActiveDepartment', { id, active })
    } catch (error) {
      console.log(error)
    } finally {
      fetchDepartments()
    }
  }

  function handleSetValueUpdate(
    code: number,
    name: string,
    corporateName: string,
  ) {
    setValue('code', String(code))
    setValue('name', name)
    setValue('corporateName', corporateName)

    setEdit(true)
  }

  function handleUpdateDepartment() {
    try {
      api.post('/UpdateDepartment', {
        code: getValues('code'),
        name: getValues('name'),
        corporateName: getValues('corporateName'),
      })
    } catch (error) {
      console.log(error)
    } finally {
      reset()
    }
    fetchDepartments()
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  return (
    <>
      <NewDepartment onSubmit={handleSubmit(handleCreateNewDepartment)}>
        <input type="text" placeholder="Cód." {...register('code')} />
        <input type="text" placeholder="Nome do CDC" {...register('name')} />
        <input
          type="text"
          placeholder="Nome fictício"
          {...register('corporateName')}
        />

        {edit ? (
          <ButtonEdit type="button" onClick={handleUpdateDepartment}>
            Editar
            <PencilSimple size={20} />
          </ButtonEdit>
        ) : (
          <ButtonCreate type="submit">
            Criar
            <PlusCircle size={20} />
          </ButtonCreate>
        )}
      </NewDepartment>

      <Container>
        <Info>
          <Created>
            <p>Quantidade de CDCs</p>
            <Counter>{totalDepartments}</Counter>
          </Created>
          <Done>
            <p>CDCs ativos</p>
            <Counter>{totalDepartmentsActive}</Counter>
            <Link href="/">
              <ArrowLeft size={22} />
              Voltar
            </Link>
          </Done>
        </Info>

        <Content>
          {departments.map((department) => {
            return (
              <Box key={department.id}>
                <Row>
                  <div>
                    <Actions>
                      <button
                        type="button"
                        onClick={() =>
                          handleSetValueUpdate(
                            department.code,
                            department.name,
                            department.corporateName,
                          )
                        }
                      >
                        <PencilSimple size={22} color="#8284FA" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleModifyActive(department.id, department.active)
                        }
                      >
                        {department.active ? (
                          <Check size={22} color="#07d645" />
                        ) : (
                          <X size={22} color="#d60e07" />
                        )}
                      </button>
                    </Actions>
                    <div>{department.code}</div>
                  </div>
                  <DepartmentName>
                    <p>{department.name}</p>
                    <span>{department.corporateName}</span>
                  </DepartmentName>
                </Row>
                <AlertDialogDelete
                  id={department.id}
                  fetch={fetchDepartments}
                  url="DeleteDepartment"
                >
                  <div>
                    <TrashSimple size={20} />
                  </div>
                </AlertDialogDelete>
              </Box>
            )
          })}
        </Content>
      </Container>
    </>
  )
}

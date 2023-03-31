import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { active } = request.body
  console.log(active)
  let departments

  if (active === '') {
    departments = await prisma.departments.findMany({
      orderBy: {
        active: 'desc',
      },
    })
  } else {
    departments = await prisma.departments.findMany({
      where: {
        active,
      },
      orderBy: {
        active: 'desc',
      },
    })
  }

  const totalDepartments = departments.length
  const totalDepartmentsActive = departments.filter(
    (department) => department.active === true,
  ).length

  response
    .status(200)
    .json({ departments, totalDepartments, totalDepartmentsActive })
}

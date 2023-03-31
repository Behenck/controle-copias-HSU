import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { code, name, corporateName } = request.body

  await prisma.departments.create({
    data: {
      code: Number(code),
      name,
      corporateName,
      active: true,
    },
  })

  response.status(201).json({})
}

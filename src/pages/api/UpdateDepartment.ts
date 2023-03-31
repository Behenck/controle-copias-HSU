import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { code, name, corporateName } = request.body

  await prisma.departments.update({
    where: { code: Number(code) },
    data: {
      code: Number(code),
      name,
      corporateName,
    },
  })

  response.status(201).json({})
}

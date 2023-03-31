import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { id } = request.body

  await prisma.departments.delete({
    where: { id },
  })

  response.status(201).json({})
}

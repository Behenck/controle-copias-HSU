import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { id, active } = request.body

  await prisma.departments.update({
    where: { id },
    data: {
      active: !active,
    },
  })

  response.status(201).json({})
}

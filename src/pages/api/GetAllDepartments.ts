import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const res = await prisma.departments.findMany({
    where: {
      active: true,
    },
  })

  response.status(200).json(res)
}

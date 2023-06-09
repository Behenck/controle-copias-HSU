import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { nCopies, departmentId } = request.body

  await prisma.copies.create({
    data: {
      nCopies: Number(nCopies),
      departmentId,
      created_at: new Date(),
    },
  })

  response.status(201).json({})
}

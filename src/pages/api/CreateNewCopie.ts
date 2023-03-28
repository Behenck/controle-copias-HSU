import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { nCopies, departmentsId } = request.body

  await prisma.copies.create({
    data: {
      nCopies: Number(nCopies),
      departmentsId,
      created_at: new Date(),
    },
  })

  response.status(201).json({})
}

import { Paginate } from '@/services/paginate'
import { format } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const { page = 1, per_page: perPage = 10 } = request.query

  const res = await prisma.copies.findMany({
    orderBy: [
      {
        created_at: 'desc',
      },
    ],
    include: {
      departments: true,
    },
  })

  const dateFirst = new Date(
    format(new Date(), 'yyyy-MM-dd 00:00:00'),
  ).toISOString()
  const dateLast = new Date(
    format(new Date(), 'yyyy-MM-dd 23:59:59'),
  ).toISOString()

  const responseToDay = await prisma.copies.findMany({
    where: {
      created_at: {
        lt: dateLast,
        gte: dateFirst,
      },
    },
  })

  const copies = Paginate({ page, perPage, list: res })

  const totalCopiesToMonth = res.reduce(
    (acc, currentValue) => acc + currentValue.nCopies,
    0,
  )
  const totalCopiesToDay = responseToDay.reduce(
    (acc, currentValue) => acc + currentValue.nCopies,
    0,
  )

  response.status(200).json({ copies, totalCopiesToMonth, totalCopiesToDay })
}

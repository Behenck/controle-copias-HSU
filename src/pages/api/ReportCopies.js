import { format } from 'date-fns'
import xl from 'excel4node'
import { prisma } from '../../../prisma'

export default async function handler(request, response) {
  const { month, year } = request.body

  const lastDay = new Date(year, month + 1, 0).getDate()

  const dateFirst = new Date(
    format(new Date(), `${year}-${month}-01 00:00:00`),
  ).toISOString()
  const dateLast = new Date(
    format(new Date(), `${year}-${month}-${lastDay} 23:59:59`),
  ).toISOString()

  const responseCopies = await prisma.copies.findMany({
    where: {
      created_at: {
        lt: dateLast,
        gte: dateFirst,
      },
    },
    orderBy: {
      sector: 'asc',
    },
  })

  const result = []
  responseCopies.filter((i) => {
    let hasElement = false
    let j
    for (j = 0; j < result.length; j++) {
      if (result[j].sector === i.sector) {
        hasElement = true
        break
      }
    }
    if (hasElement) {
      result[j].nCopies += i.nCopies
    } else {
      result.push(i)
    }
  })
  const responseFormatted = result.map((res) => {
    return {
      sector: res.sector,
      nCopies: String(res.nCopies),
    }
  })

  const wb = new xl.Workbook()

  const ws = wb.addWorksheet(`${month}-${year}`)

  const titulos = ['Setor', 'Nº Cópias']
  let headingColumnIndex = 1
  titulos.forEach((titulo) => {
    ws.cell(1, headingColumnIndex++).string(titulo)
  })
  let rowIndex = 2
  responseFormatted.forEach((record) => {
    let columnIndex = 1
    Object.keys(record).forEach((columnName) => {
      ws.cell(rowIndex, columnIndex++).string(record[columnName])
    })
    rowIndex++
  })

  wb.write(`relatorio-copias-mensais-${month}-${year}.xlsx`, response)
}

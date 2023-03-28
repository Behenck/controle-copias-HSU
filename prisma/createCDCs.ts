import { prisma } from '.'

const newDepartments = [
  { code: 103, name: 'CENTRAL DE COPIAS' },
  { code: 102, name: 'CARTAO DESCONTO' },
  { code: 104, name: 'COMPRAS' },
  { code: 105, name: 'CONTABILIDADE' },
  { code: 106, name: 'FINANCEIRO' },
  { code: 107, name: 'CONTROLADORIA' },
  { code: 108, name: 'COORDENACAO DE ENFERMAGEM' },
  { code: 110, name: 'DIRECAO ADMINISTRATIVA' },
  { code: 111, name: 'DIRECAO TECNICA E ASSISTENCIAL' },
  { code: 112, name: 'FATURAMENTO' },
  { code: 113, name: 'AUDITORIA' },
  { code: 115, name: 'JURIDICO' },
  { code: 117, name: 'PROJETOS/CAPTACAO DE RECURSOS' },
  { code: 118, name: 'AMBULATORIO ADM' },
  { code: 119, name: 'CENTRO CIRURGICO ADM' },
  { code: 123, name: 'RADIOLOGIA ADM' },
  { code: 124, name: 'RECEPCAO INTERNACAO' },
  { code: 127, name: 'PATRIMONIO' },
  { code: 130, name: 'RECURSOS HUMANOS' },
  { code: 131, name: 'TECNOLOGIA DA INFORMACAO', active: true },
  { code: 132, name: 'TELEFONIA' },
  { code: 133, name: 'TRANSPORTE' },
  { code: 134, name: 'NUCLEO DE ENSINO E PESQUISA' },
  { code: 135, name: 'OUVIDORIA' },
  { code: 200, name: 'APOIO' },
  { code: 201, name: 'ALMOXARIFADO' },
  { code: 202, name: 'BANCO DE LEITE' },
  { code: 203, name: 'BRINQUEDOTECA' },
  { code: 206, name: 'CME - CENTRO DE MATERIAL ESTERELIZADO' },
  { code: 208, name: 'CONDOMINIO' },
  { code: 210, name: 'FARMACIA CENTRAL' },
  { code: 211, name: 'FARMACIA CENTRO CIRURGICO' },
  { code: 215, name: 'GOVERNANCA' },
  { code: 216, name: 'COSTURA E ROUPARIA' },
  { code: 217, name: 'LAVANDERIA' },
  { code: 218, name: 'LIMPEZA E HIGIENIZACAO' },
  { code: 222, name: 'MANUTENCAO' },
  { code: 223, name: 'NHE - NUCLEO HOSPITALAR DE EPIDEMIOLOGIA' },
  { code: 224, name: 'CCIH - COMISSAO DE CONTROLE DE INFECCAO HOSPITALAR' },
  { code: 226, name: 'SERVICO DE PSICOLOGIA' },
  { code: 227, name: 'SERVICO SOCIAL' },
  { code: 234, name: 'SAME - SERVICO DE ARQUIVO MEDICO E ESTATISTICA' },
  { code: 235, name: 'SND - SERVICO DE NUTRICAO E DIETETICA' },
  { code: 238, name: 'SESMT - SERVICO DE SEGURANCA NO TRABALHO' },
  { code: 300, name: 'AMBULATORIO/ASSISTENCIAL' },
  { code: 301, name: 'AMBULATORIO ESPECIALIDADES' },
  { code: 302, name: 'AMBULATORIO CARDIOLOGIA' },
  { code: 303, name: 'AMBULATORIO FISIOTERAPIA' },
  { code: 305, name: 'AMBULATORIO NEUROLOGIA/NEUROCIRURGIA' },
  { code: 306, name: 'AMBULATORIO ONCOLOGIA' },
  { code: 307, name: 'AMBULATORIO ORTOPEDIA/TRAUMATOLOGIA' },
  { code: 314, name: 'CENTRO CIRURGICO' },
  { code: 316, name: 'CENTRO OBSTETRICO' },
  { code: 317, name: 'HEMODINAMICA' },
  { code: 318, name: 'SERVICO ENDOSCOPIA/COLONOSCOPIA' },
  { code: 324, name: 'ULTRASSONOGRAFIA' },
  { code: 325, name: 'RAIO X' },
  { code: 326, name: 'TOMOGRAFIA' },
  { code: 327, name: 'MAMOGRAFIA' },
  { code: 331, name: 'LABORATORIO DE ANALISES CLINICAS' },
  { code: 332, name: 'LABORATORIO DE PATOLOGIA' },
  { code: 338, name: 'BANCO DE SANGUE' },
  { code: 339, name: 'UNIDADE TRANSFUSIONAL' },
  { code: 341, name: 'PRONTO SOCORRO' },
  { code: 342, name: 'UPA - UNIDADE DE PRONTO ATENDIMENTO' },
  { code: 347, name: 'CLINICA RENAL' },
  { code: 348, name: 'QUIMIOTERAPIA' },
  { code: 349, name: 'RADIOTERAPIA' },
  { code: 400, name: 'HOSPITALAR/ASSISTENCIAL' },
  { code: 401, name: 'UI - CIRURGICA SUS' },
  { code: 402, name: 'UI - CLINICA SUS' },
  { code: 403, name: 'UI - PSIQUIATRICA' },
  { code: 404, name: 'UI - OBSTETRICA SUS' },
  { code: 405, name: 'UI - OBSTETRICA CONV/PART' },
  { code: 406, name: 'UI - CONVENIOS/PARTICULAR' },
  { code: 407, name: 'UI - PEDIATRICA' },
  { code: 410, name: 'UTI - ADULTO' },
  { code: 411, name: 'UTI - NEONATAL' },
  { code: 412, name: 'UCIN - UCINCO' },
  { code: 500, name: 'TERCEIROS/OUTROS' },
  { code: 501, name: 'ESTACIONAMENTO' },
]

const createManyDepartments = newDepartments.map((department) =>
  prisma.departments.create({
    data: department,
  }),
)

Promise.all(createManyDepartments)

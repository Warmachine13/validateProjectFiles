import { FileStorage } from '@/infra/gateways'

describe('FileStorage', () => {
  let item: string
  let sut: FileStorage

  beforeAll(() => {
    item = 'any_salt'
  })

  beforeEach(() => {
    sut = new FileStorage()
  })

  it('should return handle', async () => {
   // final.mockReturnValue(Buffer.from('1'))
    const encrpted = sut.isDirectory()

    expect(encrpted).toEqual(true)
  })
})

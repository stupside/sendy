import { MakeReq } from '@/tools/api'

export const GET = async () => {
  const { response } = await MakeReq((c) => c.GET('/hooks/sse'))

  return response
}

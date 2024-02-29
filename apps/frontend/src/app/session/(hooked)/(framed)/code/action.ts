'use server'

import { redirect, RedirectType } from 'next/navigation'

export const refresh = async () => {
  'use server'

  return redirect('/session/code', RedirectType.replace)
}

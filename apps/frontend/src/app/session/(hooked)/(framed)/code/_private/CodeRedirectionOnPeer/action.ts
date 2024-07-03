'use server'

import { RedirectType, redirect } from 'next/navigation'

const REDIRECT_URL = '/session/media'

export const redirection = async () => {
  'use server'

  redirect(REDIRECT_URL, RedirectType.replace)
}

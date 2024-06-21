'use server'

import { RedirectType, redirect } from 'next/navigation'

const REDIRECT_URL = '/session/content'

export const redirection = async () => {
  'use server'

  redirect(REDIRECT_URL, RedirectType.replace)
}

import { AppLoadContext, createCookieSessionStorage, redirect } from '@remix-run/cloudflare'
import { z } from 'zod'
import { combineHeaders } from './headers'
import { nanoid } from 'nanoid'

export const toastKey = 'toast'

const ToastSchema = z.object({
  description: z.string(),
  id: z.string().default(() => nanoid()),
  title: z.string().optional(),
  type: z.enum(['message', 'success', 'error']).default('message'),
})

export type Toast = z.infer<typeof ToastSchema>
export type ToastInput = z.input<typeof ToastSchema>

export const toastSessionStorage = ({ SESSION_SECRET, ENV }: AppLoadContext['env']) => createCookieSessionStorage({
  cookie: {
    name: 'en_toast',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: SESSION_SECRET.split(','),
    secure: ENV === 'production',
  },
})

export async function redirectWithToast(
  url: string,
  toast: ToastInput,
  init: ResponseInit | undefined,
  ctx: AppLoadContext['env']
) {
  return redirect(url, {
    ...init,
    headers: combineHeaders(init?.headers, await createToastHeaders(toast, ctx)),
  })
}

export async function createToastHeaders(toastInput: ToastInput, ctx: AppLoadContext['env']) {
  const session = await toastSessionStorage(ctx).getSession()
  const toast = ToastSchema.parse(toastInput)
  session.flash(toastKey, toast)
  const cookie = await toastSessionStorage(ctx).commitSession(session)
  return new Headers({ 'set-cookie': cookie })
}

export async function getToast(request: Request, ctx: AppLoadContext['env']) {
  const session = await toastSessionStorage(ctx).getSession(
    request.headers.get('cookie'),
  )
  const result = ToastSchema.safeParse(session.get(toastKey))
  const toast = result.success ? result.data : null
  return {
    toast,
    headers: toast
      ? new Headers({
        'set-cookie': await toastSessionStorage(ctx).destroySession(session),
      })
      : null,
  }
}
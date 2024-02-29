import { type Static, Type } from '@sinclair/typebox'

export const MySessionSchema = Type.Object({
  device: Type.Integer(),
  session: Type.Integer(),
  claims: Type.Array(Type.String()),
})

declare module '@fastify/request-context' {
  interface RequestContextData {
    identity: Static<typeof MySessionSchema>
  }
}

export * from './bearer'

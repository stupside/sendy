import type { FC, PropsWithChildren, ComponentProps } from 'react'

import type Display from './Display'

type ControllerFeatureImplementation = FC<PropsWithChildren> | boolean

type ControllerFeatures<
  TImplementation extends
    ControllerFeatureImplementation = FC<PropsWithChildren>,
> = Partial<{
  display: ComponentProps<typeof Display>['features']
  quality: Partial<{
    Provider: TImplementation
  }>
  language: Partial<{
    Audio: TImplementation
    Subtitle: TImplementation
  }>
}>

export type { ControllerFeatures, ControllerFeatureImplementation }

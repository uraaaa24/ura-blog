'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => undefined
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export const useIsClient = () =>
  useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)

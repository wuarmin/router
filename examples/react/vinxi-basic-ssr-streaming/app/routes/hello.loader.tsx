import { FileRouteLoader, defer } from '@tanstack/react-router'

async function getData() {
  'use server'

  return new Promise<string>((r) => {
    setTimeout(() => r('Server says hello, too!'), 500)
  })
}

async function getSlowData() {
  'use server'

  return new Promise<string>((r) => {
    setTimeout(() => r('Server slowly says.... hello again!'), 2000)
  })
}

export const loader = FileRouteLoader('/hello')(async () => {
  // Kick off the slow data request as soon as possible
  const slowData = defer(getSlowData())

  return {
    // Await the critical data
    data: await getData(),
    slowData,
  }
})

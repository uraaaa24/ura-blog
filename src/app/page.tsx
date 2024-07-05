import { client } from '@/libs/microcms'

export default async function Home() {
  const data = await client.get({
    endpoint: 'hello'
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{data.text}</div>
    </main>
  )
}

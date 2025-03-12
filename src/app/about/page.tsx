import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - My Blog',
  description: 'ブログの概要と筆者について'
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">About</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">ブログについて</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          このブログでは、主にプログラミングや技術に関する記事を投稿しています。
          Next.js、React、TypeScriptなどのフロントエンド技術を中心に、
          日々の開発で得た知見や役立つ情報を共有しています。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">筆者について</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          フロントエンドエンジニアとして活動しています。 Webアプリケーション開発を主に行っており、
          モダンなフロントエンド技術に関心があります。
        </p>
      </section>
    </div>
  )
}

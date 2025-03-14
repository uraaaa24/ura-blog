import Image from 'next/image'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Ura Blog',
  description: 'ブログの概要と筆者について'
}

const AboutPage = () => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6">About</h2>

      <section className="pb-4 mb-4">
        <p className="leading-8">
          Hi, I&apos;m Ura! 👋 I love building things for the web and continuously learning new
          technologies. This blog is where I share my development journey, insights, and the little
          things that inspire me every day.
        </p>
      </section>

      <section className="pb-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">What I Do</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Frontend Development:</strong> I focus on creating clean and efficient user
            experiences.
          </li>
          <li>
            <strong>Backend & Infrastructure:</strong> I also have experience in backend development
            and infrastructure.
          </li>
          <li>
            <strong>Learning:</strong> I&apos;m actively studying English to improve my
            communication skills and broaden my opportunities as an engineer.
          </li>
          <li>
            <strong>Continuous Growth:</strong> I enjoy exploring new technologies and refining my
            skills every day.
          </li>
        </ul>
      </section>

      <section className="pb-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Interests</h2>
        <p className="leading-8">
          I&apos;m a devoted Arsenal fan who loves playing soccer ⚽ <br />
          Also, I can&apos;t start my day without a good cup of coffee ☕
        </p>
      </section>

      <section className="pb-4 mb-4">
        <h2 className="text-2xl font-semibold mb-4">Social Links</h2>
        <div className="flex space-x-6">
          <a href="https://github.com/uraaaa24" target="_blank" rel="noopener noreferrer">
            <Image src="/github.svg" alt="GitHub" width={24} height={24} />
          </a>
          <a href="https://zenn.dev/uraaaa24" target="_blank" rel="noopener noreferrer">
            <Image src="/zenn.svg" alt="Zenn" width={24} height={24} />
          </a>
          <a href="https://twitter.com/__ars____24" target="_blank" rel="noopener noreferrer">
            <Image src="/x.svg" alt="X(Twitter)" width={24} height={24} />
          </a>
        </div>
      </section>

      <section>
        <p className="leading-relaxed">
          I believe in simplicity and practicality in both coding and life. Thanks for stopping by!
        </p>
      </section>
    </>
  )
}

export default AboutPage

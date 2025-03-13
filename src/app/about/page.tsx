import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - My Blog',
  description: 'ブログの概要と筆者について'
}

export const AboutPage = () => {
  return (
    <>
      <h2 className="text-3xl mb-6">About</h2>

      <section className="pb-6 mb-6">
        <p>
          Hello, I&apos;m uraaaa24. I value a simple approach and practical coding. On this blog, I
          share my daily development journey, insights, and the little inspirations I encounter
          along the way.
        </p>
      </section>

      <section className="pb-6 mb-6">
        <h2 className="text-xl mb-4">What I Do</h2>
        <p>
          Coding: I explore new technologies and strive to write efficient, clean code. <br />
          Learning: I embrace both technical growth and everyday discoveries.
        </p>
      </section>

      <section>
        <p>
          I focus on what truly matters, keeping things straightforward and essential. Thanks for
          stopping by!
        </p>
      </section>
    </>
  )
}

export default AboutPage

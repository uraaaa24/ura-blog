import { Heading1, Heading2 } from '@/components/heading'
import Section from '@/components/section'
import SocialLinks from '@/components/social-links'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Ura Blog',
  description: 'ブログの概要と筆者について'
}

const AboutPage = () => {
  return (
    <>
      <Heading1>About</Heading1>

      <Section>
        <p>
          Hi, I&apos;m Ura! 👋
          <br />
          I love building things for the web and continuously learning new technologies.
          <br />
          This blog is where I share my development journey, insights, and the little things that
          inspire me every day.
        </p>
      </Section>

      <Section>
        <Heading2>What I Do</Heading2>
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
      </Section>

      <Section>
        <Heading2>Interests</Heading2>
        <p>
          I&apos;m a devoted Arsenal fan who loves playing soccer ⚽ <br />
          Also, I can&apos;t start my day without a good cup of coffee ☕
        </p>
      </Section>

      <Section>
        <Heading2>Social Links</Heading2>
        <SocialLinks />
      </Section>
    </>
  )
}

export default AboutPage

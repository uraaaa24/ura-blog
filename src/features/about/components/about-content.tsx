import Image from 'next/image'

import { Heading1, Heading2 } from '@/components/ui/heading'
import Section from '@/components/layouts/section'
import SocialLinks from '@/components/ui/social-links'

const ICON_SIZE = 160

const AboutContent = () => {
  return (
    <>
      <Heading1>About</Heading1>

      <Section>
        <div className="flex flex-col items-center gap-4 mb-6">
          <Image
            src="/ura-icon.png"
            alt="Profile picture"
            width={ICON_SIZE}
            height={ICON_SIZE}
            priority
            className="rounded-full border-2 border-gray-100 dark:border-gray-700"
          />
          <p>
            Hi, I&apos;m Ura! 👋
            <br />I love building things for the web and continuously learning new technologies.
            <br />
            This blog is where I share my development journey, insights, and the little things that
            inspire me every day.
          </p>
        </div>
      </Section>

      <Section>
        <Heading2>What I Do</Heading2>
        <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-gray-200">
          <li>
            <strong className="text-gray-900 dark:text-gray-100">Frontend Development:</strong> I
            focus on creating clean and efficient user experiences using React, Next.js, and
            TypeScript.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-gray-100">Backend & Infrastructure:</strong>{' '}
            I also have experience in backend development and infrastructure, working with Node.js
            and cloud platforms.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-gray-100">Learning:</strong> I&apos;m
            actively studying English to improve my communication skills and broaden my
            opportunities as an engineer.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-gray-100">Continuous Growth:</strong> I enjoy
            exploring new technologies and refining my skills every day.
          </li>
        </ul>
      </Section>

      <Section>
        <Heading2>Tech Stack</Heading2>
        <ul className="list-disc pl-6 space-y-2 text-gray-800 dark:text-gray-200">
          <li>
            <strong className="text-gray-900 dark:text-gray-100">Frontend:</strong> React, Next.js,
            TypeScript, TailwindCSS
          </li>
          <li>
            <strong className="text-gray-900 dark:text-gray-100">Backend:</strong> Node.js, Hono,
            Express
          </li>
          <li>
            <strong className="text-gray-900 dark:text-gray-100">Database:</strong> Supabase,
            PostgreSQL
          </li>
          <li>
            <strong className="text-gray-900 dark:text-gray-100">Tools:</strong> Git, GitHub, Vercel
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

export default AboutContent

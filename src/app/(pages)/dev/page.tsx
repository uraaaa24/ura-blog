import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import PageHeader from '@/components/layouts/page-header'

export const metadata: Metadata = {
  title: 'Dev Projects',
  description: 'Experimental projects and demos',
  alternates: { canonical: '/dev' },
  openGraph: { url: '/dev', images: ['/opengraph-image'] }
}

const devProjects = [
  {
    id: 'crossy-road',
    title: 'Crossy Road Game',
    description: 'A simple browser-based game inspired by Crossy Road',
    href: '/dev/crossy-road',
    thumbnail: '/crossy-load-icon.png'
  }
]

const DevPage = () => {
  return (
    <>
      <PageHeader title="Dev" />
      <ul>
        {devProjects.map((project) => (
          <li key={project.id}>
            <Link
              href={project.href}
              className="block border-b border-gray-300 py-4 dark:border-gray-600"
            >
              <article className="h-full">
                <div className="flex items-center gap-2">
                  <div className="mr-4 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700">
                    {project.thumbnail ? (
                      <Image
                        src={project.thumbnail}
                        alt=""
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span
                        className="text-lg font-semibold text-gray-600 uppercase dark:text-gray-200"
                        aria-hidden
                      >
                        {project.title.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default DevPage

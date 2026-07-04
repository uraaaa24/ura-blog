import Image from 'next/image'
import Link from 'next/link'
import PageHeader from '@/components/layouts/page-header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dev Projects',
  description: 'Experimental projects and demos'
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
              className="border-b border-gray-300 dark:border-gray-600 py-4 block"
            >
              <article className="h-full">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 mr-4 bg-gray-200 dark:bg-gray-700 rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
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
                        className="text-gray-600 dark:text-gray-200 text-lg font-semibold uppercase"
                        aria-hidden
                      >
                        {project.title.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
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

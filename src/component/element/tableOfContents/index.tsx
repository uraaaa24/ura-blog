'use client'

import { useEffect } from 'react'
import tocbot from 'tocbot'

const TableOfContents = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.js-toc',
      contentSelector: '.js-toc-content',
      headingSelector: 'h2, h3, h4'
    })

    return () => tocbot.destroy()
  }, [])

  return (
    <div className="sticky top-10">
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg">
        <p className="text-center text-lg font-bold mb-2">目次</p>
        <nav className="js-toc" />
      </div>
    </div>
  )
}

export default TableOfContents

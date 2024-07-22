'use client'

import { useEffect } from 'react'
import tocbot from 'tocbot'

const TableOfContentsSideBar = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.js-toc',
      contentSelector: '.js-toc-content',
      headingSelector: 'h1, h2, h3, h4'
    })

    return () => tocbot.destroy()
  }, [])

  return (
    <div className="sticky top-0 pt-8">
      <p className="text-center text-lg font-bold mb-2">目次</p>
      <nav className="js-toc" />
    </div>
  )
}

export default TableOfContentsSideBar

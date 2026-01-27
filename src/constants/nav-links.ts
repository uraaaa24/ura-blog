const normalizePath = (path: string) => {
  if (!path) return '/'

  return path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path
}

export const navLinks = [
  { href: '/', label: 'Home', match: (path: string) => normalizePath(path) === '/' },
  {
    href: '/posts',
    label: 'Posts',
    match: (path: string) =>
      normalizePath(path) === '/posts' || normalizePath(path).startsWith('/posts/')
  },
  { href: '/books', label: 'Books', match: (path: string) => normalizePath(path) === '/books' },
  { href: '/about', label: 'About', match: (path: string) => normalizePath(path) === '/about' }
]

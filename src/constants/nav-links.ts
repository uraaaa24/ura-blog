type NavPath = string | null | undefined

export const normalizePath = (path: NavPath) => {
  const pathname = path?.split(/[?#]/)[0] ?? '/'

  if (!pathname || pathname === '/') return '/'

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

export const navLinks = [
  { href: '/', label: 'Home', match: (path: NavPath) => normalizePath(path) === '/' },
  {
    href: '/posts',
    label: 'Posts',
    match: (path: NavPath) =>
      normalizePath(path) === '/posts' || normalizePath(path).startsWith('/posts/')
  },
  {
    href: '/dev',
    label: 'Dev',
    match: (path: NavPath) =>
      normalizePath(path) === '/dev' || normalizePath(path).startsWith('/dev/')
  },
  { href: '/about', label: 'About', match: (path: NavPath) => normalizePath(path) === '/about' }
]

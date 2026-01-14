export const navLinks = [
  { href: '/', label: 'Home', match: (path: string) => path === '/' },
  {
    href: '/posts',
    label: 'Posts',
    match: (path: string) => path === '/posts' || path.startsWith('/posts/')
  },
  { href: '/library', label: 'Books', match: (path: string) => path === '/library' },
  { href: '/about', label: 'About', match: (path: string) => path === '/about' }
]

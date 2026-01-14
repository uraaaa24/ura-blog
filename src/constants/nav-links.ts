export const navLinks = [
  { href: '/', label: 'Home', match: (path: string) => path === '/' },
  {
    href: '/posts',
    label: 'Posts',
    match: (path: string) => path === '/posts' || path.startsWith('/posts/')
  },
  { href: '/books', label: 'Books', match: (path: string) => path === '/books' },
  { href: '/about', label: 'About', match: (path: string) => path === '/about' }
]

export const navLinks = [
  { href: '/', label: 'Home', match: (path: string) => path === '/' },
  { href: '/posts', label: 'Posts', match: (path: string) => path.startsWith('/posts') },
  { href: '/about', label: 'About', match: (path: string) => path === '/about' }
]

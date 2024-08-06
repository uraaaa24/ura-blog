import { NextPublicBaseUrl } from '@/config'

export const SNS_LINKS = {
  Github: {
    name: '@uraaaa24',
    href: 'https://github.com/uraaaa24',
    iconSrc: '/icons/github.svg',
    alt: 'GitHub'
  },
  X: {
    name: '@__ars____24',
    href: 'https://x.com/__ars____24',
    iconSrc: '/icons/x.svg',
    alt: 'X'
  },
  Zenn: {
    name: '@uraaaa24',
    href: 'https://zenn.dev/uraaaa24',
    iconSrc: '/icons/zenn.svg',
    alt: 'Zenn'
  }
} as const
export const SNS_LINKS_VALUES = Object.values(SNS_LINKS)

export const SNS_SHARE_LINKS = {
  X: {
    href: `https://x.com/intent/tweet?url=${NextPublicBaseUrl}/blog/{{id}}&text={{title}}`,
    icon: '/icons/x.svg',
    alt: 'Twitter',
    description: 'X(Twitter)でシェア'
  },
  HatenaBookmark: {
    href: `http://b.hatena.ne.jp/add?mode=confirm&url=${NextPublicBaseUrl}/blog/{{id}}`,
    icon: '/icons/hatenabookmark.svg',
    alt: 'Hatena',
    description: 'はてなブックマークに登録'
  }
} as const
export const SNS_SHARE_LINKS_VALUES = Object.values(SNS_SHARE_LINKS)
export const generateShareUrl = (href: string, id: string, title: string = '') => {
  return href.replace('{{id}}', id).replace('{{title}}', title)
}

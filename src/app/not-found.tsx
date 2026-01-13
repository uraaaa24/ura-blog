import Link from 'next/link'

import { Heading1 } from '@/components/heading'
import Section from '@/components/section'

export default function NotFound() {
  return (
    <Section>
      <div className="text-center py-4">
        <Heading1>🤔 ページが見つかりません</Heading1>
        <div className="flex flex-col space-y-6">
          <p>お探しのページは存在しないか、移動した可能性があります。</p>
          <Link
            href="/"
            className="text-gray-400 transition-colors hover:text-gray-700 dark:hover:text-gray-300 font-medium"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </Section>
  )
}

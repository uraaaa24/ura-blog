import Link from 'next/link'

const AboutReadMore = () => {
  return (
    <Link href="/about" className="text-gray-400 transition-colors hover:text-gray-700 w-fit">
      Read more about me →
    </Link>
  )
}

export default AboutReadMore

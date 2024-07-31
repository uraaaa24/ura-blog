import Link from 'next/link'

type NavItemProps = {
  href: string
  label: string
  isActive: boolean
}

const NavItem = (props: NavItemProps) => {
  return (
    <li>
      <Link href={props.href} className="relative group cursor-pointer">
        <span className={`transition-colors duration-300 ${props.isActive && 'text-primary'}`}>{props.label}</span>
        <span
          className={`absolute left-0 -bottom-0.5 h-0.5 bg-primary transition-all duration-300 ease-out ${
            props.isActive ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
      </Link>
    </li>
  )
}

export default NavItem

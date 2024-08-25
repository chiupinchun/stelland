import { AlignJustify, ChevronDown } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface MenuLink {
  title: string
  href: string
}

interface MenuGroup {
  title: string
  children?: MenuLink[]
  href?: string
}

const menu: MenuGroup[] = [
  {
    title: '服務',
    children: []
  },
  {
    title: '小遊戲',
    children: [
      {
        title: '拼圖',
        href: '/puzzle'
      }
    ]
  },
]

interface Props { }

const Menu: FC<Props> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [activeGroup, setActiveGroup] = useState<MenuGroup | null>(null)
  const clearActiveGroup = () => setActiveGroup(null)

  const isGroupActive = (group: MenuGroup) => activeGroup === group

  useEffect(() => {
    document.body.addEventListener('click', clearActiveGroup)

    return () => {
      document.body.removeEventListener('click', clearActiveGroup)
    }
  }, [])

  return (
    <>
      <nav className={
        'fixed top-5 z-10 flex justify-center w-screen transition-all '
        + (isMenuOpen ? 'right-0 opacity-100' : '-right-[100vw] opacity-0')
      }>
        <ul className='flex items-start gap-10 lg:gap-20'>
          {menu.map(group => (
            <li
              onClick={(e) => {
                e.stopPropagation()
                setActiveGroup(group)
              }}
              onMouseEnter={() => setActiveGroup(group)}
              onMouseLeave={clearActiveGroup} key={group.title}
            >
              {
                group.href
                  ? <Link to={group.href} className='block meteor'>{group.title}</Link>
                  : <a className='flex items-center gap-2 cursor-pointer meteor'>
                    {group.title}
                    <ChevronDown className={'transition ' + (isGroupActive(group) ? 'rotate-180' : 'rotate-0')} width={20} height={20} />
                  </a>
              }
              {
                group.children && <ul className={
                  'ps-1 overflow-hidden transition-all ' + (isGroupActive(group) ? 'max-h-screen' : 'max-h-0')
                }>
                  {group.children.map(link => (
                    <li key={link.title}>
                      <Link to={link.href} className='block meteor'>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              }
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className='fixed right-5 top-5 z-10 p-2 bg-slate-300 rounded-lg text-slate-700'
      >
        <AlignJustify />
      </button>
    </>
  )
}

export default Menu

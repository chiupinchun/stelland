import { AlignJustify, ChevronDown } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

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
    title: '回首頁',
    href: '/'
  },
  {
    title: '服務',
    children: [
      {
        title: '星靈測驗',
        href: '/psycho-test/tunnel'
      },
      {
        title: '星靈運勢',
        href: '/divination/daily'
      },
      {
        title: '符文占卜',
        href: '/divination/rune'
      }
    ]
  },
  {
    title: '設定',
    children: [
      {
        title: '星靈圖鑑',
        href: '/profiles'
      },
      {
        title: '星靈日記',
        href: '/diary'
      }
    ]
  }
]

interface Props { }

const Menu: FC<Props> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [activeGroup, setActiveGroup] = useState<MenuGroup | null>(null)

  const isGroupActive = (group: MenuGroup) => activeGroup === group

  useEffect(() => {
    const clearActiveGroup = () => {
      setIsMenuOpen(false)
      setActiveGroup(null)
    }

    document.body.addEventListener('click', clearActiveGroup)

    return () => {
      document.body.removeEventListener('click', clearActiveGroup)
    }
  }, [])

  return (
    <>
      <div className='fixed right-5 top-5 z-10' onClick={e => e.stopPropagation()}>
        <nav className={twMerge(
          'fixed md:absolute top-0 flex justify-center pt-5 ps-4 w-[50vw] h-screen bg-black bg-opacity-75 md:pt-0 md:w-max md:h-fit md:bg-inherit transition-all',
          isMenuOpen ? 'right-0 md:right-16 opacity-100' : '-right-[100vw] opacity-0'
        )}>
          <ul className='flex flex-col md:flex-row items-start gap-10 md:gap-20 w-full'>
            {menu.map(group => (
              <li
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveGroup(group)
                }}
                onMouseEnter={() => setActiveGroup(group)}
                onMouseLeave={() => setActiveGroup(null)} key={group.title}
              >
                {
                  group.href
                    ? <Link onClick={() => setIsMenuOpen(false)} to={group.href} className='block meteor'>{group.title}</Link>
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
                        <Link onClick={() => setIsMenuOpen(false)} to={link.href} className='block meteor'>{link.title}</Link>
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
          className='p-2 bg-slate-300 border border-slate-700 rounded-lg text-slate-700'
        >
          <AlignJustify />
        </button>
      </div>
    </>
  )
}

export default Menu

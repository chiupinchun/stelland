import { Facebook, Link2, Linkedin, Twitter } from 'lucide-react'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ToastContainer, toast } from 'react-toastify';

const X_OFFSET = 12
const Y_OFFSET = 12

const positionGetters = {
  'top-left': (_: number, height: number) => ({
    bottom: height + Y_OFFSET + 'px',
    right: 0
  }),
  'top-right': (_: number, height: number) => ({
    bottom: height + Y_OFFSET + 'px',
    left: 0
  }),
  'right-top': (width: number) => ({
    bottom: 0,
    left: width + X_OFFSET + 'px'
  }),
  'right-bottom': (width: number) => ({
    top: 0,
    left: width + X_OFFSET + 'px'
  }),
  'bottom-left': (_: number, height: number) => ({
    top: height + Y_OFFSET + 'px',
    right: 0
  }),
  'bottom-right': (_: number, height: number) => ({
    top: height + Y_OFFSET + 'px',
    left: 0
  }),
  'left-top': (width: number) => ({
    bottom: 0,
    right: width + X_OFFSET + 'px'
  }),
  'left-bottom': (width: number) => ({
    top: 0,
    right: width + X_OFFSET + 'px'
  }),
}

interface Props {
  location?: keyof typeof positionGetters
  link?: string
  shareText?: string
}

const Share: FC<Props> = ({
  location = 'bottom-left',
  link = window.location.href,
  shareText = ''
}) => {
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0
  })

  const containerRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const { clientWidth, clientHeight } = containerRef.current
    setContainerSize({
      width: clientWidth,
      height: clientHeight
    })
  }, [])

  const [isListShow, setIsListShow] = useState<boolean>(false)

  useEffect(() => {
    const closeList = () => setIsListShow(false)
    document.body.addEventListener('click', closeList)

    return () => document.body.removeEventListener('click', closeList)
  }, [])

  const listPosition = useMemo(() => {
    const getPosition = positionGetters[location]
    const position = getPosition(containerSize.width, containerSize.height)
    return position
  }, [location, containerSize])

  const isVertical = useMemo(() => {
    switch (location) {
      case 'left-bottom':
      case 'left-top':
      case 'right-bottom':
      case 'right-top':
        return true
      default:
        return false
    }
  }, [location])

  const encodedShareText = useMemo(() => encodeURIComponent(shareText), [shareText])
  const encodedLink = useMemo(() => encodeURIComponent(link), [link])

  const linkList = [
    {
      component: <Linkedin />,
      key: 'Linkedin',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`
    },
    {
      component: <Twitter />,
      key: 'Twitter',
      href: `https://x.com/intent/tweet?text=${encodedShareText}&url=${encodedLink}&hashtags=STELLAND`
    },
    {
      component: <Facebook />,
      key: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`
    },
    {
      component: <Link2 />,
      key: 'link',
      onClick: async () => {
        navigator.clipboard.writeText(link).then(() => {
          toast('複製成功！', {
            autoClose: 1000,
            hideProgressBar: true,
            className: 'w-48'
          })
        }).catch(console.error)
      }
    },
  ]

  return (
    <>
      <div className='relative' ref={containerRef} onClick={e => e.stopPropagation()}>
        <button
          onClick={() => setIsListShow(!isListShow)}
          className='button bg-blue-700 text-white hover:text-blue-700'
        >分享</button>

        <ul className={twMerge(
          'absolute flex bg-blue-300 rounded-full transition-all',
          isListShow ? 'opacity-100' : 'opacity-0 pointer-events-none',
          isVertical ? 'flex-col' : ''
        )} style={listPosition}>
          {linkList.map(linkItem => (
            <li key={linkItem.key}>
              <a
                href={linkItem.href}
                target='_blank'
                onClick={linkItem.onClick}
                className='block p-3 rounded-full cursor-pointer hover:bg-slate-200'
              >
                {linkItem.component}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <ToastContainer />
    </>
  )
}

export default Share

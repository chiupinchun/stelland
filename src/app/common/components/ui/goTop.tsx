import { ArrowUp } from 'lucide-react'
import { FC, useEffect, useMemo, useState } from 'react'
import { useScroll } from '../../hooks/useScroll'
import { twMerge } from 'tailwind-merge'

interface Props {
  showWhenTop?: boolean
}

const ToTop: FC<Props> = ({ showWhenTop }) => {
  const { scrollY } = useScroll()

  const isComponentShow = useMemo(() => {
    return showWhenTop || (scrollY > 0)
  }, [scrollY])

  const [
    isComponentShowAfterTransition, setIsComponentShowAfterTransition
  ] = useState(isComponentShow)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComponentShowAfterTransition(isComponentShow)
    }, isComponentShow ? 20 : 150)

    return () => clearTimeout(timer)
  }, [isComponentShow])

  const goTop = () => {
    document.body.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    })
  }

  return (
    <>
      <div className={twMerge(
        'fixed right-10 bottom-10 p-3 bg-slate-300 shadow shadow-slate-700 rounded-xl cursor-pointer hover:bg-slate-200 transition-all',
        isComponentShow && isComponentShowAfterTransition ? 'opacity-100' : 'opacity-0',
        !isComponentShow && !isComponentShowAfterTransition ? 'hidden' : ''
      )} onClick={goTop}>
        <ArrowUp width={25} height={25} />
      </div>
    </>
  )
}

export default ToTop

import { FC, useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  children?: React.ReactNode
  isActive?: boolean
  onClick?: () => void
  className?: string
}

const Rune: FC<Props> = ({ children, isActive, className = '', onClick }) => {
  const [wasActive, setWasActive] = useState(isActive ?? false)
  useEffect(() => {
    setTimeout(() => {
      setWasActive(!!isActive)
    }, 75)
  }, [isActive])

  const isOpen = useMemo(() => isActive && wasActive, [isActive, wasActive])
  const isDuringTransition = useMemo(() => isActive !== wasActive, [isActive, wasActive])

  return (
    <>
      <div className={twMerge(
        'relative cursor-pointer transition',
        isDuringTransition ? 'scale-x-0' : '',
        className
      )} onClick={onClick}>
        <svg width="150" height="150" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="
           M50,10
           L85,30
           L85,70 
           L50,90
           L15,70
           L15,30 
           L50,10
           Z" fill="#7080C0" />
          <path d="
           M85,80
           L50,100
           L15,80
           L15,70
           L50,90
           L85,70,
           L85,80
           Z" fill="#304070" />
        </svg>
        <div className='absolute top-0 flex justify-center items-center w-full h-full'>
          {isOpen && children}
        </div>
      </div>
    </>
  )
}

export default Rune

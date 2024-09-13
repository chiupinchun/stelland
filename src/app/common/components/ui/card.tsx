import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const Card: FC<Props> = ({ className, children, onClick }) => {
  return (
    <>
      <div
        onClick={onClick}
        className={twMerge(
          'flex flex-col p-5 bg-slate-300 border rounded-xl',
          (className ?? '')
        )}
      >
        {children}
      </div >
    </>
  )
}

export default Card

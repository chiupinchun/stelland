import { FC } from 'react'

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
        className={
          'flex flex-col p-5 bg-slate-300 rounded-xl '
          + (className ?? '')
        }
      >
        {children}
      </div >
    </>
  )
}

export default Card

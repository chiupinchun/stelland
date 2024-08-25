import { FC } from 'react'

interface Props {
  avatar?: string
  content: string
}

const Dialog: FC<Props> = ({ avatar, content }) => {
  return (
    <>
      <div className='flex items-start gap-5 lg:gap-10 p-3 lg:p-8 w-96 min-w-[50%] h-24 lg:h-48 border rounded-xl bg-slate-700 bg-opacity-25 text-slate-300'>
        {avatar && <img src={avatar} className='h-full rounded-full' />}
        <p className='whitespace-break-spaces'>{content}</p>
      </div>
    </>
  )
}

export default Dialog
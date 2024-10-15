import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> { }

const Avatar: FC<Props> = ({ ...props }) => {
  return (
    <>
      <img width={50} height={50} {...props} className={twMerge(
        'rounded-full',
        props.className
      )} />
    </>
  )
}

export default Avatar

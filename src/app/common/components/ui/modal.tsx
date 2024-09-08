import { FC, useEffect, useRef, useState } from 'react'

interface Props {
  show: boolean
  onClose?: () => void
  children?: React.ReactNode
}

const Modal: FC<Props> = ({ show, onClose, children }) => {
  const [showController, setShowController] = useState(show)

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (timer.current !== null) { clearTimeout(timer.current) }
    timer.current = setTimeout(() => {
      setShowController(show)
    }, 150)
  }, [show])

  if (!show && !showController) { return null }

  return (
    <>
      <div onClick={onClose} className={
        'fixed z-50 top-0 flex justify-center items-center w-screen h-screen bg-slate-900 transition-all '
        + (show && showController ? 'bg-opacity-25' : 'bg-opacity-0')
      }>
        <div className={
          'transition-all duration-300 '
          + (show && showController ? 'mt-0 opacity-100' : 'mt-20 opacity-0')
        }>
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal

import Scene from '@/app/common/components/r3f/scene'
import UiModel from '@/app/common/components/r3f/ui-model'
import { FC } from 'react'

interface Props {
  children?: React.ReactNode
  model: string
}

const BossArea: FC<Props> = ({ children, model }) => {
  return (
    <>
      <div className='relative h-full'>
        <Scene cameraPosition={[0, 0.3, 0.6]}>
          <UiModel src={model} />
        </Scene>
        {children}
      </div>
    </>
  )
}

export default BossArea

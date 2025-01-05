import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Sprite, sprites } from '@/app/common/configs/sprites'
import { twMerge } from 'tailwind-merge'
import Card from '../common/components/ui/card'
import { getExcellentStatus } from './utils/status'

const Anchor: FC<{
  sprite: Sprite
  onAnchor: (sprite: Sprite) => void
}> = ({ sprite, onAnchor }) => {
  return (
    <a onClick={() => onAnchor(sprite)} className='cursor-pointer'>{sprite.name}</a>
  )
}

interface ProfileProps {
  sprite: Sprite
  reverse: boolean
  selected: boolean
}

const Profile: FC<ProfileProps> = ({ sprite, reverse, selected }) => {
  const anchorTargetElement = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (selected && anchorTargetElement.current) {
      anchorTargetElement.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      })
    }
  }, [selected])

  const excellentStatus = useMemo(() => getExcellentStatus(sprite), [sprite])

  return (
    <>
      <div ref={anchorTargetElement}>
        <Card className={twMerge(
          'md:flex justify-between',
          reverse ? 'flex-row-reverse' : '',
          selected ? 'shadow-lg shadow-slate-300' : ''
        )}>
          <img
            src={sprite.avatar} alt={sprite.name}
            width={350} height={350}
            className='mx-auto md:mx-0 rounded'
          />
          <div className='flex flex-col justify-between md:w-[350px]'>
            <article>
              <h3 className='font-bold text-lg border-b border-slate-700'>{sprite.name}</h3>
              <p className='my-2 whitespace-pre-line'>{sprite.description}</p>
            </article>
            <ul className='flex gap-2'>
              {excellentStatus.map(status => (
                <li
                  key={status}
                  className='px-2 py-1 text-sm bg-blue-300 rounded-xl'
                >{status}</li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </>
  )
}

interface Props { }

const Profiles: FC<Props> = () => {
  const [selectedSprite, setSelectedSprite] = useState<Sprite | null>(null);

  return (
    <>
      <main className='py-5 container'>
        <nav className='grid grid-cols-3 md:flex gap-2 mb-5 text-slate-300'>
          {sprites.map(sprite => (
            <Anchor
              key={sprite.key}
              sprite={sprite}
              onAnchor={setSelectedSprite}
            />
          ))}
        </nav>

        <section className='space-y-5'>
          {sprites.map((sprite, index) => (
            <Profile
              key={sprite.key}
              sprite={sprite}
              reverse={index % 2 !== 0}
              selected={selectedSprite === sprite}
            />
          ))}
        </section>
      </main>
    </>
  )
}

export default Profiles

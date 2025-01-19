import { FC, Fragment, useReducer } from 'react'
import { spriteMap, sprites } from '../common/configs/sprites'
import { twMerge } from 'tailwind-merge'
import Card from '../common/components/ui/card'
import { initialState, reducer } from './reducer'
import Avatar from '../common/components/ui/avatar'
import bg from '@/assets/images/spirits.webp'

interface Props { }

const Diary: FC<Props> = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <main className='min-h-screen bg-fixed bg-cover' style={{
        backgroundImage: `url(${bg})`
      }}>
        <div className='py-5 container text-slate-700'>
          <ul className='grid grid-cols-2 md:grid-cols-3 gap-5'>
            {sprites.map(sprite => (
              <li key={sprite.key} className='flex justify-center'>
                <a
                  onClick={() => dispatch({
                    type: 'set_author',
                    payload: sprite.key
                  })}
                  className={twMerge(
                    'px-4 py-2 bg-slate-300 rounded-xl cursor-pointer hover:bg-slate-200',
                    state.author === sprite.key ? 'shadow-md shadow-blue-300 font-bold text-blue-700' : ''
                  )}
                >
                  {sprite.name}
                </a>
              </li >
            ))}
          </ul>

          <hr className='my-5' />

          <section className='space-y-5'>
            {state.diaries.map((diary, index) => (
              <Card key={index}>
                <div className='flex items-center gap-5 mb-5'>
                  <Avatar src={spriteMap[state.author].avatar} />
                  <h3 className='font-bold text-lg'>{diary.title}</h3>
                </div>
                <p className={twMerge(
                  diary.collapsed ? 'truncate ...' : 'whitespace-pre-line'
                )}>{diary.content}</p>

                <ul className={twMerge(
                  'space-y-2 rounded overflow-y-hidden transition-all',
                  diary.collapsed ? 'max-h-0' : 'my-4 p-3 border max-h-[unset]'
                )}>
                  {diary.comments.map((comment, index) => (<Fragment key={index}>
                    {index > 0 && <hr />}
                    <li className='flex items-start gap-5'>
                      <Avatar src={spriteMap[comment.author].avatar} width={50} height={50} />
                      <p className='whitespace-pre-line'>{comment.content}</p>
                    </li>
                  </Fragment>))}
                </ul>

                <div className='flex justify-end'>
                  <a
                    className='text-blue-700 cursor-pointer'
                    onClick={() => dispatch({
                      type: 'toggle_collapse',
                      payload: diary
                    })}
                  >
                    {diary.collapsed ? '展開' : '收合'}
                  </a>
                </div>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </>
  )
}

export default Diary

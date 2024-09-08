import { UserInfoResponse } from '@/api/module/orb-match'
import { X } from 'lucide-react'
import { FC } from 'react'
import { Challenger } from '@/app/orb-match/core/challenger'
import { getWeaponById } from '../../core/weapons'
import { getBlessingById } from '../../core/blessings'
import Card from '@/app/common/components/card'

interface TableItem {
  label: string
  cell: string | number
}

interface Props {
  user: UserInfoResponse
  onClose: () => void
}

const ChallengerInfo: FC<Props> = ({ user, onClose }) => {
  const challenger = new Challenger(
    user.weapon ? getWeaponById(user.weapon) : null,
    user.blessings.map(id => getBlessingById(id))
  )

  const baseInfo: TableItem[] = [
    {
      label: '生命',
      cell: `${challenger.hp} / ${challenger.maxHp}`
    },
    {
      label: '攻擊',
      cell: challenger.atk
    },
    {
      label: '防禦',
      cell: challenger.def
    },
    {
      label: '傷害',
      cell: `${challenger.increaseDmg}%`
    }
  ]

  const criticalInfo: TableItem[] = [
    {
      label: '暴擊率',
      cell: `${challenger.critical}%`
    },
    {
      label: '暴擊傷害',
      cell: `${challenger.criticalDmg}%`
    }
  ]

  const elementDmgInfo: TableItem[] = [
    {
      label: '火屬性傷害',
      cell: `${challenger.fireDmg}%`
    },
    {
      label: '水屬性傷害',
      cell: `${challenger.waterDmg}%`
    },
    {
      label: '地屬性傷害',
      cell: `${challenger.groundDmg}%`
    },
    {
      label: '毒屬性傷害',
      cell: `${challenger.poisonDmg}%`
    },
    {
      label: '物理屬性傷害',
      cell: `${challenger.physicDmg}%`
    }
  ]

  const registanceInfo: TableItem[] = [
    {
      label: '火抗性',
      cell: `${Math.min(challenger.fireResistance, challenger.maxResistance)}% (${challenger.fireResistance}%)`
    },
    {
      label: '水抗性',
      cell: `${Math.min(challenger.waterResistance, challenger.maxResistance)}% (${challenger.waterResistance}%)`
    },
    {
      label: '地抗性',
      cell: `${Math.min(challenger.groundResistance, challenger.maxResistance)}% (${challenger.groundResistance}%)`
    },
    {
      label: '毒抗性',
      cell: `${Math.min(challenger.poisonResistance, challenger.maxResistance)}% (${challenger.poisonResistance}%)`
    },
    {
      label: '物理抗性',
      cell: `${Math.min(challenger.physicResistance, challenger.maxResistance)}% (${challenger.physicResistance}%)`
    },
    {
      label: '抗性上限',
      cell: `${challenger.maxResistance}%`
    }
  ]

  const otherInfo: TableItem[] = [
    {
      label: '回復率',
      cell: `${challenger.healRate}%`
    }
  ]

  return (
    <>
      <div onClick={onClose} className='fixed top-0 flex justify-center items-center w-screen h-screen bg-slate-900 bg-opacity-25'>
        <Card onClick={e => e.stopPropagation()} className='bg-slate-300 rounded'>
          <div className='flex justify-end'>
            <X onClick={onClose} className='cursor-pointer' />
          </div>
          <div className='w-64 lg:w-96 h-[75vh] overflow-y-auto scroll-bar'>
            <h2 className='mb-1 border-b border-slate-400 font-bold'>基本資訊</h2>
            <ul>
              {baseInfo.map((item, index) => (
                <li key={index} className='flex justify-between'>
                  <div>{item.label}</div>
                  <div>{item.cell}</div>
                </li>
              ))}
            </ul>

            <h2 className='mt-5 mb-1 border-b border-slate-400 font-bold'>暴擊相關</h2>
            <ul>
              {criticalInfo.map((item, index) => (
                <li key={index} className='flex justify-between'>
                  <div>{item.label}</div>
                  <div>{item.cell}</div>
                </li>
              ))}
            </ul>

            <h2 className='mt-5 mb-1 border-b border-slate-400 font-bold'>屬性傷害</h2>
            <ul>
              {elementDmgInfo.map((item, index) => (
                <li key={index} className='flex justify-between'>
                  <div>{item.label}</div>
                  <div>{item.cell}</div>
                </li>
              ))}
            </ul>

            <h2 className='mt-5 mb-1 border-b border-slate-400 font-bold'>屬性抗性</h2>
            <ul>
              {registanceInfo.map((item, index) => (
                <li key={index} className='flex justify-between'>
                  <div>{item.label}</div>
                  <div>{item.cell}</div>
                </li>
              ))}
            </ul>

            <h2 className='mt-5 mb-1 border-b border-slate-400 font-bold'>其他資訊</h2>
            <ul>
              {otherInfo.map((item, index) => (
                <li key={index} className='flex justify-between'>
                  <div>{item.label}</div>
                  <div>{item.cell}</div>
                </li>
              ))}
            </ul>
          </div>

        </Card>
      </div>
    </>
  )
}

export default ChallengerInfo

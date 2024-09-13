import { UserInfoResponse } from '@/api/module/orb-match'
import { X } from 'lucide-react'
import { FC, useRef, useState } from 'react'
import { Challenger } from '@/app/orb-match/core/challenger'
import { getWeaponById, Weapon } from '@/app/orb-match/core/weapons'
import { getBlessingById } from '@/app/orb-match/core/blessings'
import Card from '@/app/common/components/ui/card'

interface TableItem {
  label: string
  cell: string | number
}

const BaseInfo: FC<{
  weapon: Weapon | null
  challenger: Challenger
}> = ({ weapon, challenger }) => {
  const weaponInfo: TableItem[] = [
    {
      label: '武器',
      cell: weapon?.name ?? '無'
    },
    {
      label: '效果',
      cell: weapon?.description ?? ''
    }
  ]

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
      <h2 className='mb-1 border-b border-slate-400 font-bold'>武器資訊</h2>
      <ul className='pe-4'>
        {weaponInfo.map((item, index) => (
          <li key={index} className='flex justify-between border-b border-slate-300 hover:border-slate-200'>
            <div>{item.label}</div>
            <div className='max-w-[50%]'>{item.cell}</div>
          </li>
        ))}
      </ul>

      <h2 className='mb-1 border-b border-slate-400 font-bold'>能力值</h2>
      <ul className='pe-4'>
        {baseInfo.map((item, index) => (
          <li key={index} className='flex justify-between border-b border-slate-300 hover:border-slate-200'>
            <div>{item.label}</div>
            <div>{item.cell}</div>
          </li>
        ))}
      </ul>

      <h2 className='mt-5 mb-1 border-b border-slate-400 font-bold'>暴擊相關</h2>
      <ul className='pe-4'>
        {criticalInfo.map((item, index) => (
          <li key={index} className='flex justify-between border-b border-slate-300 hover:border-slate-200'>
            <div>{item.label}</div>
            <div>{item.cell}</div>
          </li>
        ))}
      </ul>

      <h2 className='mt-5 mb-1 border-b border-slate-400 font-bold'>屬性傷害</h2>
      <ul className='pe-4'>
        {elementDmgInfo.map((item, index) => (
          <li key={index} className='flex justify-between border-b border-slate-300 hover:border-slate-200'>
            <div>{item.label}</div>
            <div>{item.cell}</div>
          </li>
        ))}
      </ul>

      <h2 className='mt-5 mb-1 border-b border-slate-400 font-bold'>屬性抗性</h2>
      <ul className='pe-4'>
        {registanceInfo.map((item, index) => (
          <li key={index} className='flex justify-between border-b border-slate-300 hover:border-slate-200'>
            <div>{item.label}</div>
            <div>{item.cell}</div>
          </li>
        ))}
      </ul>

      <h2 className='mt-5 mb-1 border-b border-slate-400 font-bold'>其他資訊</h2>
      <ul className='pe-4'>
        {otherInfo.map((item, index) => (
          <li key={index} className='flex justify-between border-b border-slate-300 hover:border-slate-200'>
            <div>{item.label}</div>
            <div>{item.cell}</div>
          </li>
        ))}
      </ul>
    </>
  )
}

interface Props {
  user: UserInfoResponse
  onClose: () => void
}

const ChallengerInfo: FC<Props> = ({ user, onClose }) => {
  const tabs = useRef([
    {
      label: '基本資訊'
    },
    {
      label: '道具'
    },
    {
      label: '祝福'
    }
  ])
  const [currentTab, setCurrentTab] = useState(tabs.current[0])

  const weapon = user.weapon ? getWeaponById(user.weapon) : null
  const challenger = new Challenger(
    weapon,
    user.blessings
  )

  return (
    <>
      <Card onClick={e => e.stopPropagation()} className='bg-slate-300 rounded'>
        <div className='flex justify-between'>
          <ul className='flex items-end w-full h-10 border-b'>
            {tabs.current.map(tab => (
              <li
                key={tab.label}
                onClick={() => setCurrentTab(tab)}
                className={
                  'border rounded-tl-lg rounded-tr-lg cursor-pointer transition-all ' + (
                    tab === currentTab ? 'px-4 py-2' : 'px-2 py-1'
                  )
                }
              >
                {tab.label}
              </li>
            ))}
          </ul>
          <X onClick={onClose} className='cursor-pointer' />
        </div>

        <div className='w-64 lg:w-96 h-[75vh] overflow-y-auto scroll-bar'>
          {currentTab === tabs.current[0] ? <BaseInfo challenger={challenger} weapon={weapon} /> : null}
        </div>
      </Card>
    </>
  )
}

export default ChallengerInfo

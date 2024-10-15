import CatGlb from '@/assets/models/cat.glb?url'
import ChikunGlb from '@/assets/models/chikun.glb?url'
import DogGlb from '@/assets/models/dog.glb?url'
import FishGlb from '@/assets/models/fish.glb?url'
import PrairieDogGlb from '@/assets/models/prairie-dog.glb?url'
import SnakeGlb from '@/assets/models/snake.glb?url'
import CatAvatar from '@/assets/images/avatars/cat.webp'
import ChikunAvatar from '@/assets/images/avatars/chikun.webp'
import DogAvatar from '@/assets/images/avatars/dog.webp'
import FishAvatar from '@/assets/images/avatars/fish.webp'
import PrairieDogAvatar from '@/assets/images/avatars/prairie-dog.webp'
import SnakeAvatar from '@/assets/images/avatars/snake.webp'

export const sprites = [
  {
    name: '鰭之星靈',
    key: 'fish',
    model: FishGlb,
    avatar: FishAvatar,
    status: {
      智慧: 4,
      知性: 5,
      體魄: 1,
      敏捷: 1,
      魅力: 3
    },
    lines: {
      home: '嗨～最近有甚麼有趣的見聞能跟我分享嗎？',
      contract: '嘻嘻，我早有預感我們會有更深一層的羈絆。\n你說對吧？我的摯友。'
    }
  },
  {
    name: '無形之星靈',
    key: 'cat',
    model: CatGlb,
    avatar: CatAvatar,
    status: {
      智慧: 3,
      知性: 4,
      體魄: 1,
      敏捷: 3,
      魅力: 5
    },
    lines: {
      home: '人類，幹嘛？',
      contract: '人類，你能得到我的庇佑，但沒事可別打擾我，有事也不行。'
    }
  },
  {
    name: '牙之星靈',
    key: 'dog',
    model: DogGlb,
    avatar: DogAvatar,
    status: {
      智慧: 1,
      知性: 2,
      體魄: 4,
      敏捷: 5,
      魅力: 2
    },
    lines: {
      home: '來玩！陪我玩！',
      contract: '今後我們要一起玩更多更多更～多好玩的遊戲汪！'
    }
  },
  {
    name: '環之星靈',
    key: 'snake',
    model: SnakeGlb,
    avatar: SnakeAvatar,
    status: {
      智慧: 5,
      知性: 3,
      體魄: 1,
      敏捷: 2,
      魅力: 3
    },
    lines: {
      home: '喲～小白鼠，原來上次消失的不是你呀。',
      contract: '哼～是你呀小白鼠。\n你永遠可以為與我契約感到驕傲。'
    }
  },
  {
    name: '冠之星靈',
    key: 'chikun',
    model: ChikunGlb,
    avatar: ChikunAvatar,
    status: {
      智慧: 3,
      知性: 3,
      體魄: 2,
      敏捷: 3,
      魅力: 5
    },
    lines: {
      home: '我喜歡唱、跳、RAP、籃球。你呢？',
      contract: '迎面走來的你讓我如此蠢蠢欲動，\n這種感覺我從未有Cause I got a crush on you.\nwho you?\n你是我的我是你的誰？'
    }
  },
  {
    name: '爪之星靈',
    key: 'prairie-dog',
    model: PrairieDogGlb,
    avatar: PrairieDogAvatar,
    status: {
      智慧: 1,
      知性: 1,
      體魄: 5,
      敏捷: 1,
      魅力: 5
    },
    lines: {
      home: '（爪之星靈呆滯地望著你。）',
      contract: '（爪之星靈呆滯地望著你。）'
    }
  },
] as const

export type Sprite = typeof sprites[number]

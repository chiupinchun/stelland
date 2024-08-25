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
    lines: '嗨～最近有甚麼有趣的見聞能跟我分享嗎？'
  },
  {
    name: '無形之星靈',
    key: 'cat',
    model: CatGlb,
    avatar: CatAvatar,
    lines: '人類，幹嘛？'
  },
  {
    name: '牙之星靈',
    key: 'dog',
    model: DogGlb,
    avatar: DogAvatar,
    lines: '來玩！陪我玩！'
  },
  {
    name: '環之星靈',
    key: 'snake',
    model: SnakeGlb,
    avatar: SnakeAvatar,
    lines: '喲～小白鼠，原來上次消失的不是你呀。'
  },
  {
    name: '冠之星靈',
    key: 'chikun',
    model: ChikunGlb,
    avatar: ChikunAvatar,
    lines: '我喜歡唱、跳、RAP、籃球。你呢？'
  },
  {
    name: '爪之星靈',
    key: 'prairie-dog',
    model: PrairieDogGlb,
    avatar: PrairieDogAvatar,
    lines: '（爪之星靈呆滯地望著你。）'
  },
] as const

export type Sprite = typeof sprites[number]

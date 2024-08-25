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
    avatar: FishAvatar
  },
  {
    name: '無形之星靈',
    key: 'cat',
    model: CatGlb,
    avatar: CatAvatar
  },
  {
    name: '牙之星靈',
    key: 'dog',
    model: DogGlb,
    avatar: DogAvatar
  },
  {
    name: '環之星靈',
    key: 'snake',
    model: SnakeGlb,
    avatar: SnakeAvatar
  },
  {
    name: '冠之星靈',
    key: 'chikun',
    model: ChikunGlb,
    avatar: ChikunAvatar
  },
  {
    name: '爪之星靈',
    key: 'prairie-dog',
    model: PrairieDogGlb,
    avatar: PrairieDogAvatar
  },
] as const
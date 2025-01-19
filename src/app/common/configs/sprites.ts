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
    },
    description: `若將星靈們比作家庭，母親的角色非鰭之星靈莫屬。
    溫柔、知性的她比誰都重視這份羈絆，因此她總是溫柔地包容著每一位星靈，無論是無形之星靈的惡作劇、牙之星靈闖禍、環之星靈毒舌……都無法動搖她對家人的愛。
    然而這可不代表她好欺負，不如說正好相反，鰭之星靈是星靈中最不好惹的一位。如果想知道原因，不妨可以去打聽看看上一個傷害她家人的人是甚麼下場。`
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
    },
    description: `她從不在午飯時間前起床，因為俗話說「早起的鳥兒有蟲吃」，所以懶蟲就應該睡到中午；
    她只要醒著，不是正在捉弄別人，就是在準備捉弄別人的路上。
    但哪怕闖了點禍，又有誰捨得責備這慵懶、調皮又可愛的小傢伙呢？`
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
    },
    description: `熱情、熱情、熱情！這是牙之星靈的座右銘，僅此一詞即可概括他的一切。
    約他去野餐？他去！
    想找他散步？他走！
    帶他玩飛盤？他玩！
    沒有一點心機、僅有滿滿真誠，只要待在他身邊，他就是最棒的夥伴！`
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
    },
    description: `星靈們的頭腦擔當，擁有領先現代科技水平好幾世紀的技術。
    過去曾為同伴們建造如王城般華麗的星夜宮，但在一夕之間被爪之星靈給拆了。
    除此之外她還有過許多偉大的功績，然而留下來的卻沒幾個。這也是她明令禁止調皮的無形之星靈和冒失的牙之星靈進入研究室的原因。
    如今，她正在研究一種名叫「型態腳本（TypeScript）」的神祕技術，傳說星靈們都是由這種技術創造出來的。`
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
    },
    description: `頭頂中分冠，身有背帶褲般的紋路，喜歡唱、跳、RAP、籃球，星齡兩世紀半的星靈。
    以一首稱頌雞的美貌的神曲成名，有千萬粉絲為他的才華失去理智，無法自拔。
    當然，他對待同伴們也很慷慨，就像個好哥哥一樣。`
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
    },
    description: `擁有網紅神獸形象的爪之星靈，完美繼承了一驚一乍的特質與拆家天賦。
    只要是有一點風吹草動，都能把他嚇得呆若木雞，哪怕是想和他分享美食的牙之星靈也不例外。
    平時他總是傻憨憨的一副老實樣，但唯獨一件事能讓他變得比誰都勤奮，那便是——拆家。
    他與任何有實體的建築物不共戴天，這也是環之星靈現在的實驗室選用虛數空間建材建造的原因。`
  },
] as const

export type Sprite = typeof sprites[number]

export const spriteMap = sprites.reduce((map, sprite) => {
  map[sprite.key] = sprite
  return map
}, {} as Record<Sprite['key'], Sprite>)

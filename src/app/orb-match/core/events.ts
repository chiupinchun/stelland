import { UserInfoResponse } from "@/api/module/orb-match"
import { ancientSpriteWand, EnergySword, Hammer, Microphone, RockArmor, ScoopingNet, Spear } from "./weapons"
import { AtkUp, CriticalMaster, DefUp, FireMaster, GroundMaster, HealMaster, PhysicMaster, PoisonMaster, WaterMaster, HealthMaster } from "./blessings"
import { Meat, Protect } from "./items"

interface Event {
  id: number
  name: string
  description: string
  effect: (user: UserInfoResponse) => void
  story: string
}

export enum Rarety {
  Normal,
  Rare,
  Legend
}
export const getRarety = (eventOrId: Event | number) => {
  const id = typeof eventOrId === 'number' ? eventOrId : eventOrId.id
  return id % 3
}

export const normalEvents: Event[] = [
  {
    id: 1 * 3,
    name: '拆家達人',
    description: '將武器替換為槌子。',
    effect: (user) => {
      user.weapon = new Hammer().id
    },
    story: [
      '那雙堅韌的爪，既是祂的標誌，也是祂的榮耀。',
      '祂曾用那雙爪粉碎入侵者的野心、守護同伴的家園。',
      '然而……對於家園，危害可能多於貢獻就是了。'
    ].join('\n')
  },
  {
    id: 2 * 3,
    name: '糖醋魚排',
    description: '獲得道具：肉。',
    effect: (user) => {
      user.items.push(new Meat().id)
    },
    story: [
      '糖與醋的交織下，創造出甜而不膩的美味；',
      '炸脆的外皮和入口即化的肉質，恰到好處的反差更是畫龍點睛。',
      '但真正讓這道料理昇華的，是料理者想看到大家幸福表情的心願。',
      '「可是鰭姊，料理同類真的沒關係嗎……？」——無形之星靈',
    ].join('\n')
  },
  {
    id: 3 * 3,
    name: '家',
    description: '獲得道具：保護。',
    effect: (user) => {
      user.items.push(new Protect().id)
    },
    story: [
      '或許祂們經常會因為一些小事爭吵，甚至落下狠話。',
      '但只要過了一天，誰也不會為過去的事耿耿於懷。',
      '傍晚有熱騰騰的咖哩飄香，和僅僅一句「歡迎回來」——',
      '這就是家。'
    ].join('\n')
  },
  {
    id: 4 * 3,
    name: '夜靈宮',
    description: '獲得祝福：防禦強化。',
    effect: (user) => {
      user.blessings.push(new DefUp().id)
    },
    story: [
      '那曾是超越人智的偉業，真正意義上的鬼斧神工。',
      '它的壁壘堅如磐石，卻有著寶石般璀璨奪目的色澤。',
      '「我喜歡在軟綿綿的床上打滾～」——無形之星靈',
      '「優質的隔音、恆溫系統、寬敞的異空間，簡直為偶像量身訂製！」——冠之星靈',
      '「但最令我開心的，果然還是小環為了我們建造住所的這份心意吧。」——鰭之星靈',
      '直至今日，星靈們眺望這片廢墟時仍會回想起曾經的美好。'
    ].join('\n')
  },
  {
    id: 5 * 3,
    name: '真誠的假情報',
    description: '獲得祝福：攻擊強化。',
    effect: (user) => {
      user.blessings.push(new AtkUp().id)
    },
    story: [
      '情報，尤其是真心誠意的情報，',
      '往往伴隨你無法想像的代價。',
      '哪怕，這份代價遠超其值。',
      '「我已經陪你玩耍74小時又14分鐘了，該告訴我型態腳本的情報了吧……」——環之星靈',
      '「無形說啊，型態腳本啊，它其實是一種腳本唷！」——牙之星靈',
    ].join('\n')
  },
  {
    id: 6 * 3,
    name: '偶像的心願',
    description: '將武器替換為麥克風。',
    effect: (user) => {
      user.weapon = new Microphone().id
    },
    story: [
      '那是祂第一次對環之星靈提出請求，也是唯一的一次。',
      '環之星靈知道，這是祂活著的意義，存在的價值。',
      '因此——',
      '「放心，我會為你打造音質最好的高級麥克風！」——環之星靈',
      '「啊，普通的就好，謝謝。」——冠之星靈'
    ].join('\n')
  },
  {
    id: 7 * 3,
    name: '演唱會',
    description: '獲得祝福：治癒專精。',
    effect: (user) => {
      user.blessings.push(new HealMaster().id)
    },
    story: [
      '環之星靈提供設備、牙之星靈打鼓、無形之星靈玩吉他、鰭之星靈彈電子琴。',
      '在夥伴們的協力之下，冠之星靈的歌聲劃破宇宙的寧靜，響徹全世界。',
      '「叫你打鼓不是毆打鼓！還有吉他不是拿來騎的！」——環之星靈',
      '「啊啊啊！你們不要虐待我的高級樂器呀！」——環之星靈',
      '看著如此默契絕佳的演出，台下的爪之星靈鬆開握著雪餅的雙手，臉上只有驚呆。'
    ].join('\n')
  },
  {
    id: 8 * 3,
    name: '生命之泉',
    description: '獲得祝福：生命強化。',
    effect: (user) => {
      user.blessings.push(new HealthMaster().id)
    },
    story: [
      '古代遺跡中發現的泉水，其中能感受到生生不息的能量，就好像泉水是活著的一樣。',
      '「鰭姊跟環姊都不在這裡，我們沒辦法分辨這水能不能喝。」——牙之星靈',
      '「沒有甚麼水是不能喝的喔。」——無形之星靈',
      '「咦！真的嗎？」——牙之星靈',
      '「只是有些一輩子只能喝一次。」——無形之星靈'
    ].join('\n')
  }
]

export const rareEvents: Event[] = [
  {
    id: 0 * 3 + 1,
    name: '研究報告',
    description: '獲得祝福：毒專精。',
    effect: (user) => {
      user.blessings.push(new PoisonMaster().id)
    },
    story: [
      '環之星靈畢生所做的研究。',
      '其技術水平遠遠超越現代科學家的理解範圍，價值無法衡量。',
      '研究主題以《型態腳本（TypeScript）》為主，據說只要掌握它便能支配這個世界。',
      '除此之外，也有包含《定型無形的方法》、《農藥對齧齒類的效果》、《我可能不是人但你是真的狗》等其他論文。'
    ].join('\n')
  },
  {
    id: 1 * 3 + 1,
    name: '星狩戰爭',
    description: '將武器替換為能量劍。',
    effect: (user) => {
      user.weapon = new EnergySword().id
    },
    story: [
      '那是史上規模最大的一場入侵。',
      '星際中的各股勢力，為了掌握傳說中的創世之鍵「形態腳本」組成聯軍，企圖搶奪環之星靈的研究成果。',
      '然而被記入歷史的卻只有一位星靈負傷，聯軍全滅這一結果。',
      '對於戰爭的過程，沒有任何史料做出描寫，就好像被某種神祕力量抹去一般。',
      '「可以欺負爪、牙，可以捉弄冠、環，但唯獨不要招惹鰭姊。」——無形之星靈',
    ].join('\n')
  },
  {
    id: 2 * 3 + 1,
    name: '熱情如火',
    description: '獲得祝福：火專精',
    effect: (user) => {
      user.blessings.push(new FireMaster().id)
    },
    story: [
      '天真、爛漫、享受當下，這些都是牙之星靈的代稱。',
      '祂重視每一位玩伴，祂的真誠也贏得同伴們的好感。',
      '然而，就算是再要好的朋友，也有忙碌而顧不上自己的時候。',
      '「你說環忙著研究沒空陪你玩？嘻嘻，那你用情報買下祂的時間呀。」——無形之星靈',
    ].join('\n')
  },
  {
    id: 3 * 3 + 1,
    name: '鐵山靠',
    description: '獲得祝福：物理專精。',
    effect: (user) => {
      user.blessings.push(new PhysicMaster().id)
    },
    story: [
      '→←↓→←↑→←↓→',
      '只因你太美♪',
      '⤵↑⇊ →←→←',
      '只因你太美♪ Baby♪',
      '↖↘↙↘↓↑↓⇈',
      '只因你實在是太美♪'
    ].join('\n')
  },
  {
    id: 4 * 3 + 1,
    name: '一驚一乍',
    description: '獲得祝福：大地專精。',
    effect: (user) => {
      user.blessings.push(new GroundMaster().id)
    },
    story: [
      '有人認為祂穩如老狗，天塌下來都不為所動；',
      '有人認為祂孤高冷漠，對世俗紅塵不屑一顧。',
      '但其實，祂就只是被嚇到了。',
      '「……」——爪之星靈'
    ].join('\n')
  },
  {
    id: 5 * 3 + 1,
    name: '柔和、澄澈、源源不絕',
    description: '獲得祝福：水專精。',
    effect: (user) => {
      user.blessings.push(new WaterMaster().id)
    },
    story: [
      '每逢星靈之間發生爭執，祂總是巧妙地安撫雙方情緒，傾聽問題的癥結，並提出解決的方案。',
      '祂對誰都是如此溫柔，只要是願意留在祂身邊的，都是祂最重要的珍寶。',
      '祂重視身邊的每一份羈絆。',
      '「比起鰭自己受到的傷害，祂更不能容忍身邊的人受到欺侮。」——冠之星靈'
    ].join('\n')
  },
  {
    id: 6 * 3 + 1,
    name: '謎之兵馬俑 (1)',
    description: '將武器替換為堅岩之甲',
    effect: (user) => {
      user.weapon = new RockArmor().id
    },
    story: [
      '那是爪之星靈從地底挖出的上古遺物，年代甚至可追溯到星靈們成為星靈之前。',
      '由於其為相貌酷似士兵與戰馬的陶俑，因此被星靈們稱呼為兵馬俑。',
      '從馬俑身上取下的戰甲蘊含著大地的力量。'
    ].join('\n')
  },
  {
    id: 7 * 3 + 1,
    name: '謎之兵馬俑 (2)',
    description: '將武器替換為衝鋒長槍',
    effect: (user) => {
      user.weapon = new Spear().id
    },
    story: [
      '那是爪之星靈從地底挖出的上古遺物，年代甚至可追溯到星靈們成為星靈之前。',
      '由於其為相貌酷似士兵與戰馬的陶俑，因此被星靈們稱呼為兵馬俑。',
      '從兵俑身上取下的長槍滿溢強悍的威壓感。'
    ].join('\n')
  },
  {
    id: 7 * 3 + 1,
    name: '謎之兵馬俑 (3)',
    description: '隨機獻祭一個普通或稀有的祝福，獲得一個隨機的傳奇的武器、道具或祝福。',
    effect: (user) => {
      if (user.blessings.length > 0) {
        const randomRemoveIndex = Math.floor(Math.random() * user.blessings.length)
        user.blessings.splice(randomRemoveIndex, 1)
      }

      const randomAddIndex = Math.floor(Math.random() * legendEvents.length)
      const event = legendEvents[randomAddIndex]
      event.effect(user)
    },
    story: [
      '那是爪之星靈從地底挖出的上古遺物，年代甚至可追溯到✺們成為✺之前。',
      '由於其為相貌⏃ ⍿ ⏂ 與戰馬的⍨ ⍭，因此4̸̡̖̱̏̏̿̓̈͘7̵̲̈̀̈́͒͌̿̒̍͗͆̚͝8̶̠͚̯͕̰̘̭̱̽̊̈́͌̄̑͋̐͐̈́̒̓͘͝5̸̨̩̺̈́̾̈́̇̓̋̎̚',
      'Ä̷̢̜̤́̓̏̓̽͑̌͑̓B̶̛͍̠͐̎̔͑͆̌͑͊̽̿̇͝C̵̨̢̲̭̬̮̘͙̍̇͋̾̊̒̌͊̽̈̚͘F̴̛̻̼͔̱̯̘̯̾̈͑͑̽̏̌͘͝ͅG̵̡̪̿̏̿̊͂̆̚H̴̺͇͍͛̔̾̾̇̐̒͆Ä̷̢̜̤́̓̏̓̽͑̌͑̓B̶̛͍̠͐̎̔͑͆̌͑͊̽̿̇͝C̵̨̢̲̭̬̮̘͙̍̇͋̾̊̒̌͊̽̈̚͘F̴̛̻̼͔̱̯̘̯̾̈͑͑̽̏̌͘͝ͅG̵̡̪̿̏̿̊͂̆̚H̴̺͇͍͛̔̾̾̇̐̒͆Ä̷̢̜̤́̓̏̓̽͑̌͑̓B̶̛͍̠͐̎̔͑͆̌͑͊̽̿̇͝C̵̨̢̲̭̬̮̘͙̍̇͋̾̊̒̌͊̽̈̚͘F̴̛̻̼͔̱̯̘̯̾̈͑͑̽̏̌͘͝ͅG̵̡̪̿̏̿̊͂̆̚H̴̺͇͍͛̔̾̾̇̐̒͆',
    ].join('\n')
  },
  {
    id: 8 * 3 + 1,
    name: '撈金魚',
    description: '將武器替換為紙網。',
    effect: (user) => {
      user.weapon = new ScoopingNet().id
    },
    story: [
      '祭典，那是古今中外乃至比銀河系更加遙遠的地方都不可或缺的活動。',
      '星靈們活用自己的專業，擺攤為訪客提供娛樂。',
      '只是誰也沒想到，鰭之星靈的攤位竟是撈金魚。'
    ].join('\n')
  },
  {
    id: 8 * 3 + 1,
    name: '氣運之子',
    description: '獲得祝福：暴擊強化。',
    effect: (user) => {
      user.blessings.push(new CriticalMaster().id)
    },
    story: [
      '猜拳，是一個理論上1/3機率贏，1/3機率平手，1/3機率輸的遊戲。',
      '就算考慮到個人習慣等因素，通常來說也不會有完全一面倒的情況，但那終究只是通常情況。',
      '「能在猜拳贏過小牙的，恐怕只有不需要依靠運氣的小無形吧。」——鰭之星靈',
    ].join('\n')
  }
]

export const legendEvents: Event[] = [
  {
    id: 0 * 3 + 2,
    name: '銀河之始',
    description: '將武器替換為超新星。',
    effect: (user) => {
      user.weapon
    },
    story: [
      '這片彩繪天空的朦朧光帶，有如鑽石雨般閃耀，華麗、浪漫、美。',
      '它為詩人創作無數詩篇，捕獲天文愛好者的目光，但卻沒有人知道它真正的起源。',
      '「我與你們這些四隻腳的畜生不共載天！」——環之星靈',
      '那是星核炸裂成漫天淚光前，環之星靈欲絕的吶喊。',
    ].join('\n')
  },
  {
    id: 1 * 3 + 2,
    name: '古神遺跡',
    description: '將武器替換為古神之杖。',
    effect: (user) => {
      user.weapon = new ancientSpriteWand().id
    },
    story: [
      '那是爪之星靈從地底挖出的上古遺跡，年代甚至可追溯到星靈們成為星靈之前。',
      '遺跡散發著詭異的氛圍，沒有人能保障探險者的安全。',
      '但風險總伴隨富貴而存在，相信一定會有絕世珍寶沉眠於遺跡的盡頭。'
    ].join('\n')
  }
]

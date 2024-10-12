import { Sprite } from "@/app/common/configs/sprites"

class Option {
  constructor(
    public readonly text: string,
    public readonly sprites: Sprite['key'][]
  ) { }
}

export interface Question {
  text: string
  options: Option[]
}

export const questions: Question[] = [
  {
    text: '你覺得自己是一個外向還是內向的人？',
    options: [
      new Option('內向', ['cat', 'prairie-dog', 'snake']),
      new Option('外向', ['chikun', 'dog']),
      new Option('一般', ['fish']),
      new Option('我不知道', ['prairie-dog']),
    ]
  },
  {
    text: '當遇到挑戰時，你通常如何應對？',
    options: [
      new Option('先構思策略', ['fish', 'snake']),
      new Option('找朋友幫忙', ['fish', 'dog', 'chikun']),
      new Option('逃避不可恥', ['cat', 'prairie-dog']),
      new Option('正面上它', ['dog'])
    ]
  },
  {
    text: '你喜歡計畫未來還是更傾向隨遇而安？',
    options: [
      new Option('計畫未來', ['chikun', 'fish', 'snake']),
      new Option('隨遇而安', ['dog']),
      new Option('看我心情', ['cat']),
      new Option('我不知道', ['prairie-dog']),
    ]
  },
  {
    text: '你如何處理壓力或焦慮的情況？',
    options: [
      new Option('分析壓力源', ['snake']),
      new Option('找朋友傾訴', ['dog', 'fish']),
      new Option('無情開擺', ['prairie-dog', 'cat']),
      new Option('告訴自己：會贏喔', ['chikun', 'dog'])
    ]
  },
  {
    text: '在面對失敗時，你的第一個反應是什麼？',
    options: [
      new Option('驚慌失措', ['prairie-dog']),
      new Option('Don\'t mind!', ['dog', 'chikun', 'fish']),
      new Option('自我反省', ['fish', 'snake', 'chikun']),
      new Option('無情開擺', ['cat', 'prairie-dog'])
    ]
  },
  {
    text: '你更重視結果還是過程？',
    options: [
      new Option('結果', ['chikun', 'snake']),
      new Option('過程', ['dog', 'fish']),
      new Option('都重視', ['chikun', 'fish']),
      new Option('都不重視', ['cat', 'prairie-dog'])
    ]
  },
  {
    text: '如果讓你選擇，你更願意獨處還是和朋友一起度過時間？',
    options: [
      new Option('獨處', ['cat', 'prairie-dog', 'snake']),
      new Option('和朋友一起', ['chikun', 'dog', 'fish'])
    ]
  },
  {
    text: '你認為你的長處是什麼？',
    options: [
      new Option('熱絡氣氛', ['chikun', 'dog']),
      new Option('制定計畫', ['fish', 'snake']),
      new Option('治癒人心', ['cat', 'dog', 'prairie-dog']),
      new Option('毅力根性', ['chikun', 'dog', 'snake'])
    ]
  },
  {
    text: '你認為你的短處是什麼？',
    options: [
      new Option('脾氣不好', ['snake']),
      new Option('少根筋', ['dog', 'prairie-dog']),
      new Option('我行我素', ['cat']),
      new Option('優柔寡斷', ['fish'])
    ]
  },
  {
    text: '你如何表達自己的情感或需求？',
    options: [
      new Option('有話直說', ['dog']),
      new Option('暗示', ['fish', 'cat', 'chikun']),
      new Option('憋在心裡', ['snake']),
      new Option('無欲無求', ['prairie-dog'])
    ]
  },
  {
    text: '你覺得自己是個善於傾聽的人嗎？',
    options: [
      new Option('是', ['chikun', 'fish', 'dog']),
      new Option('不是', ['cat', 'snake']),
      new Option('不好說', ['prairie-dog']),
      new Option('不知道', [])
    ]
  },
  {
    text: '你經常感到焦慮或緊張嗎？',
    options: [
      new Option('是', ['snake']),
      new Option('不是', ['cat', 'dog', 'prairie-dog']),
      new Option('不一定', ['chikun', 'fish']),
      new Option('不知道', [])
    ]
  },
  {
    text: '當你感到悲傷時，你會選擇如何紓解情緒？',
    options: [
      new Option('轉換心情', ['dog', 'fish', 'snake']),
      new Option('找朋友傾訴', ['dog', 'fish', 'chikun']),
      new Option('時間會治療一切', ['prairie-dog']),
      new Option('自暴自棄', ['cat']),
    ]
  },
  {
    text: '通常是什麼引發你的憤怒？',
    options: [
      new Option('被人欺負', ['dog', 'chikun']),
      new Option('隊友在搞', ['snake']),
      new Option('重要的人被傷害', ['fish']),
      new Option('運氣太差', ['cat'])
    ]
  },
  {
    text: '當面臨重大選擇時，你會優先考慮什麼因素？',
    options: [
      new Option('經濟效益', ['snake']),
      new Option('開不開心', ['dog', 'cat', 'chikun']),
      new Option('道德倫理', ['fish']),
      new Option('小朋友才選擇', ['prairie-dog'])
    ]
  }
]

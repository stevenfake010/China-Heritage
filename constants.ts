import { HeritageSite } from './types';

// Updated to reflect the 59 sites as of late 2024 (including Beijing Central Axis and Badain Jaran Desert)
export const HERITAGE_SITES: HeritageSite[] = [
  {
    id: '1',
    name: '北京和沈阳的明清皇家宫殿',
    category: '文化遗产',
    province: '北京',
    coordinates: [116.3908, 39.9163],
    yearInscribed: 1987,
    description: '紫禁城和沈阳故宫是明清两代皇权的中心，见证了中国封建王朝的最后辉煌，建筑艺术登峰造极。',
    imageUrl: 'http://photonjmaz.photo.store.qq.com/psc?/V53T3JRj4GQzb92jF6Zg1RYYvO3wcHZt/LiySpxowE0yeWXwBdXN*SQ0crIt6ZJPn7Psnq9bSsLank4UWiQVMOSoAHrmFaEdv0RZSHRlyxvjbdHYP0l5QavFqa3hb8KVeC3DeBHWfS1c!/b&bo=OAQ4BAAAAAAHFzY!&rf=viewer_4&t=5'
  },
  {
    id: '2',
    name: '秦始皇陵及兵马俑坑',
    category: '文化遗产',
    province: '陕西',
    coordinates: [109.2786, 34.3841],
    yearInscribed: 1987,
    description: '被誉为“世界第八大奇迹”，成千上万的陶俑生动再现了秦军的阵列，是展示秦代军事力量和艺术水平的杰作。',
    imageUrl: 'https://picsum.photos/seed/terracotta/400/300'
  },
  {
    id: '3',
    name: '长城',
    category: '文化遗产',
    province: '北京', // Spanning many, pinned to Badaling
    coordinates: [116.0, 40.4319],
    yearInscribed: 1987,
    description: '人类历史上最伟大的建筑工程之一，蜿蜒万里的巨龙，见证了中国古代边疆防御体系的智慧与坚韧。',
    imageUrl: 'https://picsum.photos/seed/greatwall/400/300'
  },
  {
    id: '4',
    name: '莫高窟',
    category: '文化遗产',
    province: '甘肃',
    coordinates: [94.8174, 40.0392],
    yearInscribed: 1987,
    description: '坐落在丝绸之路的咽喉要地，拥有世界上规模最大、内容最丰富的佛教艺术地，壁画与彩塑令人叹为观止。',
    imageUrl: 'https://picsum.photos/seed/mogao/400/300'
  },
  {
    id: '5',
    name: '泰山',
    category: '混合遗产',
    province: '山东',
    coordinates: [117.1044, 36.2575],
    yearInscribed: 1987,
    description: '五岳之首，自古便是帝王封禅祭祀之地，融合了壮丽的自然景观与深厚的历史文化内涵。',
    imageUrl: 'https://picsum.photos/seed/taishan/400/300'
  },
  {
    id: '6',
    name: '周口店北京人遗址',
    category: '文化遗产',
    province: '北京',
    coordinates: [115.9054, 39.6913],
    yearInscribed: 1987,
    description: '这里发现了“北京人”头盖骨，为人类进化史的研究提供了极其重要的实物依据。',
    imageUrl: 'https://picsum.photos/seed/zhoukoudian/400/300'
  },
  {
    id: '7',
    name: '黄山',
    category: '混合遗产',
    province: '安徽',
    coordinates: [118.1764, 30.1311],
    yearInscribed: 1990,
    description: '“五岳归来不看山，黄山归来不看岳”。奇松、怪石、云海、温泉、冬雪“五绝”闻名天下。',
    imageUrl: 'https://picsum.photos/seed/huangshan/400/300'
  },
  {
    id: '8',
    name: '九寨沟风景名胜区',
    category: '自然遗产',
    province: '四川',
    coordinates: [103.9186, 33.2600],
    yearInscribed: 1992,
    description: '童话世界般的景色，以翠海、叠瀑、彩林、雪峰、藏情、蓝冰“六绝”著称，水景之美甲天下。',
    imageUrl: 'https://picsum.photos/seed/jiuzhai/400/300'
  },
  {
    id: '9',
    name: '黄龙风景名胜区',
    category: '自然遗产',
    province: '四川',
    coordinates: [103.8272, 32.7533],
    yearInscribed: 1992,
    description: '以彩池、雪山、峡谷、森林“四绝”著称于世，巨型钙华坡谷如一条金色巨龙蜿蜒于雪山密林之中。',
    imageUrl: 'https://picsum.photos/seed/huanglong/400/300'
  },
  {
    id: '10',
    name: '武陵源风景名胜区',
    category: '自然遗产',
    province: '湖南',
    coordinates: [110.4167, 29.35],
    yearInscribed: 1992,
    description: '张家界的核心，拥有奇特的石英砂岩峰林地貌，三千奇峰拔地而起，八百秀水蜿蜒其间。',
    imageUrl: 'https://picsum.photos/seed/wulingyuan/400/300'
  },
  {
    id: '11',
    name: '承德避暑山庄及其周围寺庙',
    category: '文化遗产',
    province: '河北',
    coordinates: [117.9388, 40.9877],
    yearInscribed: 1994,
    description: '清代皇帝的夏宫，中国现存最大的古典皇家园林，融合了汉式宫殿与蒙藏风格的寺庙建筑。',
    imageUrl: 'https://picsum.photos/seed/chengde/400/300'
  },
  {
    id: '12',
    name: '曲阜孔庙、孔林和孔府',
    category: '文化遗产',
    province: '山东',
    coordinates: [116.9897, 35.5969],
    yearInscribed: 1994,
    description: '儒家文化的发源地，纪念中国古代伟大思想家孔子的圣地，建筑规模宏大，文化积淀深厚。',
    imageUrl: 'https://picsum.photos/seed/confucius/400/300'
  },
  {
    id: '13',
    name: '武当山古建筑群',
    category: '文化遗产',
    province: '湖北',
    coordinates: [111.0067, 32.4005],
    yearInscribed: 1994,
    description: '中国道教圣地，其古建筑群展示了中国元、明、清三代在建筑和艺术上的极高成就。',
    imageUrl: 'https://picsum.photos/seed/wudang/400/300'
  },
  {
    id: '14',
    name: '拉萨布达拉宫历史建筑群',
    category: '文化遗产',
    province: '西藏',
    coordinates: [91.1189, 29.6556],
    yearInscribed: 1994,
    description: '藏传佛教的圣地，包含布达拉宫、大昭寺和罗布林卡，是西藏政教合一统治的象征。',
    imageUrl: 'https://picsum.photos/seed/potala/400/300'
  },
  {
    id: '15',
    name: '庐山国家公园',
    category: '文化遗产',
    province: '江西',
    coordinates: [115.9894, 29.5630],
    yearInscribed: 1996,
    description: '中华文明的发祥地之一，以雄、奇、险、秀闻名，且融合了深厚的宗教、教育和政治历史背景。',
    imageUrl: 'https://picsum.photos/seed/lushan/400/300'
  },
  {
    id: '16',
    name: '峨眉山风景区及乐山大佛风景区',
    category: '混合遗产',
    province: '四川',
    coordinates: [103.3283, 29.5600],
    yearInscribed: 1996,
    description: '普贤菩萨道场，秀甲天下；乐山大佛依山而凿，是世界上最大的石刻佛像。',
    imageUrl: 'https://picsum.photos/seed/emei/400/300'
  },
  {
    id: '17',
    name: '平遥古城',
    category: '文化遗产',
    province: '山西',
    coordinates: [112.19, 37.20],
    yearInscribed: 1997,
    description: '中国保存最为完好的四大古城之一，完整展示了明清时期汉族城市的社会形态和经济繁荣。',
    imageUrl: 'https://picsum.photos/seed/pingyao/400/300'
  },
  {
    id: '18',
    name: '苏州古典园林',
    category: '文化遗产',
    province: '江苏',
    coordinates: [120.6195, 31.3256],
    yearInscribed: 1997,
    description: '咫尺之内再造乾坤，中国文人写意山水园林的典范，虽由人作，宛自天开。',
    imageUrl: 'https://picsum.photos/seed/suzhou/400/300'
  },
  {
    id: '19',
    name: '丽江古城',
    category: '文化遗产',
    province: '云南',
    coordinates: [100.2300, 26.8700],
    yearInscribed: 1997,
    description: '融合了纳西族文化与汉、藏等民族文化精华的历史名城，小桥流水，布局独特。',
    imageUrl: 'https://picsum.photos/seed/lijiang/400/300'
  },
  {
    id: '20',
    name: '北京皇家园林－颐和园',
    category: '文化遗产',
    province: '北京',
    coordinates: [116.2731, 39.9997],
    yearInscribed: 1998,
    description: '中国古典园林之首，利用昆明湖、万寿山为基址，汲取江南园林的设计手法而建成。',
    imageUrl: 'https://picsum.photos/seed/summerpalace/400/300'
  },
  {
    id: '21',
    name: '北京皇家祭坛－天坛',
    category: '文化遗产',
    province: '北京',
    coordinates: [116.4072, 39.8822],
    yearInscribed: 1998,
    description: '明清两代皇帝“祭天”“祈谷”的场所，布局严谨，建筑结构奇特，象征着“天圆地方”。',
    imageUrl: 'https://picsum.photos/seed/templeheaven/400/300'
  },
  {
    id: '22',
    name: '大足石刻',
    category: '文化遗产',
    province: '重庆',
    coordinates: [105.7833, 29.7000],
    yearInscribed: 1999,
    description: '唐末宋初时期的摩崖石刻，以宝顶山、北山石刻最为著名，融合了佛教、道教和儒教文化。',
    imageUrl: 'https://picsum.photos/seed/dazu/400/300'
  },
  {
    id: '23',
    name: '武夷山',
    category: '混合遗产',
    province: '福建',
    coordinates: [117.9575, 27.7303],
    yearInscribed: 1999,
    description: '典型的丹霞地貌，也是朱子理学的摇篮，生物多样性丰富，九曲溪风光旖旎。',
    imageUrl: 'https://picsum.photos/seed/wuyishan/400/300'
  },
  {
    id: '24',
    name: '青城山－都江堰',
    category: '文化遗产',
    province: '四川',
    coordinates: [103.6000, 31.0000],
    yearInscribed: 2000,
    description: '青城山是中国道教发源地之一；都江堰是全世界迄今为止，年代最久、唯一留存、仍在一直使用的宏大水利工程。',
    imageUrl: 'https://picsum.photos/seed/qingcheng/400/300'
  },
  {
    id: '25',
    name: '皖南古村落－西递、宏村',
    category: '文化遗产',
    province: '安徽',
    coordinates: [117.9856, 30.0039],
    yearInscribed: 2000,
    description: '被誉为“中国画里的乡村”，保持了中国封建社会后期的村落形态，徽派建筑的杰出代表。',
    imageUrl: 'https://picsum.photos/seed/hongcun/400/300'
  },
  {
    id: '26',
    name: '龙门石窟',
    category: '文化遗产',
    province: '河南',
    coordinates: [112.4694, 34.5539],
    yearInscribed: 2000,
    description: '中国石刻艺术宝库之一，展现了北魏至唐代皇家造像的宏大风范，卢舍那大佛气势磅礴。',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Longmen_Grottoes_Fengxian_Temple_20201003.jpg/800px-Longmen_Grottoes_Fengxian_Temple_20201003.jpg'
  },
  {
    id: '27',
    name: '明清皇家陵寝',
    category: '文化遗产',
    province: '河北', // Multi-province, pinned to East Qing Tombs
    coordinates: [115.35, 40.12],
    yearInscribed: 2000,
    description: '分布在河北、北京、江苏、湖北等地的明清帝王陵寝，代表了中国古代陵寝建筑艺术的最高成就。',
    imageUrl: 'https://picsum.photos/seed/mingtombs/400/300'
  },
  {
    id: '28',
    name: '云冈石窟',
    category: '文化遗产',
    province: '山西',
    coordinates: [113.1311, 40.1097],
    yearInscribed: 2001,
    description: '公元5世纪的佛教艺术杰作，石雕造像气势宏大，内容丰富，展现了中西文化融合的风格。',
    imageUrl: 'https://picsum.photos/seed/yungang/400/300'
  },
  {
    id: '29',
    name: '云南三江并流保护区',
    category: '自然遗产',
    province: '云南',
    coordinates: [99.0000, 27.0000],
    yearInscribed: 2003,
    description: '金沙江、澜沧江、怒江三条大江在此平行北流，形成了世界上罕见的高山峡谷地貌。',
    imageUrl: 'https://picsum.photos/seed/sanjiang/400/300'
  },
  {
    id: '30',
    name: '高句丽王城、王陵及贵族墓葬',
    category: '文化遗产',
    province: '吉林',
    coordinates: [126.1833, 41.1500],
    yearInscribed: 2004,
    description: '见证了高句丽政权的历史发展，其山城建筑和墓葬壁画具有极高的历史和艺术价值。',
    imageUrl: 'https://picsum.photos/seed/koguryo/400/300'
  },
  {
    id: '31',
    name: '澳门历史城区',
    category: '文化遗产',
    province: '澳门',
    coordinates: [113.5439, 22.1930],
    yearInscribed: 2005,
    description: '中国境内现存年代最远、规模最大、保存最完整和最集中的中西建筑互相辉映的历史城区。',
    imageUrl: 'https://picsum.photos/seed/macau/400/300'
  },
  {
    id: '32',
    name: '殷墟',
    category: '文化遗产',
    province: '河南',
    coordinates: [114.3333, 36.1333],
    yearInscribed: 2006,
    description: '商代晚期的都城遗址，甲骨文的出土地，证实了中国商代历史的存在，青铜器出土丰富。',
    imageUrl: 'https://picsum.photos/seed/yinxu/400/300'
  },
  {
    id: '33',
    name: '四川大熊猫栖息地',
    category: '自然遗产',
    province: '四川',
    coordinates: [103.0000, 30.8333],
    yearInscribed: 2006,
    description: '全球最大最完整的大熊猫栖息地，保护了这一古老活化石及其赖以生存的生态环境。',
    imageUrl: 'https://picsum.photos/seed/panda/400/300'
  },
  {
    id: '34',
    name: '中国南方喀斯特',
    category: '自然遗产',
    province: '云南', // Multi-province, pinned to Shilin
    coordinates: [103.3236, 24.8144],
    yearInscribed: 2007,
    description: '世界上最壮观的湿热带-亚热带喀斯特景观之一，包括云南石林、贵州荔波、重庆武隆等地。',
    imageUrl: 'https://picsum.photos/seed/karst/400/300'
  },
  {
    id: '35',
    name: '开平碉楼与村落',
    category: '文化遗产',
    province: '广东',
    coordinates: [112.55, 22.28],
    yearInscribed: 2007,
    description: '集防卫、居住和中西建筑艺术于一体的多层塔楼式建筑，是华侨文化的独特见证。',
    imageUrl: 'https://picsum.photos/seed/kaiping/400/300'
  },
  {
    id: '36',
    name: '福建土楼',
    category: '文化遗产',
    province: '福建',
    coordinates: [117.0000, 24.5000],
    yearInscribed: 2008,
    description: '独一无二的山区大型夯土民居建筑，功能齐全，布局合理，体现了客家人聚族而居的传统。',
    imageUrl: 'https://picsum.photos/seed/tulou/400/300'
  },
  {
    id: '37',
    name: '三清山国家公园',
    category: '自然遗产',
    province: '江西',
    coordinates: [118.0667, 28.9167],
    yearInscribed: 2008,
    description: '以独特的花岗岩峰林地貌著称，展示了非凡的自然美，云雾缭绕中如仙境一般。',
    imageUrl: 'https://picsum.photos/seed/sanqingshan/400/300'
  },
  {
    id: '38',
    name: '五台山',
    category: '文化遗产',
    province: '山西',
    coordinates: [113.5500, 39.0167],
    yearInscribed: 2009,
    description: '中国佛教四大名山之首，文殊菩萨道场，保存了大量的古代木结构建筑和佛教造像。',
    imageUrl: 'https://picsum.photos/seed/wutaishan/400/300'
  },
  {
    id: '39',
    name: '“天地之中”历史建筑群',
    category: '文化遗产',
    province: '河南',
    coordinates: [113.0333, 34.4500],
    yearInscribed: 2010,
    description: '位于嵩山腹地，包括少林寺、嵩阳书院等，展示了中国古代礼制、宗教、科技和教育的成就。',
    imageUrl: 'https://picsum.photos/seed/songshan/400/300'
  },
  {
    id: '40',
    name: '中国丹霞',
    category: '自然遗产',
    province: '贵州', // Multi-province, pinned to Chishui
    coordinates: [106.0000, 28.5000],
    yearInscribed: 2010,
    description: '由红色砂砾岩在水作用下形成的丹崖赤壁地貌，色彩斑斓，形态各异。',
    imageUrl: 'https://picsum.photos/seed/danxia/400/300'
  },
  {
    id: '41',
    name: '杭州西湖文化景观',
    category: '文化遗产',
    province: '浙江',
    coordinates: [120.1408, 30.2458],
    yearInscribed: 2011,
    description: '著名的淡水湖景观，其堤、岛、桥、塔与周围群山交相辉映，是“天人合一”哲学的完美体现。',
    imageUrl: 'https://picsum.photos/seed/westlake/400/300'
  },
  {
    id: '42',
    name: '元上都遗址',
    category: '文化遗产',
    province: '内蒙古',
    coordinates: [116.1833, 42.3500],
    yearInscribed: 2012,
    description: '元代夏都，见证了蒙元帝国游牧文明与农耕文明的融合，布局独特。',
    imageUrl: 'https://picsum.photos/seed/xanadu/400/300'
  },
  {
    id: '43',
    name: '澄江化石地',
    category: '自然遗产',
    province: '云南',
    coordinates: [102.9333, 24.6667],
    yearInscribed: 2012,
    description: '寒武纪生命大爆发的见证，保存了大量保存精美的早期动物化石，揭示了动物生命演化的早期历史。',
    imageUrl: 'https://picsum.photos/seed/chengjiang/400/300'
  },
  {
    id: '44',
    name: '新疆天山',
    category: '自然遗产',
    province: '新疆',
    coordinates: [88.0, 43.8],
    yearInscribed: 2013,
    description: '拥有壮美的雪峰冰川、森林草甸和河流湖泊，展示了独特的自然美和生态过程。',
    imageUrl: 'https://picsum.photos/seed/tianshan/400/300'
  },
  {
    id: '45',
    name: '红河哈尼梯田文化景观',
    category: '文化遗产',
    province: '云南',
    coordinates: [102.7333, 23.0833],
    yearInscribed: 2013,
    description: '哈尼族人世世代代在哀牢山雕刻出的山水画卷，展现了人与自然和谐共生的农业文明奇迹。',
    imageUrl: 'https://picsum.photos/seed/hani/400/300'
  },
  {
    id: '46',
    name: '大运河',
    category: '文化遗产',
    province: '江苏', // Multi, pinned to Yangzhou
    coordinates: [119.4129, 32.3942],
    yearInscribed: 2014,
    description: '世界上最长、最古老的人工水道，沟通了南北交通，促进了中国经济文化的交流与发展。',
    imageUrl: 'https://picsum.photos/seed/grandcanal/400/300'
  },
  {
    id: '47',
    name: '丝绸之路：长安－天山廊道的路网',
    category: '文化遗产',
    province: '陕西', // Multi, pinned to Chang'an start
    coordinates: [108.9398, 34.3416],
    yearInscribed: 2014,
    description: '古代东西方文明交流的桥梁，沿线遗迹众多，见证了长达数个世纪的贸易与文化传播。',
    imageUrl: 'https://picsum.photos/seed/silkroad/400/300'
  },
  {
    id: '48',
    name: '土司遗址',
    category: '文化遗产',
    province: '湖南', // Multi: Hunan, Hubei, Guizhou
    coordinates: [109.9667, 28.9667],
    yearInscribed: 2015,
    description: '见证了中国古代对西南少数民族地区实行的“土司制度”，体现了国家统一与民族自治的结合。',
    imageUrl: 'https://picsum.photos/seed/tusi/400/300'
  },
  {
    id: '49',
    name: '左江花山岩画文化景观',
    category: '文化遗产',
    province: '广西',
    coordinates: [107.0333, 22.2500],
    yearInscribed: 2016,
    description: '壮族先民在悬崖峭壁上绘制的赭红色岩画，场面宏大，反映了骆越古国的祭祀文化。',
    imageUrl: 'https://picsum.photos/seed/huashan/400/300'
  },
  {
    id: '50',
    name: '湖北神农架',
    category: '自然遗产',
    province: '湖北',
    coordinates: [110.5000, 31.5000],
    yearInscribed: 2016,
    description: '拥有北半球中纬度地区保存最完好的原始森林，生物多样性极其丰富，是“野人”传说的发源地。',
    imageUrl: 'https://picsum.photos/seed/shennongjia/400/300'
  },
  {
    id: '51',
    name: '青海可可西里',
    category: '自然遗产',
    province: '青海',
    coordinates: [92.0000, 35.0000],
    yearInscribed: 2017,
    description: '世界上海拔最高、面积最大的高原湿地生态系统之一，藏羚羊等野生动物的天堂。',
    imageUrl: 'https://picsum.photos/seed/hohxil/400/300'
  },
  {
    id: '52',
    name: '鼓浪屿：历史国际社区',
    category: '文化遗产',
    province: '福建',
    coordinates: [118.0667, 24.4500],
    yearInscribed: 2017,
    description: '“万国建筑博览”，见证了近代中外多元文化的碰撞与融合，环境优雅，琴声悠扬。',
    imageUrl: 'https://picsum.photos/seed/kulangsu/400/300'
  },
  {
    id: '53',
    name: '梵净山',
    category: '自然遗产',
    province: '贵州',
    coordinates: [108.6975, 27.9083],
    yearInscribed: 2018,
    description: '武陵山脉的主峰，宛如一座生态孤岛，保存了亚热带孤岛山岳生态系统和珍稀物种黔金丝猴。',
    imageUrl: 'https://picsum.photos/seed/fanjingshan/400/300'
  },
  {
    id: '54',
    name: '良渚古城遗址',
    category: '文化遗产',
    province: '浙江',
    coordinates: [119.9833, 30.3833],
    yearInscribed: 2019,
    description: '实证中华五千年文明史的圣地，拥有宏大的城址、复杂的水利系统和精美的玉器。',
    imageUrl: 'https://picsum.photos/seed/liangzhu/400/300'
  },
  {
    id: '55',
    name: '中国黄（渤）海候鸟栖息地（第一期）',
    category: '自然遗产',
    province: '江苏',
    coordinates: [120.8333, 32.9667],
    yearInscribed: 2019,
    description: '东亚-澳大利西亚候鸟迁飞区的重要枢纽，为数百万候鸟提供了宝贵的停歇地。',
    imageUrl: 'https://picsum.photos/seed/ylt/400/300'
  },
  {
    id: '56',
    name: '泉州：宋元中国的世界海洋商贸中心',
    category: '文化遗产',
    province: '福建',
    coordinates: [118.5833, 24.9167],
    yearInscribed: 2021,
    description: '宋元时期“东方第一大港”，多元宗教与文化共存，见证了海上丝绸之路的繁荣。',
    imageUrl: 'https://picsum.photos/seed/quanzhou/400/300'
  },
  {
    id: '57',
    name: '普洱景迈山古茶林文化景观',
    category: '文化遗产',
    province: '云南',
    coordinates: [99.9961, 22.1819],
    yearInscribed: 2023,
    description: '全球首个茶主题世界文化遗产，展现了布朗族等民族“林茶共生、人地和谐”的智慧。',
    imageUrl: 'https://picsum.photos/seed/jingmai/400/300'
  },
  {
    id: '58',
    name: '巴丹吉林沙漠－沙山湖泊群',
    category: '自然遗产',
    province: '内蒙古',
    coordinates: [102.3333, 39.8333],
    yearInscribed: 2024,
    description: '拥有世界最高的固定沙丘和密集的沙漠湖泊，风光独特，被誉为“上帝画下的曲线”。',
    imageUrl: 'https://picsum.photos/seed/badain/400/300'
  },
  {
    id: '59',
    name: '北京中轴线——中国理想都城秩序的杰作',
    category: '文化遗产',
    province: '北京',
    coordinates: [116.3916, 39.9055],
    yearInscribed: 2024,
    description: '纵贯北京老城南北，全长7.8公里，统领了整个城市的规划格局，是中国传统都城中轴线发展的集大成者。',
    imageUrl: 'https://picsum.photos/seed/centralaxis/400/300'
  }
];
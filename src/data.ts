export type Character =
  | "All"
  | "Chris Redfield"
  | "Jill Valentine"
  | "Leon S. Kennedy"
  | "Claire Redfield"
  | "Ada Wong"
  | "Ethan Winters"
  | "Grace Ashcroft";

export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  games: string[];
  characters: Character[];
  summary: string;
}

export const characters: Character[] = [
  "All",
  "Chris Redfield",
  "Jill Valentine",
  "Leon S. Kennedy",
  "Claire Redfield",
  "Ada Wong",
  "Ethan Winters",
  "Grace Ashcroft",
];

export const characterPortraits: Record<Character, string> = {
  All: "https://picsum.photos/seed/re_umbrella/400/300?blur=2",
  "Chris Redfield": "https://www.evilresource.com/images/data/full/re4remake/ada-wong.png?d1dc819e",
  "Jill Valentine": "https://static.wikia.nocookie.net/zombie/images/8/87/Jill_Valentine.jpeg/revision/latest/scale-to-width-down/1000?cb=20231211232818",
  "Leon S. Kennedy": "https://static.wikia.nocookie.net/residentevil/images/6/6d/RE_Requiem_-_Leon_Gun.jpeg/revision/latest/scale-to-width-down/1000?cb=20251212070936",
  "Claire Redfield": "https://static.wikia.nocookie.net/zombie/images/c/ce/Claire_Redfield.jpg/revision/latest?cb=20240922011202",
  "Ada Wong": "https://www.evilresource.com/images/data/full/re4remake/ada-wong.png?d1dc819e",
  "Ethan Winters": "https://static.wikia.nocookie.net/residentevil/images/d/d0/Resident_Evil_Village_Avatar_-_Influencer_Giveaway_07.png/revision/latest?cb=20210504015334",
  "Grace Ashcroft": "https://static.wikia.nocookie.net/residentevil/images/a/af/Grace_Main.png/revision/latest/scale-to-width-down/1000?cb=20250822194335",
};

export const gameOrder = [
  "RE0",
  "RE1",
  "RE2",
  "RE3",
  "RE Code: Veronica",
  "RE4",
  "RE5",
  "RE6",
  "RE7",
  "RE8",
  "RE9 Requiem",
];

export const locations: Location[] = [
  {
    id: "raccoon-city",
    name: "Raccoon City & Arklay Dağları",
    lat: 39.0,
    lng: -94.0,
    games: ["RE0", "RE1", "RE2", "RE3", "RE9 Requiem"],
    characters: [
      "Chris Redfield",
      "Jill Valentine",
      "Leon S. Kennedy",
      "Claire Redfield",
      "Ada Wong",
      "Grace Ashcroft",
    ],
    summary:
      "Kabusun başladığı yer. Arklay Dağları'ndaki o malikanede çakan kıvılcım, koca bir şehri küle çeviren nükleer bir felakete dönüştü. Şimdi sadece geçmişin hayaletleriyle dolu bir mezarlık, Leon ve Grace'in yollarının kesiştiği yer.",
  },
  {
    id: "rockfort-island",
    name: "Rockfort Adası",
    lat: -54.0,
    lng: -36.0,
    games: ["RE Code: Veronica"],
    characters: ["Claire Redfield", "Chris Redfield"],
    summary:
      "Claire'in demir parmaklıklar ardında Umbrella'nın gerçek yüzüyle tanıştığı ıssız bir ada. Wesker'ın intikam ateşiyle sarsılan bu tesis, T-Veronica virüsünün pençesinde yıkıma sürüklendi.",
  },
  {
    id: "valdelobos",
    name: "Valdelobos (Kırsal Köy)",
    lat: 41.0,
    lng: -4.0,
    games: ["RE4"],
    characters: ["Leon S. Kennedy", "Ada Wong"],
    summary:
      "İspanya'nın derinliklerinde zamanın durduğu bir köy. Los Iluminados tarikatı tarafından Las Plagas ile zehirlenen bu topraklar, Leon'un başkanın kızını kurtarmak için girdiği amansız bir hayatta kalma mücadelesine sahne oldu.",
  },
  {
    id: "kijuju",
    name: "Kijuju Otonom Bölgesi",
    lat: 9.0,
    lng: 8.0,
    games: ["RE5"],
    characters: ["Chris Redfield", "Jill Valentine"],
    summary:
      "Batı Afrika'nın kavurucu sıcağında, Uroboros'un gölgesinde bir kaos. Chris ve Jill, Wesker'ın evrim hayalini bir kabusa çevirmek için bu tozlu sokaklarda son bir savaş için durdular.",
  },
  {
    id: "tall-oaks",
    name: "Tall Oaks",
    lat: 40.0,
    lng: -79.0,
    games: ["RE6"],
    characters: ["Leon S. Kennedy", "Ada Wong"],
    summary:
      "Başkanın ölümüyle sarsılan bir Amerikan şehri. C-Virüsünün getirdiği yıkım koca bir toplumu Leon'un gözleri önünde canavarlara dönüştürürken, geriye sadece yanan binalar ve sonsuz bir yas kaldı.",
  },
  {
    id: "edonia",
    name: "Edonia",
    lat: 44.0,
    lng: 21.0,
    games: ["RE6"],
    characters: ["Chris Redfield", "Ada Wong"],
    summary:
      "İç savaşın pençesinde kıvranan bir Doğu Avrupa ülkesi. J'avo mutasyonlarının kol gezdiği bu karlı topraklarda BSAA en ağır bedellerinden birini ödedi.",
  },
  {
    id: "lanshiang",
    name: "Lanshiang",
    lat: 22.0,
    lng: 114.0,
    games: ["RE6"],
    characters: ["Leon S. Kennedy", "Chris Redfield", "Ada Wong"],
    summary:
      "Milyonların yaşadığı bir metropol bir gecede Neo Umbrella'nın biyoterörizm laboratuvarına dönüştü. Chris ve Leon, insanlığın son kalesini savunmak için bu neon ışıklı cehennemde omuz omuza durdular.",
  },
  {
    id: "dulvey",
    name: "Dulvey, Louisiana",
    lat: 30.0,
    lng: -91.0,
    games: ["RE7"],
    characters: ["Ethan Winters", "Chris Redfield"],
    summary:
      "Louisiana bataklıklarında Baker ailesinin çürüyen malikanesi. Kayıp karısını arayan Ethan Winters, kendini 'Küf' ve Eveline tarafından yaratılan, gerçeklik ve kabusun iç içe geçtiği o korku evinde buldu.",
  },
  {
    id: "the-village",
    name: "Köy",
    lat: 46.0,
    lng: 25.0,
    games: ["RE8"],
    characters: ["Ethan Winters", "Chris Redfield"],
    summary:
      "Romanya'nın karlı dağları arasında, Ana Miranda ve dört lordu tarafından yönetilen kadim bir köy. Megamiset'in kök saldığı bu topraklar, Ethan'ın kızını kurtarmak için verdiği son ve en trajik mücadelenin sessiz tanığıdır.",
  },
];

export interface Virus {
  id: string;
  name: string;
  creator: string;
  year: string;
  color: string;
  description: string;
  symptoms: string;
}

export const viruses: Virus[] = [
  {
    id: "progenitor",
    name: "Progenitor Virüsü",
    creator: "Ana Miranda / Umbrella Kurucuları",
    year: "1966",
    color: "#a8a29e",
    description:
      "Batı Afrika'nın derinliklerinde 'Güneşin Merdiveni' çiçeğinin özünde saklı kadim bir güç. Umbrella'nın temellerini atan bu virüs, insan evrimini zorlayan tüm biyolojik felaketlerin atasıdır.",
    symptoms:
      "Hücresel yapıda aşırı mutasyon ve fiziksel güçte artış. Ancak çoğu denek için bu süreç genetik uyumsuzluk nedeniyle hızlı bir ölümle sonuçlanır.",
  },
  {
    id: "t-virus",
    name: "T-Virüsü (Tyrant)",
    creator: "James Marcus / William Birkin",
    year: "1978",
    color: "#22c55e",
    description:
      "Progenitor virüsünün sülük DNA'sı ile harmanlanmasından doğan bir canavar. Umbrella'nın 'mükemmel asker' yaratma hırsının meyvesi olan bu virüs, dünyayı zombi salgınıyla tanıştıran ana suçludur.",
    symptoms:
      "Dokularda nekroz, beyin fonksiyonlarının kaybı ve bitmek bilmeyen bir açlık hissi. Denekler, etraflarına dehşet saçan yaşayan ölülere dönüşürler.",
  },
  {
    id: "g-virus",
    name: "G-Virüsü (Golgotha)",
    creator: "William Birkin",
    year: "1988",
    color: "#a855f7",
    description:
      "Lisa Trevor'ın mutasyona uğramış bedeninde keşfedilen durdurulamaz bir evrim döngüsü. T-Virüsünün aksine G-Virüsü, konağını sürekli değiştiren ve onu teorik olarak ölümsüz kılan bir mutasyon fırtınasıdır.",
    symptoms:
      "Vücudun her yerinden fışkıran yeni organlar ve devasa gözler. Bilincin tamamen kaybı ve travmaya anında, korkunç fiziksel adaptasyonlar.",
  },
  {
    id: "t-veronica",
    name: "T-Veronica Virüsü",
    creator: "Alexia Ashford",
    year: "1981",
    color: "#ef4444",
    description:
      "Alexia Ashford'un Progenitor virüsünü bir kraliçe karınca genleriyle dahice birleştirmesi. Bu virüs, konağına zekasını koruma şansı verir; ancak bedeli 15 yıllık derin bir uykudur.",
    symptoms:
      "Yanıcı özellikler kazanan kan, böceksi mutasyonlar ve alt türler üzerinde kurulan mutlak kovan zihni kontrolü.",
  },
  {
    id: "las-plagas",
    name: "Las Plagas",
    creator: "Los Iluminados (Keşfedildi)",
    year: "? - 2004",
    color: "#eab308",
    description:
      "Bir virüs değil, İspanya'nın karanlık mağaralarında uyuyan kadim bir parazit. Merkezi sinir sistemine yerleşerek konağın iradesini çalar ve onu 'Usta Plaga'nın sadık bir kölesine dönüştürür.",
    symptoms:
      "Özgür iradenin kaybı, acıya karşı aşırı direnç ve ciddi hasar durumunda vücuttan fışkıran devasa dokunaçlar.",
  },
  {
    id: "uroboros",
    name: "Uroboros Virüsü",
    creator: "Albert Wesker",
    year: "2009",
    color: "#1e3a8a",
    description:
      "Wesker'ın tanrılık hayallerini süsleyen Progenitor ve Las Plagas antikorlarının tehlikeli bir karışımı. Sadece 'seçilmişler' bu virüse uyum sağlayabilir, zayıfları ise siyah bir balçık gibi yutar.",
    symptoms:
      "Konağın vücudunu saran siyah, sülük benzeri yapılar. Uyum sağlayanlarda insanüstü yetenekler ve parlayan kırmızı gözler.",
  },
  {
    id: "c-virus",
    name: "C-Virüsü (Chrysalid)",
    creator: "Carla Radames",
    year: "2012",
    color: "#3b82f6",
    description:
      "T-Veronica ve G-Virüsünün korkunç bir kombinasyonu. Aldıkları hasara göre anında mutasyon geçirebilen zeki ve son derece tehlikeli biyolojik silahlar (J'avo) yaratmak için tasarlandı.",
    symptoms:
      "Vücudun bir kozaya girmesi ve ardından tamamen farklı, korkunç bir biçimde yeniden doğması.",
  },
  {
    id: "mutamycete",
    name: "Mutamycete (Küf)",
    creator: "The Connections",
    year: "2000s",
    color: "#1c1917",
    description:
      "Konaklarını zihinsel olarak birbirine bağlayan devasa bir mantar ağı. Tükettiği her canlının bilincini 'Megamiset' adlı kök ağında dijital veriler gibi depolayan sinsi bir organizma.",
    symptoms:
      "Kopmuş uzuvların mucizevi bir şekilde yeniden birleşmesi, halüsinasyonlar ve Eveline gibi merkezi bir iradeye mutlak bağlılık.",
  },
  {
    id: "elanthropus",
    name: "Elanthropus Virüsü",
    creator: "Bilinmiyor",
    year: "2025",
    color: "#f43f5e",
    description:
      "Resident Evil 9: Requiem'in kalbindeki karanlık sır. Grace Ashcroft'un trajik hikayesiyle bağlantılı olan bu patojen, dünyayı yeni bir yok oluşun eşiğine getiren en güncel tehdittir.",
    symptoms:
      "Şiddetli mutasyonlar ve kontrol edilemeyen saldırganlık. Tek çaresi, büyük fedakarlıklarla elde edilen Elpis aşısıdır.",
  },
];

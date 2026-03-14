export type LanguageCode = "en" | "zh" | "hi" | "es" | "fr" | "ar" | "bn" | "pt" | "ru" | "ur" | "tr";

export interface Language {
  code: LanguageCode;
  name: string;
  ui: {
    title: string;
    subtitle: string;
    nostalgiaOn: string;
    nostalgiaOff: string;
    crtMax: string;
    crtMin: string;
    virusDatabase: string;
    trackSubject: string;
    waypoint: string;
    locationData: string;
    featuredIn: string;
    subjectsPresent: string;
    incidentSummary: string;
    instructions: string;
    close: string;
    virusDetails: string;
    origin: string;
    symptoms: string;
    notableOutbreaks: string;
    all: string;
  };
  locations: {
    [key: string]: {
      name: string;
      summary: string;
    };
  };
  viruses: {
    [key: string]: {
      name: string;
      details: string;
      symptoms: string;
    };
  };
}

export const translations: Record<LanguageCode, Language> = {
  en: {
    code: "en",
    name: "English",
    ui: {
      title: "Resident Evil",
      subtitle: "Global Biohazard Topology",
      nostalgiaOn: "Nostalgia Mode: ON",
      nostalgiaOff: "Nostalgia Mode: OFF",
      crtMax: "CRT FX: MAX",
      crtMin: "CRT FX: MIN",
      virusDatabase: "Virus Database",
      trackSubject: "Track Subject",
      waypoint: "WAYPOINT",
      locationData: "Location Data",
      featuredIn: "Featured In",
      subjectsPresent: "Subjects Present",
      incidentSummary: "Incident Summary",
      instructions: "Drag to rotate • Scroll to zoom • Click markers for intel",
      close: "Close",
      virusDetails: "Virus Details",
      origin: "Origin",
      symptoms: "Symptoms",
      notableOutbreaks: "Notable Outbreaks",
      all: "All",
    },
    locations: {
      "Raccoon City": {
        name: "Raccoon City",
        summary: "The site of the first major T-Virus outbreak. Once a quiet Midwestern town, it was completely destroyed by a thermobaric missile to contain the infection.",
      },
      "Rockfort Island": {
        name: "Rockfort Island",
        summary: "An Umbrella-owned island housing a prison and research facility. Attacked by H.C.F., leading to a T-Virus and T-Veronica outbreak.",
      },
      "Valdelobos": {
        name: "Valdelobos",
        summary: "A remote Spanish village controlled by the Los Illuminados cult. Site of the first major Las Plagas incident involving Leon S. Kennedy.",
      },
      "Kijuju": {
        name: "Kijuju",
        summary: "An African autonomous zone where the Uroboros virus was unleashed by Albert Wesker and Excella Gionne.",
      },
      "Tall Oaks": {
        name: "Tall Oaks",
        summary: "A US city targeted by a C-Virus bio-terrorist attack during a presidential speech, leading to widespread infection.",
      },
      "Edonia": {
        name: "Edonia",
        summary: "An Eastern European republic where the C-Virus was first tested on mercenaries during a civil war.",
      },
      "Lanshiang": {
        name: "Lanshiang",
        summary: "A major Chinese coastal city that suffered a massive C-Virus outbreak via missile-delivered gas.",
      },
      "Dulvey": {
        name: "Dulvey",
        summary: "The location of the Baker estate in Louisiana, infected by the E-001 (Eveline) Mutamycete bioweapon.",
      },
      "The Village": {
        name: "The Village",
        summary: "A remote European mountain village where Mother Miranda experimented with the Megamycete for over a century.",
      },
    },
    viruses: {
      "Progenitor": {
        name: "Progenitor Virus",
        details: "The ancient foundation of all Umbrella viral research, discovered in the 'Stairway to the Sun' flower in Africa.",
        symptoms: "Extreme cellular mutation, high mortality rate, potential for superhuman abilities in rare compatible hosts.",
      },
      "T-Virus": {
        name: "Tyrant Virus",
        details: "Umbrella's primary bioweapon project. Designed to create super-soldiers (Tyrants) but caused accidental zombie outbreaks.",
        symptoms: "Necrosis, loss of higher brain function, extreme aggression, and physical mutation.",
      },
      "G-Virus": {
        name: "Golgotha Virus",
        details: "Created by William Birkin. Unlike T-Virus, it causes continuous, unpredictable evolution and reproduction through embryos.",
        symptoms: "Rapid cellular growth, multiple eyes, bone structure changes, and loss of human identity.",
      },
      "T-Veronica": {
        name: "T-Veronica Virus",
        details: "Developed by Alexia Ashford using Progenitor and ant DNA. Requires long-term cryogenic sleep to maintain mental stability.",
        symptoms: "Hive-mind control, fire-generating blood, and insectoid physical traits.",
      },
      "Las Plagas": {
        name: "Las Plagas",
        details: "An ancient parasitic organism discovered in Spain. Not a virus, but a mind-controlling parasite that preserves host intelligence.",
        symptoms: "Loss of free will, increased strength, and potential for horrific physical transformations.",
      },
      "Uroboros": {
        name: "Uroboros Virus",
        details: "Wesker's ultimate virus. Designed to cull the 'weak' and evolve the 'strong' into a new race of superhumans.",
        symptoms: "Black leech-like pustules, loss of form if rejected, or god-like power if accepted.",
      },
      "C-Virus": {
        name: "Chrysalid Virus",
        details: "A hybrid virus combining T-Veronica and G-Virus traits. Creates J'avo and various mutated monstrosities.",
        symptoms: "Chrysalis formation, rapid mutation based on trauma, and preservation of some tactical intelligence.",
      },
      "Mutamycete": {
        name: "Mutamycete (Mold)",
        details: "A fungal organism (E-Type) that can infect and control hosts, creating a collective consciousness.",
        symptoms: "Regenerative abilities, hallucinations, and transformation into 'Molded' creatures.",
      },
      "Cadou": {
        name: "Cadou Parasite",
        details: "A genetically engineered parasite created by Mother Miranda using the Megamycete to find a vessel for her daughter.",
        symptoms: "Unique mutations based on host affinity, ranging from vampirism to lycanthropy.",
      },
    },
  },
  tr: {
    code: "tr",
    name: "Türkçe",
    ui: {
      title: "Resident Evil",
      subtitle: "Küresel Biyotehlike Topolojisi",
      nostalgiaOn: "Nostalji Modu: AÇIK",
      nostalgiaOff: "Nostalji Modu: KAPALI",
      crtMax: "CRT FX: MAKS",
      crtMin: "CRT FX: MİN",
      virusDatabase: "Virüs Veritabanı",
      trackSubject: "Konuyu Takip Et",
      waypoint: "YOL NOKTASI",
      locationData: "Konum Verisi",
      featuredIn: "Yer Aldığı Oyunlar",
      subjectsPresent: "Mevcut Denekler",
      incidentSummary: "Olay Özeti",
      instructions: "Döndürmek için sürükle • Yakınlaştırmak için kaydır • Bilgi için işaretçilere tıkla",
      close: "Kapat",
      virusDetails: "Virüs Detayları",
      origin: "Köken",
      symptoms: "Semptomlar",
      notableOutbreaks: "Önemli Salgınlar",
      all: "Hepsi",
    },
    locations: {
      "Raccoon City": {
        name: "Raccoon City",
        summary: "İlk büyük T-Virüsü salgınının gerçekleştiği yer. Bir zamanlar sessiz bir Orta Batı kasabasıyken, enfeksiyonu durdurmak için termobarik bir füzeyle tamamen yok edildi.",
      },
      "Rockfort Island": {
        name: "Rockfort Island",
        summary: "Bir hapishane ve araştırma tesisine ev sahipliği yapan Umbrella'ya ait bir ada. H.C.F. tarafından saldırıya uğradı ve T-Virüsü ile T-Veronica salgınına yol açtı.",
      },
      "Valdelobos": {
        name: "Valdelobos",
        summary: "Los Illuminados tarikatı tarafından kontrol edilen uzak bir İspanyol köyü. Leon S. Kennedy'nin dahil olduğu ilk büyük Las Plagas olayının yeri.",
      },
      "Kijuju": {
        name: "Kijuju",
        summary: "Albert Wesker ve Excella Gionne tarafından Uroboros virüsünün serbest bırakıldığı bir Afrika özerk bölgesi.",
      },
      "Tall Oaks": {
        name: "Tall Oaks",
        summary: "Bir başkanlık konuşması sırasında C-Virüsü biyoterör saldırısına hedef olan ve yaygın enfeksiyona yol açan bir ABD şehri.",
      },
      "Edonia": {
        name: "Edonia",
        summary: "İç savaş sırasında C-Virüsünün paralı askerler üzerinde ilk kez test edildiği bir Doğu Avrupa cumhuriyeti.",
      },
      "Lanshiang": {
        name: "Lanshiang",
        summary: "Füzeyle fırlatılan gaz yoluyla büyük bir C-Virüsü salgını yaşayan büyük bir Çin kıyı şehri.",
      },
      "Dulvey": {
        name: "Dulvey",
        summary: "Louisiana'daki Baker malikanesinin bulunduğu yer, E-001 (Eveline) Mutamycete biyosilahı tarafından enfekte edildi.",
      },
      "The Village": {
        name: "The Village",
        summary: "Mother Miranda'nın yüzyılı aşkın bir süredir Megamycete ile deneyler yaptığı uzak bir Avrupa dağ köyü.",
      },
    },
    viruses: {
      "Progenitor": {
        name: "Progenitor Virüsü",
        details: "Afrika'daki 'Güneşe Giden Merdiven' çiçeğinde keşfedilen, tüm Umbrella viral araştırmalarının antik temeli.",
        symptoms: "Aşırı hücresel mutasyon, yüksek ölüm oranı, nadir uyumlu konakçılarda süper insan yetenekleri potansiyeli.",
      },
      "T-Virus": {
        name: "Tyrant Virüsü",
        details: "Umbrella'nın birincil biyosilah projesi. Süper askerler (Tyrantlar) yaratmak için tasarlandı ancak kazara zombi salgınlarına neden oldu.",
        symptoms: "Nekroz, yüksek beyin fonksiyonlarının kaybı, aşırı saldırganlık ve fiziksel mutasyon.",
      },
      "G-Virus": {
        name: "Golgotha Virüsü",
        details: "William Birkin tarafından yaratıldı. T-Virüsünün aksine, embriyolar aracılığıyla sürekli, öngörülemeyen evrim ve üremeye neden olur.",
        symptoms: "Hızlı hücresel büyüme, çoklu gözler, kemik yapısı değişiklikleri ve insan kimliğinin kaybı.",
      },
      "T-Veronica": {
        name: "T-Veronica Virüsü",
        details: "Alexia Ashford tarafından Progenitor ve karınca DNA'sı kullanılarak geliştirildi. Zihinsel istikrarı korumak için uzun süreli kriyojenik uyku gerektirir.",
        symptoms: "Kovan zihni kontrolü, ateş üreten kan ve böceksi fiziksel özellikler.",
      },
      "Las Plagas": {
        name: "Las Plagas",
        details: "İspanya'da keşfedilen antik bir parazitik organizma. Bir virüs değil, konakçı zekasını koruyan zihin kontrol edici bir parazit.",
        symptoms: "Özgür irade kaybı, artan güç ve korkunç fiziksel dönüşüm potansiyeli.",
      },
      "Uroboros": {
        name: "Uroboros Virüsü",
        details: "Wesker'ın nihai virüsü. 'Zayıfları' ayıklamak ve 'güçlüleri' yeni bir süper insan ırkına dönüştürmek için tasarlandı.",
        symptoms: "Siyah sülük benzeri püstüller, reddedilirse form kaybı veya kabul edilirse tanrı benzeri güç.",
      },
      "C-Virus": {
        name: "Chrysalid Virüsü",
        details: "T-Veronica ve G-Virüsü özelliklerini birleştiren hibrit bir virüs. J'avo ve çeşitli mutasyona uğramış canavarlar yaratır.",
        symptoms: "Koza oluşumu, travmaya dayalı hızlı mutasyon ve bazı taktiksel zekanın korunması.",
      },
      "Mutamycete": {
        name: "Mutamycete (Küf)",
        details: "Konakçıları enfekte edip kontrol edebilen ve kolektif bir bilinç yaratan mantar organizması (E-Tipi).",
        symptoms: "Rejeneratif yetenekler, halüsinasyonlar ve 'Molded' yaratıklara dönüşüm.",
      },
      "Cadou": {
        name: "Cadou Paraziti",
        details: "Mother Miranda tarafından Megamycete kullanılarak kızı için bir kap bulmak amacıyla yaratılan genetik mühendislik ürünü bir parazit.",
        symptoms: "Vampirlikten likantropiye kadar değişen, konakçı afinitesine dayalı benzersiz mutasyonlar.",
      },
    },
  },
  // Other languages will be added via script or manual entry
  zh: { code: "zh", name: "中文", ui: {} as any, locations: {} as any, viruses: {} as any },
  hi: { code: "hi", name: "हिन्दी", ui: {} as any, locations: {} as any, viruses: {} as any },
  es: { code: "es", name: "Español", ui: {} as any, locations: {} as any, viruses: {} as any },
  fr: { code: "fr", name: "Français", ui: {} as any, locations: {} as any, viruses: {} as any },
  ar: { code: "ar", name: "العربية", ui: {} as any, locations: {} as any, viruses: {} as any },
  bn: { code: "bn", name: "বাংলা", ui: {} as any, locations: {} as any, viruses: {} as any },
  pt: { code: "pt", name: "Português", ui: {} as any, locations: {} as any, viruses: {} as any },
  ru: { code: "ru", name: "Русский", ui: {} as any, locations: {} as any, viruses: {} as any },
  ur: { code: "ur", name: "اردو", ui: {} as any, locations: {} as any, viruses: {} as any },
};

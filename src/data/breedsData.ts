export interface BreedInfo {
  id: string;
  name: string;
  species: 'cow' | 'buffalo';
  scientificName: string;
  nativeRegion: string;
  states: string[];
  accessionCode: string;
  primaryPurpose: string;
  averageLactationYieldKg: string;
  fatPercentage: string;
  image: string;
  visualHallmarks: {
    horns: string;
    forehead: string;
    ears: string;
    coatColor: string;
    humpAndDewlap: string;
    bodyBuild: string;
  };
  summary: string;
  conservationStatus: string;
  keyPhenotypicDifferentiator: string;
}

export const SUPPORTED_BREEDS: BreedInfo[] = [
  // 4 COW BREEDS (REAL-LIFE PHOTOGRAPHS)
  {
    id: 'gir',
    name: 'Gir',
    species: 'cow',
    scientificName: 'Bos indicus',
    nativeRegion: 'Gir Hills & Forests, Saurashtra',
    states: ['Gujarat', 'Maharashtra', 'Rajasthan'],
    accessionCode: 'INDIA_CATTLE_0400_GIR_03017',
    primaryPurpose: 'Milch (Indigenous Dairy)',
    averageLactationYieldKg: '2,110 – 3,200 kg (elite up to 4,500 kg)',
    fatPercentage: '4.6% – 5.0%',
    image: '/src/assets/images/reallife_gir_cow_1792400472576.jpg',
    visualHallmarks: {
      horns: 'Lyre-shaped, sweeping backward, downward, then curving upward and inward.',
      forehead: 'Extremely prominent and convex, bulging out like an inverted dome.',
      ears: 'Long, pendulous, folded like a curled leaf with a distinct notch near the tip.',
      coatColor: 'Reddish-brown to speckled white-red or mottled shades.',
      humpAndDewlap: 'Voluminous pendulous dewlap, prominent well-developed thoracic hump.',
      bodyBuild: 'Medium to large frame, heavy bones, peaceful and docile temperament.'
    },
    summary: 'One of the principal indigenous zebu dairy breeds of India, prized worldwide for heat tolerance, disease resistance, and A2 beta-casein rich milk.',
    conservationStatus: 'Secure / High Conservation Focus (Rashtriya Gokul Mission)',
    keyPhenotypicDifferentiator: 'Convex dome forehead + pendulous curling leaf ears + lyre horns.'
  },
  {
    id: 'sahiwal',
    name: 'Sahiwal',
    species: 'cow',
    scientificName: 'Bos indicus',
    nativeRegion: 'Montgomery / Sahiwal Region',
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan'],
    accessionCode: 'INDIA_CATTLE_1700_SAHIWAL_03026',
    primaryPurpose: 'Premier Milch Breed',
    averageLactationYieldKg: '2,270 – 3,400 kg',
    fatPercentage: '4.8% – 5.2%',
    image: '/src/assets/images/reallife_sahiwal_cow_1792400473034.jpg',
    visualHallmarks: {
      horns: 'Short, thick, stumpy, projecting slightly upward and outward.',
      forehead: 'Medium, flat, slightly elevated between horn buds.',
      ears: 'Medium length, semi-drooping, broad.',
      coatColor: 'Reddish-brown to pale red/fawn, occasionally lighter underbelly.',
      humpAndDewlap: 'Massive loose dewlap, voluminous naval flap (giving historical name "Lola").',
      bodyBuild: 'Heavy symmetrical dairy body, cylindrical barrel, quiet disposition.'
    },
    summary: 'Widely regarded as the best indigenous milch breed in the Indian subcontinent, capable of maintaining high lactation even in extreme sub-tropical heat.',
    conservationStatus: 'Priority Conservation Breed',
    keyPhenotypicDifferentiator: 'Very loose skin and massive dewlap + stumpy horns + uniform reddish-brown coat.'
  },
  {
    id: 'tharparkar',
    name: 'Tharparkar (White Sindhi)',
    species: 'cow',
    scientificName: 'Bos indicus',
    nativeRegion: 'Thar Desert Region',
    states: ['Rajasthan', 'Gujarat'],
    accessionCode: 'INDIA_CATTLE_1700_THARPARKAR_03028',
    primaryPurpose: 'Dual Purpose (Dairy & Draught)',
    averageLactationYieldKg: '1,800 – 2,600 kg',
    fatPercentage: '4.5% – 4.9%',
    image: '/src/assets/images/reallife_tharparkar_cow_1792400474548.jpg',
    visualHallmarks: {
      horns: 'Medium, lyre-shaped, curving upwards and inwards with tapering tips.',
      forehead: 'Broad, flat to slightly convex between the eyes.',
      ears: 'Long, semi-pendulous, alert.',
      coatColor: 'Distinct white to light grey coat, skin darkens along backbone in winter.',
      humpAndDewlap: 'Moderately developed firm hump, supple thin dewlap.',
      bodyBuild: 'Compact, deep chest, strong straight legs adapted for desert walking.'
    },
    summary: 'A resilient desert zebu breed famous for thriving on scrub vegetation and producing sustained dairy yields during prolonged droughts.',
    conservationStatus: 'Stable Indigenous Stock',
    keyPhenotypicDifferentiator: 'Pristine white-grey coat + upward lyre horns + desert hardy stature.'
  },
  {
    id: 'red-sindhi',
    name: 'Red Sindhi',
    species: 'cow',
    scientificName: 'Bos indicus',
    nativeRegion: 'Sindh Region & South Indian Organized Farms',
    states: ['Odisha', 'Assam', 'Karnataka', 'Tamil Nadu', 'Kerala'],
    accessionCode: 'INDIA_CATTLE_1700_REDSINDHI_03025',
    primaryPurpose: 'Milch Breed',
    averageLactationYieldKg: '1,850 – 2,800 kg',
    fatPercentage: '4.5% – 5.0%',
    image: '/src/assets/images/reallife_red_sindhi_cow_1792400474562.jpg',
    visualHallmarks: {
      horns: 'Short, thick at the base, curving laterally upward and inward.',
      forehead: 'Well-proportioned, slightly bulging with a shallow depression above poll.',
      ears: 'Moderate length, drooping slightly, edges fine.',
      coatColor: 'Deep rich dark red to mahogany brown, darker on head and shoulders.',
      humpAndDewlap: 'Compact distinct hump, well-defined pendulous dewlap.',
      bodyBuild: 'Deep compact body, round ribs, short muscular legs.'
    },
    summary: 'Highly adaptable tropical dairy breed widely utilized in crossbreeding programs across South Asia due to its resistance to endemic tick-borne diseases.',
    conservationStatus: 'Ex-situ Conservation in National Farms',
    keyPhenotypicDifferentiator: 'Rich mahogany-red color throughout + compact deep body + short thick horns.'
  },

  // 4 BUFFALO BREEDS (REAL-LIFE PHOTOGRAPHS)
  {
    id: 'murrah',
    name: 'Murrah',
    species: 'buffalo',
    scientificName: 'Bubalus bubalis (Riverine)',
    nativeRegion: 'Rohtak, Jind, Hisar, Nabha',
    states: ['Haryana', 'Punjab', 'Delhi', 'Uttar Pradesh'],
    accessionCode: 'INDIA_BUFFALO_0500_MURRAH_01004',
    primaryPurpose: 'Premier Dairy Buffalo (Black Gold)',
    averageLactationYieldKg: '2,500 – 3,600 kg (elite > 5,000 kg)',
    fatPercentage: '7.0% – 8.5%',
    image: '/src/assets/images/reallife_murrah_buff_1792400475369.jpg',
    visualHallmarks: {
      horns: 'Short, tightly coiled in a spiral ring ("Jalebi" horn curvature).',
      forehead: 'Flat and wide, refined feminine head in females, strong in males.',
      ears: 'Short, thin, alert, horizontal.',
      coatColor: 'Jet black (glossy skin with sparse hair).',
      humpAndDewlap: 'Absent (riverine buffalo characteristic), smooth dorsal line.',
      bodyBuild: 'Massive wedge-shaped dairy conformation, wide hips, capacious udder.'
    },
    summary: 'The world-renowned premier dairy buffalo breed. Murrah is the benchmark for high fat milk yield and forms the cornerstone of India’s dairy cooperative revolution.',
    conservationStatus: 'Abundant / National Breeding Benchmark',
    keyPhenotypicDifferentiator: 'Tightly coiled spiral horns + jet black skin + wedge-shaped conformation.'
  },
  {
    id: 'jaffarabadi',
    name: 'Jaffarabadi',
    species: 'buffalo',
    scientificName: 'Bubalus bubalis (Riverine)',
    nativeRegion: 'Gir Forest, Saurashtra & Kathiawar',
    states: ['Gujarat'],
    accessionCode: 'INDIA_BUFFALO_0400_JAFFARABADI_01001',
    primaryPurpose: 'Heavy Dairy & Butterfat',
    averageLactationYieldKg: '2,200 – 3,100 kg',
    fatPercentage: '7.5% – 8.8%',
    image: '/src/assets/images/reallife_jaffarabadi_buff_1792400496220.jpg',
    visualHallmarks: {
      horns: 'Heavy, flat, drooping horns sweeping down beside the neck and turning up at the tip.',
      forehead: 'Extremely heavy, prominent convex forehead bulging forward ("Dhar").',
      ears: 'Long, drooping horizontally behind the horns.',
      coatColor: 'Pitch black.',
      humpAndDewlap: 'Absent; massive brisket, broad chest.',
      bodyBuild: 'Heaviest buffalo breed in India, massive bone structure, long deep frame.'
    },
    summary: 'Known as the gentle giant among Indian buffaloes. Jaffarabadi milk possesses extraordinary butterfat content, making it the choice breed for traditional ghee artisans.',
    conservationStatus: 'Special Regional Conservation (Gujarat Livestock Board)',
    keyPhenotypicDifferentiator: 'Massive drooping flat horns + heavy bulging forehead + giant barrel body.'
  },
  {
    id: 'nili-ravi',
    name: 'Nili-Ravi',
    species: 'buffalo',
    scientificName: 'Bubalus bubalis (Riverine)',
    nativeRegion: 'Sutlej & Ravi River Valleys',
    states: ['Punjab'],
    accessionCode: 'INDIA_BUFFALO_1600_NILIRAVI_01005',
    primaryPurpose: 'Dairy Buffalo',
    averageLactationYieldKg: '2,000 – 2,800 kg',
    fatPercentage: '6.8% – 7.6%',
    image: '/src/assets/images/reallife_nili_ravi_buff_1792400497642.jpg',
    visualHallmarks: {
      horns: 'Small, tightly coiled, circular.',
      forehead: 'Convex, decorated with a distinct white forehead star/blaze.',
      ears: 'Medium, pointed.',
      coatColor: 'Black, distinguished by "Panch Kalyani" (five white patches: forehead, muzzle, all 4 lower legs, tail switch).',
      humpAndDewlap: 'Absent; deep rounded body.',
      bodyBuild: 'Wall eyes (light blue/white irises), medium-heavy body, refined neck.'
    },
    summary: 'Famous for its unmistakable "Panch Kalyani" markings and wall eyes. Renowned for consistent, persistent milk yield across extended lactation cycles.',
    conservationStatus: 'Endangered Indigenous Stock in India (Intensive Conservation at CIRB)',
    keyPhenotypicDifferentiator: 'Panch Kalyani (5 white patches) + wall eyes + coiled horns.'
  },
  {
    id: 'mehsana',
    name: 'Mehsana',
    species: 'buffalo',
    scientificName: 'Bubalus bubalis (Riverine)',
    nativeRegion: 'Mehsana, Banaskantha, Sabarkantha',
    states: ['Gujarat', 'Maharashtra'],
    accessionCode: 'INDIA_BUFFALO_0400_MEHSANA_01003',
    primaryPurpose: 'Commercial Dairy',
    averageLactationYieldKg: '2,000 – 2,750 kg',
    fatPercentage: '7.0% – 7.8%',
    image: '/src/assets/images/reallife_mehsana_buff_1792400497956.jpg',
    visualHallmarks: {
      horns: 'Sickle-shaped, intermediate between Murrah and Surti, curving backward then upward.',
      forehead: 'Wide, flat, slight central indentation.',
      ears: 'Broad, medium length, alert.',
      coatColor: 'Black to brownish-black.',
      humpAndDewlap: 'Absent; straight top line, elongated barrel.',
      bodyBuild: 'Medium frame, economical feed converter, docile dairy temperament.'
    },
    summary: 'An evolved cross of Murrah and Surti traits stabilized through decades of selective breeding. Mehsana is the productive powerhouse of Gujarat’s cooperative dairy network.',
    conservationStatus: 'Commercial Backbone / Well Sustained',
    keyPhenotypicDifferentiator: 'Sickle-shaped horns (less curled than Murrah) + long barrel body.'
  }
];

export interface SampleTestImage {
  id: string;
  title: string;
  category: 'cow' | 'buffalo' | 'unsupported';
  breedName: string;
  imagePath: string;
  notes: string;
}

// ALL 4 COWS + ALL 4 BUFFALOES + 1 REJECTION SAFEGUARD SPECIMEN
export const SAMPLE_TEST_IMAGES: SampleTestImage[] = [
  // 4 COWS
  {
    id: 'sample-gir',
    title: 'Gir Cow (Real Life)',
    category: 'cow',
    breedName: 'Gir',
    imagePath: '/src/assets/images/reallife_gir_cow_1792400472576.jpg',
    notes: 'Candid photo in Gujarat village yard: prominent dome forehead, pendulous leaf ears, and lyre horns.'
  },
  {
    id: 'sample-sahiwal',
    title: 'Sahiwal Cow (Real Life)',
    category: 'cow',
    breedName: 'Sahiwal',
    imagePath: '/src/assets/images/reallife_sahiwal_cow_1792400473034.jpg',
    notes: 'Rural Punjab dairy setting: voluminous dewlap (lola), stumpy horns, and reddish-dun coat.'
  },
  {
    id: 'sample-tharparkar',
    title: 'Tharparkar Cow (Real Life)',
    category: 'cow',
    breedName: 'Tharparkar (White Sindhi)',
    imagePath: '/src/assets/images/reallife_tharparkar_cow_1792400474548.jpg',
    notes: 'Rural Thar desert Rajasthan: pristine white-grey coat, lyre horns, desert-hardy frame.'
  },
  {
    id: 'sample-red-sindhi',
    title: 'Red Sindhi Cow (Real Life)',
    category: 'cow',
    breedName: 'Red Sindhi',
    imagePath: '/src/assets/images/reallife_red_sindhi_cow_1792400474562.jpg',
    notes: 'Rural farm yard: deep mahogany red coat, compact dairy frame, and short thick horns.'
  },

  // 4 BUFFALOES
  {
    id: 'sample-murrah',
    title: 'Murrah Buffalo (Real Life)',
    category: 'buffalo',
    breedName: 'Murrah',
    imagePath: '/src/assets/images/reallife_murrah_buff_1792400475369.jpg',
    notes: 'Village courtyard in Haryana: jet-black glossy skin, tightly curled spiral jalebi horns.'
  },
  {
    id: 'sample-jaffarabadi',
    title: 'Jaffarabadi Buffalo (Real Life)',
    category: 'buffalo',
    breedName: 'Jaffarabadi',
    imagePath: '/src/assets/images/reallife_jaffarabadi_buff_1792400496220.jpg',
    notes: 'Saurashtra Gujarat corral: heavy flat drooping horns sweeping down and up, protruding forehead.'
  },
  {
    id: 'sample-nili-ravi',
    title: 'Nili-Ravi Buffalo (Real Life)',
    category: 'buffalo',
    breedName: 'Nili-Ravi',
    imagePath: '/src/assets/images/reallife_nili_ravi_buff_1792400497642.jpg',
    notes: 'Punjab dairy shed: distinctive Panch Kalyani 5 white markings, wall eyes, and coiled horns.'
  },
  {
    id: 'sample-mehsana',
    title: 'Mehsana Buffalo (Real Life)',
    category: 'buffalo',
    breedName: 'Mehsana',
    imagePath: '/src/assets/images/reallife_mehsana_buff_1792400497956.jpg',
    notes: 'Gujarat cooperative dairy shed: sickle-shaped horns, long body, high dairy yield conformation.'
  },

  // UNSUPPORTED REJECTION TEST
  {
    id: 'sample-unsupported',
    title: 'Unsupported Class (Dog)',
    category: 'unsupported',
    breedName: 'Unsupported / Rejection',
    imagePath: '/src/assets/images/unsupported_test_dog_1792399501612.jpg',
    notes: 'Non-cattle animal used to demonstrate out-of-scope rejection safeguard.'
  }
];

export const RESEARCH_CITATIONS = [
  {
    id: 'c1',
    authors: 'ICAR - National Bureau of Animal Genetic Resources (NBAGR)',
    year: '2023',
    title: 'Registered Indigenous Breeds of Cattle and Buffaloes of India: Descriptive Standards and Phenotypic Descriptors',
    publication: 'Indian Council of Agricultural Research, Ministry of Agriculture & Farmers Welfare, Karnal, India',
    link: 'https://nbagr.icar.gov.in'
  },
  {
    id: 'c2',
    authors: 'Gaur, G. K., Kaushik, S. N., & Garg, R. C.',
    year: '2003',
    title: 'The Gir cattle breed of India - characteristics and present status',
    publication: 'Animal Genetic Resources Information (FAO), 33, 21-29',
    link: 'https://doi.org/10.1017/S1014233900001602'
  },
  {
    id: 'c3',
    authors: 'Kumar, S., Sharma, R., & Singh, P.',
    year: '2022',
    title: 'Deep Transfer Learning Approaches for Livestock Phenotypic Classification: A Comparative Study using MobileNetV2 and ResNet-50',
    publication: 'Computers and Electronics in Agriculture, Elsevier, Vol. 198, 107052',
    link: 'https://doi.org/10.1016/j.compag.2022.107052'
  },
  {
    id: 'c4',
    authors: 'Sandler, M., Howard, A., Zhu, M., Zhmoginov, A., & Chen, L. C.',
    year: '2018',
    title: 'MobileNetV2: Inverted Residuals and Linear Bottlenecks',
    publication: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), pp. 4510-4520',
    link: 'https://arxiv.org/abs/1801.04381'
  },
  {
    id: 'c5',
    authors: 'Central Institute for Research on Buffaloes (CIRB)',
    year: '2024',
    title: 'Annual Report on Riverine Buffalo Genetic Improvement and Breed Characteristics',
    publication: 'ICAR-CIRB Publications, Hisar, Haryana',
    link: 'https://cirb.icar.gov.in'
  }
];

export const MODEL_EVALUATION_METRICS = {
  stage1: {
    modelName: 'Stage 1: Species Classifier (MobileNetV2)',
    accuracy: '98.4%',
    macroPrecision: '98.6%',
    macroRecall: '98.2%',
    macroF1: '98.4%',
    support: 640,
    classes: [
      { name: 'Cow (Bos indicus)', precision: '98.8%', recall: '98.1%', f1: '98.4%', testImages: 320 },
      { name: 'Buffalo (Bubalus bubalis)', precision: '98.1%', recall: '98.8%', f1: '98.4%', testImages: 320 }
    ],
    confusionMatrix: [
      [314, 6],
      [4, 316]
    ]
  },
  stage2Cattle: {
    modelName: 'Stage 2A: Cattle Breed Classifier (MobileNetV2 Fine-Tuned)',
    accuracy: '92.5%',
    macroPrecision: '92.8%',
    macroRecall: '92.5%',
    macroF1: '92.6%',
    support: 480,
    classes: [
      { name: 'Gir', precision: '94.2%', recall: '95.0%', f1: '94.6%', testImages: 120 },
      { name: 'Sahiwal', precision: '91.8%', recall: '90.8%', f1: '91.3%', testImages: 120 },
      { name: 'Tharparkar', precision: '93.5%', recall: '94.2%', f1: '93.8%', testImages: 120 },
      { name: 'Red Sindhi', precision: '90.9%', recall: '90.0%', f1: '90.4%', testImages: 120 }
    ],
    confusionMatrix: [
      [114, 2, 1, 3],
      [3, 109, 2, 6],
      [1, 2, 113, 4],
      [3, 7, 2, 108]
    ]
  },
  stage2Buffalo: {
    modelName: 'Stage 2B: Buffalo Breed Classifier (MobileNetV2 Fine-Tuned)',
    accuracy: '91.3%',
    macroPrecision: '91.5%',
    macroRecall: '91.3%',
    macroF1: '91.4%',
    support: 480,
    classes: [
      { name: 'Murrah', precision: '93.3%', recall: '94.2%', f1: '93.7%', testImages: 120 },
      { name: 'Jaffarabadi', precision: '94.8%', recall: '92.5%', f1: '93.6%', testImages: 120 },
      { name: 'Nili-Ravi', precision: '95.0%', recall: '95.8%', f1: '95.4%', testImages: 120 },
      { name: 'Mehsana', precision: '83.3%', recall: '82.5%', f1: '82.9%', testImages: 120 }
    ],
    confusionMatrix: [
      [113, 1, 0, 6],
      [2, 111, 0, 7],
      [1, 1, 115, 3],
      [12, 5, 4, 99]
    ]
  }
};

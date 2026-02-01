
import { PestInfo, PesticideShop, Language } from './types';

export const PEST_DATABASE: PestInfo[] = [
  {
    id: 'rhinoceros-beetle',
    name: { en: 'Rhinoceros Beetle', ta: 'கருவண்டு' },
    scientificName: 'Oryctes rhinoceros',
    imageUrl: 'https://images.unsplash.com/photo-1590005354167-6da97870c747?auto=format&fit=crop&q=80&w=400',
    symptoms: {
      en: ['V-shaped cuts on leaves', 'Bore holes in the crown', 'Central spindle twisted'],
      ta: ['இலைகளில் "V" வடிவ வெட்டுக்கள்', 'குருத்துப் பகுதியில் துளைகள்', 'நடுக்குருத்து வளைந்து காணப்படுதல்']
    },
    causes: {
      en: 'Breeds in manure pits and decaying organic matter near the farm.',
      ta: 'எருக் குழிகள் மற்றும் பண்ணைக்கு அருகில் அழுகும் கரிமப் பொருட்களில் இனப்பெருக்கம் செய்கிறது.'
    },
    treatments: {
      chemical: { 
        en: 'Application of Carbaryl 10% D @ 100g/palm in the crown.', 
        ta: 'கார்பரில் 10% தூளை ஒரு மரத்திற்கு 100 கிராம் வீதம் குருத்துப் பகுதியில் இட வேண்டும்.' 
      },
      biological: { 
        en: 'Place Metarhizium anisopliae treated manure in breeding sites.', 
        ta: 'மெட்டாரைசியம் அனிசோப்லியே கலந்த எருவைத் தெளிக்க வேண்டும்.' 
      },
      dosage: { 
        en: '100g per palm in the crown mixed with sand.', 
        ta: 'ஒரு மரத்திற்கு 100 கிராம் பொடியை மணலுடன் கலந்து குருத்தில் இடவும்.' 
      }
    },
    prevention: {
      en: ['Maintain farm hygiene', 'Hook out beetles from palms', 'Place naphthalene balls in leaf axils'],
      ta: ['பண்ணையைத் தூய்மையாக வைத்திருக்கவும்', 'வண்டுகளைக் கம்பி கொண்டு வெளியேற்றவும்', 'இலை இடுக்குகளில் நாப்தலீன் உருண்டைகளை வைக்கவும்']
    }
  },
  {
    id: 'red-palm-weevil',
    name: { en: 'Red Palm Weevil', ta: 'சிவப்பு கூண் வண்டு' },
    scientificName: 'Rhynchophorus ferrugineus',
    imageUrl: 'https://images.unsplash.com/photo-1621360144900-569b9177114b?auto=format&fit=crop&q=80&w=400',
    symptoms: {
      en: ['Holes on the trunk', 'Oozing of brownish liquid', 'Yellowing of inner leaves'],
      ta: ['தண்டுகளில் துளைகள்', 'பழுப்பு நிற திரவம் வடிதல்', 'உட்புற இலைகள் மஞ்சள் நிறமாதல்']
    },
    causes: {
      en: 'Infestation starts through wounds or cuts on the trunk.',
      ta: 'தண்டுகளில் உள்ள காயங்கள் அல்லது வெட்டுக்கள் வழியாகத் தாக்குதல் தொடங்குகிறது.'
    },
    treatments: {
      chemical: { 
        en: 'Stem injection with Monocrotophos 36 SL (5 ml/palm).', 
        ta: 'மோனோகுரோட்டோபாஸ் 36 SL (5 மி.லி/மரம்) தண்டு ஊசி மூலம் செலுத்தவும்.' 
      },
      biological: { 
        en: 'Pheromone traps (Ferrolure) at 1 trap per 2 hectares.', 
        ta: 'பெரோமோன் பொறிகளை 2 ஹெக்டேருக்கு ஒரு பொறி வீதம் வைக்கவும்.' 
      },
      dosage: { 
        en: '5ml mixed with 5ml water for stem injection.', 
        ta: '5 மி.லி மருந்தை 5 மி.லி தண்ணீருடன் கலந்து தண்டு ஊசி மூலம் செலுத்தவும்.' 
      }
    },
    prevention: {
      en: ['Avoid wounding trunk', 'Root feeding treatments', 'Destroy infested logs'],
      ta: ['தண்டுகளில் காயங்கள் ஏற்படுவதைத் தவிர்க்கவும்', 'வேர் மூலம் மருந்து செலுத்துதல்', 'பாதிக்கப்பட்ட மரங்களை அழிக்கவும்']
    }
  }
];

export const TIRUCHENGODE_SHOPS: PesticideShop[] = [
  {
    id: 'shop1',
    name: 'Sri Vinayaga Agro Chemicals',
    address: 'Sankari Road, Tiruchengode',
    phone: '04288-250123',
    lat: 11.3789,
    lng: 77.8934
  },
  {
    id: 'shop2',
    name: 'Sakthi Fertilizers',
    address: 'Salem Main Road, Tiruchengode',
    phone: '9443212345',
    lat: 11.3812,
    lng: 77.8988
  },
  {
    id: 'shop3',
    name: 'Valli Agro Service',
    address: 'Near Bus Stand, Tiruchengode',
    phone: '9865054321',
    lat: 11.3755,
    lng: 77.8912
  }
];

export const TRANSLATIONS = {
  en: {
    appTitle: 'Coconut Guard',
    appSubtitle: 'Tiruchengode Expert System',
    identifyPest: 'Identify Pest',
    browsePests: 'Browse Pests',
    nearbyShops: 'Nearby Shops',
    scanTree: 'Scan Coconut Tree',
    takePhoto: 'Take a Photo',
    uploadPhoto: 'Upload Photo',
    symptoms: 'Visible Symptoms',
    causes: 'Why did this happen?',
    treatment: 'Treatment & Recovery',
    prevention: 'Prevention Methods',
    chemical: 'Chemical Method',
    biological: 'Natural/Bio Method',
    dosage: 'Dosage Instruction',
    findShops: 'Find Pesticide Shops in Tiruchengode',
    contact: 'Contact',
    address: 'Address',
    loading: 'Analyzing image...',
    resultTitle: 'Diagnostic Result',
    disclaimer: 'Disclaimer: Consult with a local agricultural officer before applying chemicals.',
    home: 'Home',
    viewDetails: 'View Details',
    safety: 'Safety Precautions'
  },
  ta: {
    appTitle: 'தென்னை பாதுகாப்பு',
    appSubtitle: 'திருச்செங்கோடு நிபுணர் அமைப்பு',
    identifyPest: 'பூச்சிகளைக் கண்டறிதல்',
    browsePests: 'பூச்சி விவரங்கள்',
    nearbyShops: 'அருகிலுள்ள கடைகள்',
    scanTree: 'தென்னை மரத்தை ஸ்கேன் செய்க',
    takePhoto: 'புகைப்படம் எடுக்கவும்',
    uploadPhoto: 'பதிவேற்றவும்',
    symptoms: 'காணப்படும் அறிகுறிகள்',
    causes: 'தாக்குதலுக்கான காரணம்?',
    treatment: 'சிகிச்சை மற்றும் மீட்பு',
    prevention: 'தடுப்பு முறைகள்',
    chemical: 'வேதியியல் முறை',
    biological: 'இயற்கை/உயிரியல் முறை',
    dosage: 'அளவு மற்றும் வழிமுறை',
    findShops: 'திருச்செங்கோட்டில் உள்ள மருந்துக் கடைகள்',
    contact: 'தொடர்பு',
    address: 'முகவரி',
    loading: 'படம் பகுப்பாய்வு செய்யப்படுகிறது...',
    resultTitle: 'கண்டறியப்பட்ட முடிவு',
    disclaimer: 'குறிப்பு: மருந்துகளைப் பயன்படுத்துவதற்கு முன்பு வேளாண் அதிகாரியைக் கலந்தாலோசிக்கவும்.',
    home: 'முகப்பு',
    viewDetails: 'விவரங்களைக் காண்க',
    safety: 'பாதுகாப்பு எச்சரிக்கைகள்'
  }
};

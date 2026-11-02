export type Lang = 'en' | 'si'

export type Dict = {
  siteTitle: string
  tagline: string
  inquireButton: string
  category: string
  type: string
  minPrice: string
  maxPrice: string
  inStockOnly: string
  clearFilters: string
  outOfStock: string
  noProductsYet: string
  noProductsMatch: string
  code: string
  footer: string
  all: string
  showing: (count: number, total: number) => string
  whatsappMessage: (name: string, code: string, price: string) => string
  chooseLanguage: string
  languageNameEn: string
  languageNameSi: string
}

export const dict: Record<Lang, Dict> = {
  en: {
    siteTitle: 'Beto',
    tagline: 'Browse our shoes below and tap "Inquire on WhatsApp" to order.',
    inquireButton: 'Inquire on WhatsApp',
    category: 'Category',
    type: 'Type',
    minPrice: 'Min price',
    maxPrice: 'Max price',
    inStockOnly: 'In stock only',
    clearFilters: 'Clear filters',
    outOfStock: 'Out of stock',
    noProductsYet: 'No products yet — check back soon!',
    noProductsMatch: 'No products match these filters.',
    code: 'Code',
    footer: 'All prices in LKR.',
    all: 'All',
    showing: (count, total) => `Showing ${count} of ${total} products`,
    whatsappMessage: (name, code, price) =>
      `Hi! I'm interested in *${name}* (Code: ${code}), priced at LKR ${price}. Is it available?`,
    chooseLanguage: 'Choose your language',
    languageNameEn: 'English',
    languageNameSi: 'සිංහල',
  },
  si: {
    siteTitle: 'Beto',
    tagline: "අපගේ සපත්තු එකතුව පහතින් බලන්න. නියම කරගැනීමට 'WhatsApp මගින් විමසන්න' බොත්තම ඔබන්න.",
    inquireButton: 'WhatsApp මගින් විමසන්න',
    category: 'කාණ්ඩය',
    type: 'වර්ගය',
    minPrice: 'අවම මිල',
    maxPrice: 'උපරිම මිල',
    inStockOnly: 'තොගයේ ඇති පමණක්',
    clearFilters: 'පෙරහන් ඉවත් කරන්න',
    outOfStock: 'තොගයේ නැත',
    noProductsYet: 'තවම නිෂ්පාදන නැත — නැවත පරීක්ෂා කරන්න!',
    noProductsMatch: 'මෙම පෙරහන් වලට ගැළපෙන නිෂ්පාදන නැත.',
    code: 'කේතය',
    footer: 'සියලුම මිල ගණන් රු. (LKR) වලින්.',
    all: 'සියල්ල',
    showing: (count, total) => `නිෂ්පාදන ${total} න් ${count} ක් පෙන්වමින්`,
    whatsappMessage: (name, code, price) =>
      `ආයුබෝවන්! මට *${name}* (කේතය: ${code}) ගැන උනන්දුවක් තියෙනවා. මිල: රු. ${price}. මේක දැනට තියෙනවද?`,
    chooseLanguage: 'ඔබගේ භාෂාව තෝරන්න',
    languageNameEn: 'English',
    languageNameSi: 'සිංහල',
  },
}

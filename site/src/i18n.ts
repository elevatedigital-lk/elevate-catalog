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
  whatsappMessageDetailed: (
    name: string,
    code: string,
    price: string,
    color: string,
    size: string,
  ) => string
  chooseLanguage: string
  languageNameEn: string
  languageNameSi: string
  moreFilters: string
  priceRange: string
  done: string
  filtersActive: (count: number) => string
  viewDetails: string
  backToCatalog: string
  howToOrder: string
  description: string
  sizesAvailable: string
  sizeChart: string
  orderPolicy: string
  stepsToOrder: string
  homeLink: string
  color: string
  size: string
  selectColor: string
  selectSize: string
  selectBothToInquire: string
  nudgeTitle: string
  nudgeBody: string
  nudgeDismiss: string
  heroHeadline: string
  heroSubtext: string
  sortBy: string
  sortNewest: string
  sortPriceLow: string
  sortPriceHigh: string
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
    whatsappMessageDetailed: (name, code, price, color, size) =>
      `Hi! I'm interested in *${name}* (Code: ${code}), priced at LKR ${price}. Color: ${color}, Size: ${size}. Is it available?`,
    chooseLanguage: 'Choose your language',
    languageNameEn: 'English',
    languageNameSi: 'සිංහල',
    moreFilters: 'Price & stock',
    priceRange: 'Price range',
    done: 'Done',
    filtersActive: (count) => `${count} active`,
    viewDetails: 'View details',
    backToCatalog: '← Back to catalog',
    howToOrder: 'How to Order',
    description: 'Description',
    sizesAvailable: 'Available sizes',
    sizeChart: 'Size chart',
    orderPolicy: 'Good to know',
    stepsToOrder: 'Steps to order',
    homeLink: 'Catalog',
    color: 'Color',
    size: 'Size',
    selectColor: 'Select a color',
    selectSize: 'Select a size',
    selectBothToInquire: 'Please select a color and size to inquire',
    nudgeTitle: 'New here?',
    nudgeBody: 'See how ordering works in a few quick steps.',
    nudgeDismiss: 'Close',
    heroHeadline: 'Quality shoes, made in Sri Lanka',
    heroSubtext: 'Pick a style below and inquire on WhatsApp — simple as that.',
    sortBy: 'Sort',
    sortNewest: 'Newest',
    sortPriceLow: 'Price: Low to High',
    sortPriceHigh: 'Price: High to Low',
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
    whatsappMessageDetailed: (name, code, price, color, size) =>
      `ආයුබෝවන්! මට *${name}* (කේතය: ${code}) ගැන උනන්දුවක් තියෙනවා. මිල: රු. ${price}. වර්ණය: ${color}, සයිස් එක: ${size}. මේක දැනට තියෙනවද?`,
    chooseLanguage: 'ඔබගේ භාෂාව තෝරන්න',
    languageNameEn: 'English',
    languageNameSi: 'සිංහල',
    moreFilters: 'මිල සහ තොගය',
    priceRange: 'මිල පරාසය',
    done: 'සම්පූර්ණයි',
    filtersActive: (count) => `${count} ක් යොදා ඇත`,
    viewDetails: 'විස්තර බලන්න',
    backToCatalog: '← නිෂ්පාදන ලැයිස්තුවට',
    howToOrder: 'ඇණවුම් කරන ආකාරය',
    description: 'විස්තරය',
    sizesAvailable: 'තිබෙන සයිස්',
    sizeChart: 'සයිස් ප්‍රස්ථාරය',
    orderPolicy: 'දැනගත යුතු දේ',
    stepsToOrder: 'ඇණවුම් කරන පියවර',
    homeLink: 'නිෂ්පාදන ලැයිස්තුව',
    color: 'වර්ණය',
    size: 'සයිස් එක',
    selectColor: 'වර්ණයක් තෝරන්න',
    selectSize: 'සයිස් එකක් තෝරන්න',
    selectBothToInquire: 'විමසීමට පෙර වර්ණයක් සහ සයිස් එකක් තෝරන්න',
    nudgeTitle: 'අලුතින් පැමිණියෙක්ද?',
    nudgeBody: 'ඇණවුම් කරන ආකාරය විනාඩියකින් බලන්න.',
    nudgeDismiss: 'වසන්න',
    heroHeadline: 'ශ්‍රී ලංකාවේ හස්ත නිර්මිත ගුණාත්මක සපත්තු',
    heroSubtext: 'පහතින් මාදිලියක් තෝරලා WhatsApp මගින් විමසන්න — එච්චරයි.',
    sortBy: 'පෙළගැස්ම',
    sortNewest: 'අලුත්ම',
    sortPriceLow: 'මිල: අඩුම සිට වැඩිම',
    sortPriceHigh: 'මිල: වැඩිම සිට අඩුම',
  },
}

// Sindhi (Perso-Arabic script). Keys are the English text as rendered.
import common from './common';
import home from './home';
import products from './products';
import pages from './pages';
import blog from './blog';

export default {
  dictionary: { ...common, ...home, ...products, ...pages, ...blog },
  months: ['جنوري', 'فيبروري', 'مارچ', 'اپريل', 'مئي', 'جون', 'جولاءِ', 'آگسٽ', 'سيپٽمبر', 'آڪٽوبر', 'نومبر', 'ڊسمبر'],
  fullStop: '.',
};

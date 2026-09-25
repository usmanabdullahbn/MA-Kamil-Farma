// Pashto. Keys are the English text as rendered.
import common from './common';
import home from './home';
import products from './products';
import pages from './pages';
import blog from './blog';

export default {
  dictionary: { ...common, ...home, ...products, ...pages, ...blog },
  months: ['جنوري', 'فبروري', 'مارچ', 'اپرېل', 'مۍ', 'جون', 'جولای', 'اګست', 'سپټمبر', 'اکتوبر', 'نومبر', 'ډسمبر'],
  fullStop: '.',
};

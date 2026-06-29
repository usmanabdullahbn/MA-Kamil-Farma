import { Link, useParams } from 'react-router-dom';
import {
  ALL_PRODUCTS,
  getLabel,
  getProductSlug,
} from './NewProducts';
import './ProductPage.css';

const productImageFiles = import.meta.glob('../assert/New folder/*.png', {
  eager: true,
  import: 'default'
});

const productBrochureFiles = import.meta.glob('../assert/Literature - Poultry Products/*.pdf', {
  eager: true,
  import: 'default'
});

const BROCHURE_FILE_BY_PRODUCT = {
  Xinmak: 'XINKMAK WSP.pdf',
  'Floxy N-Mak': 'Floxy N-Mak WSP.pdf',
  'Tylokam-10': 'Tylokam-10 Oral Powder.pdf',
  'Tylokam-100': 'Tylokam-100 Soluble Powder.pdf',
  'Doxykam-50': 'Doxykam-50 Powder.pdf',
  'Doxykam-80': 'Doxykam-80 Powder.pdf',
  Colikam: 'Colikam powder.pdf',
  'Colikam-50': 'Colikam-50 WSP.pdf',
  'Neokam-72': 'Neokam-72 Powder.pdf',
  'Neokam-100': 'Neokam-100 Powder.pdf',
  'Oxykam-95%': 'oxykam-95_ WSP.pdf',
  'Mprokam-50': 'Mprokam-50.pdf',
  'Mprokam-90': 'Mprokam-90 Powder.pdf',
  'Chlorkam-200': 'Chlorkam-200 WSP.pdf',
  'Sintolin Plus': 'Sintolin Plus.pdf',
  'Pefloxkam-10': 'Pefloxkam-10.pdf',
  'Ofloxkam-10': 'Ofloxkam-10.pdf',
  'Makflor-25': 'Makflor-25 Oral liquid.pdf',
  'Makflor-23': 'Makflor-23 Oral Liquid.pdf',
  'Tilkam-25': 'Tilkam-25 Solution.pdf',
  'Enrokam C-20': 'Enrokam C 20.pdf',
  'Enrokam C-10': 'Enrokam C-10 oral solution.pdf',
  'Bromokam-5': 'Bromokam-5 Oral Liquid.pdf',
  'Bronchoment-20': 'Bronchoment-20 Oral Liquid.pdf',
  Moxclav: 'Moxclav Powder.pdf',
  'Mak Amox-50': 'Mak Amox-50 Powder.pdf',
  'Mak Amox-80': 'Mak Amox-80 Powder.pdf',
  'Mak Amox C-15': 'Mak Amox C-15 Water Soluble Powder.pdf',
  'Mak Amox C-20': 'Mak Amox C-20 WSP.pdf',
  'Mak Amox C-50': 'Mak Amox C-50 Water Soluble Powder.pdf',
  'Mox-LS': 'Mox-LS.pdf',
  Flushkam: 'Fluskam WSP.pdf',
  Makliv: 'Makliv Solution.pdf',
  Hepakam: 'Hepakam.pdf',
  'C-Kam 100': 'C-Kam 100 Powder.pdf',
  'C-Kam 250': 'C Kam-250.pdf',
  'Mak Gumbonil': 'Mak Gumbonil Powder.pdf',
  'Mak Fivevit': 'Mak Fivevit.pdf',
  'Mak Fourvit': 'Mak Fourvit Oral Liquid.pdf',
  'Mak Ze-Sel Sol': 'Mak Zesel Solution.pdf',
};

const makflor23Dosage = [
  {
    use: 'Prevention',
    dosage: '1 ml per 4 litres of drinking water',
    duration: '3-5 days',
  },
  {
    use: 'Treatment',
    dosage: '1 ml per 2 litres of drinking water',
    note: '15-30 mg/kg body weight',
    duration: '3-5 days',
  },
];

const makflorBenefits = [
  'Broad-spectrum action against Gram-positive and Gram-negative bacteria.',
  'Supports the management of respiratory infections including CRD, CCRD, Mycoplasma and pneumonia.',
  'Helps control gastrointestinal infections including E. coli and fowl typhoid.',
  'Supports rapid recovery and improved flock health during bacterial outbreaks.',
];

const PRODUCT_FAMILIES = [
  {
    label: 'Tylokam',
    products: ['Tylokam-100', 'Tylokam-10'],
  },
  {
    label: 'Xinmak',
    products: ['Xinmak', 'Xinmak Oral'],
  },
  {
    label: 'Doxykam',
    products: ['Doxykam-80', 'Doxykam-50'],
  },
  {
    label: 'Colikam',
    products: ['Colikam', 'Colikam-50'],
  },
  {
    label: 'Mprokam',
    products: ['Mprokam-90', 'Mprokam-50'],
  },
  {
    label: 'Neokam',
    products: ['Neokam-100', 'Neokam-72'],
  },
  {
    label: 'Mak Amox',
    products: ['Mak Amox-50', 'Mak Amox-80', 'Mak Amox C-20', 'Mak Amox C-50', 'Mak Amox-BLC', 'Mak Amox C-15'],
  },
  {
    label: 'Mak Ze-Sel',
    products: ['Mak Ze-Sel Sol', 'Mak Ze-Sel Forte', 'Mak Ze-Sel'],
  },
  {
    label: 'Makflor',
    products: ['Makflor-23', 'Makflor C-23', 'Makflor-20', 'Makflor-25', 'Makflor C-25', 'Makflor C-10'],
  },
  {
    label: 'Enrokam',
    products: ['Enrokam C-20', 'Enrokam C-10', 'Enrokam AG-10'],
  },
  {
    label: 'Bronchoment',
    products: ['Bronchoment-10', 'Bronchoment-20', 'Bronchoment-50'],
  },
  {
    label: 'Sintolin',
    products: ['Sintolin-44', 'Sintolin-40', 'Sintolin-110', 'Sintolin Plus'],
  },
  {
    label: 'C-Kam',
    products: ['C-Kam 100', 'C-Kam 250'],
  },
  {
    label: 'Moxclav',
    products: ['Moxclav', 'Moxclav-C'],
  },
];

const getMappedFamily = product =>
  PRODUCT_FAMILIES.find(family => family.products.includes(product.name));

const getFamily = product => getMappedFamily(product)?.label || product.name.split(/[-\s]/)[0];

const getRelatedProducts = product => {
  const mappedFamily = getMappedFamily(product);

  if (!mappedFamily) {
    const family = getFamily(product);
    return ALL_PRODUCTS
      .filter(item => item.id !== product.id && getFamily(item) === family)
      .slice(0, 3);
  }

  return mappedFamily.products
    .filter(name => name !== product.name)
    .map(name => ALL_PRODUCTS.find(item => item.name === name))
    .filter(Boolean);
};

const formatCategory = category => getLabel(category).replace(/s$/, '');

const normalizeSlug = value =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getProductImage = product => {
  const candidates = [product.name, product.fullName];

  for (const candidate of candidates) {
    const slug = normalizeSlug(candidate);
    const match = Object.entries(productImageFiles).find(([filePath]) => {
      const fileName = filePath.split('/').pop().replace(/^\d+_p\d+_/, '').replace(/\.png$/, '');
      const fileSlug = normalizeSlug(fileName);
      return fileSlug.includes(slug) || slug.includes(fileSlug);
    });

    if (match) return match[1];
  }

  return null;
};

const getProductBrochure = product => {
  const fileName = BROCHURE_FILE_BY_PRODUCT[product.name];

  if (!fileName) return null;

  const match = Object.entries(productBrochureFiles).find(([filePath]) => filePath.endsWith(`/${fileName}`));

  return match?.[1] || null;
};

const cleanCatalogueText = value =>
  String(value || '')
    .replace(/Â·/g, '·')
    .replace(/\s+/g, ' ')
    .trim();

const parseCompositionItem = item => {
  const normalizedItem = cleanCatalogueText(item);
  const match = normalizedItem.match(/^(.+?)\s+(\d[\d.,]*(?:\.\d+)?\s*(?:MIU|IU|mg|g|ml|%)(?:\s*\([^)]*\))?)$/i);

  if (!match) {
    return {
      ingredient: normalizedItem,
      strength: '',
    };
  }

  return {
    ingredient: match[1].trim(),
    strength: match[2].replace(/\s+/g, ' '),
  };
};

const getComposition = product => {
  const normalizedComposition = cleanCatalogueText(product.composition);
  const basisMatch = normalizedComposition.match(/\s+per\s+(.+)$/i);
  const body = basisMatch ? normalizedComposition.slice(0, basisMatch.index).trim() : normalizedComposition;
  const basis = basisMatch ? basisMatch[1].trim() : product.form === 'Liquid' ? 'ml' : 'gram';
  const entries = body.split(/\s*·\s*/).filter(Boolean).map(parseCompositionItem);

  return {
    basis,
    entries,
    summary: body,
  };
};

const getDosageRows = product => {
  if (product.name === 'Makflor-23') return makflor23Dosage;

  return [
    {
      use: 'Administration',
      dosage: product.dosage,
      duration: 'As directed',
    },
  ];
};

const getBenefits = product => {
  if (product.name === 'Makflor-23') return makflorBenefits;

  return product.benefits
    .split(/\.\s+(?=[A-Z0-9])/)
    .map(item => item.trim().replace(/\.$/, ''))
    .filter(Boolean)
    .map(item => `${item}.`);
};

export default function ProductPage() {
  const { slug } = useParams();
  const product = ALL_PRODUCTS.find(item => getProductSlug(item) === slug);

  if (!product) {
    return (
      <div className="product-detail product-detail--missing">
        <main className="product-detail__missing">
          <h1>Product not found</h1>
          <Link to="/products">Back to products</Link>
        </main>
      </div>
    );
  }

  const composition = getComposition(product);
  const dosageRows = getDosageRows(product);
  const benefits = getBenefits(product);
  const family = getFamily(product);
  const productImage = getProductImage(product);
  const productBrochure = getProductBrochure(product);
  const relatedProducts = getRelatedProducts(product);

  return (
    <div className="product-detail">
      <main>
        <section className="product-detail__intro">
          <div className="product-detail__container">
            <nav className="product-detail__crumbs" aria-label="Breadcrumb">
              <Link to="/products">Products</Link>
              <span>&rsaquo;</span>
              <Link to={`/products?category=${product.category}`}>{getLabel(product.category)}</Link>
              <span>&rsaquo;</span>
              <strong>{product.fullName}</strong>
            </nav>

            <div className="product-detail__hero">
              <div className="product-packaging">
                <p className="product-detail__eyebrow">Product Packaging</p>
                <div className="product-packaging__frame" aria-label="Product image placeholder">
                  {productImage ? (
                    <img src={productImage} alt={product.fullName} className="product-packaging__image" />
                  ) : (
                    <div className="product-packaging__placeholder">
                      <span>Product image placeholder</span>
                    </div>
                  )}
                </div>
                <small>Packaging artwork from the approved product catalogue.</small>
              </div>

              <div className="product-summary">
                <p className="product-detail__eyebrow">{formatCategory(product.category)}</p>
                <h1>{product.fullName}</h1>
                <h2>{product.form === 'Liquid' ? 'Oral liquid' : product.form} &middot; {product.species}</h2>

                <div className="product-composition">
                  <p className="product-detail__eyebrow">Composition</p>
                  <span>Each {composition.basis} contains</span>
                  <div className="product-composition__list">
                    {composition.entries.map(entry => (
                      <div className="product-composition__item" key={`${entry.ingredient}-${entry.strength}`}>
                        <strong>{entry.ingredient}</strong>
                        {entry.strength && <b>{entry.strength}</b>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="product-actions">
                  <a className="product-button product-button--primary" href="#downloads">&darr; Download PIS Sheet</a>
                  {productBrochure ? (
                    <a className="product-button" href={productBrochure} download>&darr; Download Brochure</a>
                  ) : (
                    <span className="product-button product-button--disabled">Brochure unavailable</span>
                  )}
                </div>

                <a className="product-enquire" href="https://wa.me/923352249111" target="_blank" rel="noreferrer">
                  <span>Enquire about this product</span>
                  <b>&#8599;</b>
                </a>
              </div>
            </div>

            <div className="product-facts">
              <ProductFact label="Product Family" value={family} />
              <ProductFact label="Dosage Form" value={product.form === 'Liquid' ? 'Oral liquid' : product.form} />
              <ProductFact label="Primary Species" value={product.species} />
              <ProductFact label="Active Ingredient" value={composition.summary} />
            </div>
          </div>
        </section>

        <section className="product-detail__guide">
          <div className="product-detail__container product-guide-grid">
            <div className="product-dosage">
              <p className="product-detail__eyebrow">Administration Guide</p>
              <h2>Recommended dosage</h2>
              <div className="product-dosage__table">
                <div className="product-dosage__head">
                  <span>Use</span>
                  <span>Dosage</span>
                  <span>Duration</span>
                </div>
                {dosageRows.map(row => (
                  <div className="product-dosage__row" key={row.use}>
                    <strong>{row.use}</strong>
                    <p>{row.dosage}{row.note && <small>{row.note}</small>}</p>
                    <span>{row.duration}</span>
                  </div>
                ))}
              </div>
              <p className="product-dosage__notice">
                <strong>Administration:</strong> Prepare fresh medicated drinking water daily and use according to the approved product literature and veterinary direction.
              </p>
            </div>

            <aside className="product-downloads" id="downloads">
              <p className="product-detail__eyebrow">Document Library</p>
              <h2>Technical downloads</h2>
              <ProductDownload title="PIS Sheet" subtitle="Product Information Sheet · PDF" />
              <ProductDownload
                title="Product Brochure"
                subtitle={productBrochure ? 'Marketing literature · PDF' : 'Brochure not available for this product'}
                href={productBrochure}
                download={Boolean(productBrochure)}
              />
            </aside>
          </div>
        </section>

        <section className="product-detail__overview">
          <div className="product-detail__container">
            <p className="product-detail__eyebrow">Product Overview</p>
            <h2>Benefits and applications</h2>
            <ul>
              {benefits.map(benefit => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="product-detail__cta">
          <div className="product-detail__container product-cta__inner">
            <div>
              <p className="product-detail__eyebrow">Partner With Us</p>
              <h2>Need technical or commercial information?</h2>
            </div>
            <a href="https://wa.me/923352249111" target="_blank" rel="noreferrer">Send product enquiry &#8599;</a>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="product-detail__related">
            <div className="product-detail__container">
              <p className="product-detail__eyebrow">Related Products</p>
              <h2>Explore the {family} family</h2>
              <div className="product-related__grid">
                {relatedProducts.map(item => (
                  <Link className="product-related__card" to={`/products/detail/${getProductSlug(item)}`} key={item.id}>
                    <span>{item.form === 'Liquid' ? 'Oral liquid' : item.form}</span>
                    <strong>{item.name}</strong>
                    <b>&#8599;</b>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="product-detail__footer">
        <span>M.A. Kamil Farma</span>
        <span>Sample product-detail layout</span>
      </footer>
    </div>
  );
}

function ProductFact({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ProductDownload({ title, subtitle, href = '#downloads', download = false }) {
  if (!href) {
    return (
      <span className="product-download product-download--disabled">
        <span>
          <strong>{title}</strong>
          <small>{subtitle}</small>
        </span>
        <b>&minus;</b>
      </span>
    );
  }

  return (
    <a className="product-download" href={href} download={download}>
      <span>
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </span>
      <b>&darr;</b>
    </a>
  );
}

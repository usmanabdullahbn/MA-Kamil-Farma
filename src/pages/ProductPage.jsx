import { Link, useParams } from 'react-router-dom';
import {
  ALL_PRODUCTS,
  getLabel,
  getProductSlug,
} from './NewProducts';
import productCataloguePdf from '../assert/E-Catalog (M. A. Kamil Farma).pdf';
import './ProductPage.css';

const productImageFiles = import.meta.glob('../assert/New folder/*.png', {
  eager: true,
  import: 'default'
});

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

const getFamily = product => product.name.split(/[-\s]/)[0];

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

const getComposition = product => {
  const match = product.composition.match(/^(.+?)\s+(\d+(?:\.\d+)?\s*(?:mg|MIU|IU))/i);

  if (!match) {
    return {
      ingredient: product.composition.split(' per ')[0],
      strength: '',
    };
  }

  return {
    ingredient: match[1].trim(),
    strength: match[2].replace(/\s+/g, ' '),
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
    .split('. ')
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
  const relatedProducts = ALL_PRODUCTS
    .filter(item => item.id !== product.id && getFamily(item) === family)
    .slice(0, 3);

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
                  <span>Each ml contains</span>
                  <div>
                    <strong>{composition.ingredient}</strong>
                    {composition.strength && <b>{composition.strength}</b>}
                  </div>
                </div>

                <div className="product-actions">
                  <a className="product-button product-button--primary" href="#downloads">&darr; Download PIS Sheet</a>
                  <a className="product-button" href={productCataloguePdf} download>&darr; Download Brochure</a>
                </div>

                <a className="product-enquire" href="https://wa.me/923352249111" target="_blank" rel="noreferrer">
                  <span>Enquire about this product</span>
                  <b>&#8599;</b>
                </a>
                <p className="product-summary__note">
                  Developer: connect these buttons to the approved product-specific PDF files stored in the CMS.
                </p>
              </div>
            </div>

            <div className="product-facts">
              <ProductFact label="Product Family" value={family} />
              <ProductFact label="Dosage Form" value={product.form === 'Liquid' ? 'Oral liquid' : product.form} />
              <ProductFact label="Primary Species" value={product.species} />
              <ProductFact label="Active Ingredient" value={composition.ingredient} />
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
              <ProductDownload title="Product Brochure" subtitle="Marketing literature · PDF" href={productCataloguePdf} download />
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

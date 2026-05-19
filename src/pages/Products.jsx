import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import './Products.css';

const BRANDS = {
  'pharma-nutra': {
    name: 'Pharma & Nutra Excipients', color: '#003366', icon: '⚗️',
    desc: 'High-purity raw materials, amino acids, vitamins, and excipients for pharmaceutical and nutraceutical manufacturers.',
    products: [
      { name: 'L-Lysine HCl 98.5%', form: 'Powder', species: 'All', desc: 'Essential amino acid for feed fortification and pharma formulations.' },
      { name: 'DL-Methionine 99%', form: 'Powder', species: 'All', desc: 'Sulphur-containing amino acid for poultry and livestock nutrition.' },
      { name: 'Vitamin A Acetate', form: 'Powder', species: 'All', desc: 'Stabilised vitamin A for premix and feed applications.' },
      { name: 'Vitamin D3 500,000 IU', form: 'Powder', species: 'All', desc: 'High-potency cholecalciferol for bone health and immunity.' },
      { name: 'Choline Chloride 60%', form: 'Powder', species: 'Poultry', desc: 'Essential nutrient for liver function and fat metabolism.' },
      { name: 'Sodium Bicarbonate IP', form: 'Powder', species: 'All', desc: 'Pharmaceutical-grade buffering agent and excipient.' },
    ]
  },
  'kamil-farma': {
    name: 'M.A. Kamil Farma Line', color: '#1e6b40', icon: '💊',
    desc: 'Registered veterinary pharmaceuticals for poultry and livestock — antibiotics, anti-virals, phytogenics, and premixes.',
    products: [
      { name: 'Amoxicillin 20% WSP', form: 'Powder', species: 'Poultry', desc: 'Broad-spectrum antibiotic for respiratory and enteric infections.' },
      { name: 'Doxycycline 10% WSP', form: 'Powder', species: 'Poultry', desc: 'Tetracycline antibiotic for CRD and mycoplasmosis treatment.' },
      { name: 'Tylosin Tartrate 50%', form: 'Powder', species: 'Poultry', desc: 'Macrolide antibiotic effective against Mycoplasma species.' },
      { name: 'Phytogenic Blend Pro', form: 'Powder', species: 'Poultry & Livestock', desc: 'Essential oil blend for gut health and antibiotic reduction.' },
      { name: 'Multivitamin Liquid', form: 'Liquid', species: 'All', desc: 'Complete water-soluble vitamin complex for stress support.' },
      { name: 'Liver Tonic & Detox', form: 'Liquid', species: 'Poultry', desc: 'Herbal liver support for detoxification and FCR improvement.' },
    ]
  },
  'rotamin': {
    name: 'Rotamin Line', color: '#C9A635', icon: '🌿',
    desc: 'Science-backed binders, probiotics, and yeast solutions for feed efficiency, gut health, and mycotoxin management.',
    products: [
      { name: 'Rotamin Binder Pro', form: 'Powder', species: 'Poultry & Livestock', desc: 'Bentonite + yeast cell wall blend for broad-spectrum mycotoxin binding.' },
      { name: 'Rota Plus Probiotic', form: 'Powder', species: 'Poultry', desc: '5-strain probiotic with prebiotic FOS for gut microbiome balance.' },
      { name: 'Rotamin Premium', form: 'Powder', species: 'All', desc: 'All-in-one binder, probiotic and organic acid complex.' },
      { name: 'Yeast Culture Blend', form: 'Powder', species: 'Dairy', desc: 'Live yeast culture for rumen function and milk yield improvement.' },
      { name: 'Rota Plus Dairy', form: 'Powder', species: 'Dairy', desc: 'Specialised formulation for dairy cow gut health and production.' },
      { name: 'Rotamin Aqua', form: 'Powder', species: 'Aquaculture', desc: 'Water-stable binder and probiotic blend for aqua feed.' },
    ]
  },
  'pet-care': {
    name: 'Pet Care Division', color: '#8b4513', icon: '🐾',
    desc: 'A growing range of cat litter, pet medicines, and accessories for companion animal care.',
    products: [
      { name: 'Premium Bentonite Litter', form: 'Granule', species: 'Cats', desc: 'Fast-clumping, odour-control bentonite cat litter. 5kg & 10kg packs.' },
      { name: 'Silica Gel Litter', form: 'Granule', species: 'Cats', desc: 'Advanced moisture-absorbing silica gel for superior odour control.' },
      { name: 'Pet Multivitamin Drops', form: 'Liquid', species: 'Dogs & Cats', desc: 'Daily vitamin supplement for companion animal vitality.' },
      { name: 'Flea & Tick Spray', form: 'Liquid', species: 'Dogs & Cats', desc: 'Safe, effective ectoparasite control spray for pets.' },
    ]
  },
  'indenting': {
    name: 'Indenting Division', color: '#4a6080', icon: '🌍',
    desc: 'Import and supply of antibiotics, additives, premixes, and toxin binders from global manufacturers.',
    products: [
      { name: 'Imported Antibiotics', form: 'Various', species: 'All', desc: 'Wide range of imported veterinary antibiotics from certified global suppliers.' },
      { name: 'Feed Additives Range', form: 'Powder', species: 'All', desc: 'Enzymes, organic acids, and specialty additives from Europe & Asia.' },
      { name: 'Premix Ingredients', form: 'Powder', species: 'All', desc: 'Micro and macro mineral premix raw materials for feed manufacturers.' },
      { name: 'Toxin Binders', form: 'Powder', species: 'All', desc: 'Imported mycotoxin binders with certificate of analysis.' },
    ]
  },
};

const SPECIES = ['All', 'Poultry', 'Dairy', 'Livestock', 'Aquaculture', 'Dogs & Cats'];

export default function Products() {
  const { brand } = useParams();
  const [searchParams] = useSearchParams();
  const [activeSpecies, setActiveSpecies] = useState('All');
  const [search, setSearch] = useState('');

  const currentBrand = brand && BRANDS[brand];
  const allProducts = currentBrand
    ? currentBrand.products
    : Object.values(BRANDS).flatMap(b => b.products.map(p => ({ ...p, brand: b.name, brandColor: b.color })));

  const filtered = allProducts.filter(p => {
    const matchSpecies = activeSpecies === 'All' || p.species.includes(activeSpecies);
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    return matchSpecies && matchSearch;
  });

  return (
    <div className="products-page">
      <div className="products-hero">
        <div className="container">
          {currentBrand ? (
            <>
              <Link to="/products" className="products-back">← All Products</Link>
              <div className="products-hero__icon" style={{ background: currentBrand.color + '20', color: currentBrand.color }}>
                {currentBrand.icon}
              </div>
              <h1 className="section-title section-title--white" style={{ marginTop: 16 }}>{currentBrand.name}</h1>
              <p className="section-lead" style={{ color: 'rgba(255,255,255,0.65)' }}>{currentBrand.desc}</p>
            </>
          ) : (
            <>
              <span className="section-eyebrow">Products & Solutions</span>
              <h1 className="section-title section-title--white">Complete Product Portfolio</h1>
              <p className="section-lead" style={{ color: 'rgba(255,255,255,0.65)' }}>Five distinct product lines serving feed mills, farms, pharma manufacturers, and pet owners.</p>
            </>
          )}
        </div>
      </div>

      {/* Brand tabs (shown when not on a specific brand page) */}
      {!currentBrand && (
        <div className="products-brands">
          <div className="container">
            <div className="products-brands-grid">
              {Object.entries(BRANDS).map(([key, b]) => (
                <Link key={key} to={`/products/${key}`} className="brand-card" style={{ '--bc': b.color }}>
                  <span className="brand-card__icon">{b.icon}</span>
                  <h3>{b.name}</h3>
                  <p>{b.desc.slice(0, 80)}…</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="products-filters">
        <div className="container products-filters-inner">
          <div className="products-filter-species">
            {SPECIES.map(s => (
              <button key={s} className={`pf-btn ${activeSpecies === s ? 'active' : ''}`} onClick={() => setActiveSpecies(s)}>{s}</button>
            ))}
          </div>
          <input className="products-search" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="container products-grid-wrap">
        <p className="products-count">{filtered.length} products</p>
        <div className="products-grid-full">
          {filtered.map((p, i) => (
            <div key={i} className="prod-item">
              <div className="prod-item__img" style={{ background: (p.brandColor || currentBrand?.color || '#003366') + '12' }}>
                <div className="prod-item__placeholder" style={{ color: p.brandColor || currentBrand?.color || '#003366' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8L6 7h12l-2-4z"/></svg>
                </div>
                <div className="prod-item__badges">
                  <span className="tag">{p.form}</span>
                  {p.brand && <span className="tag" style={{ background: (p.brandColor||'#003') + '15', color: p.brandColor||'#003' }}>{p.brand}</span>}
                </div>
              </div>
              <div className="prod-item__body">
                <div className="prod-item__species">{p.species}</div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="prod-item__wa">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Enquire
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

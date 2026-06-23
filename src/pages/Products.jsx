import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import './Products.css';

// Legacy products page kept for reference.
// The active route now uses the rebuilt page in NewProducts.jsx.

const productImageFiles = import.meta.glob('../assert/new products/*.png', {
  eager: true,
  import: 'default'
});

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

// ─────────────────────────────────────────────────────────────────────────────
// ALL PRODUCTS FROM M.A. KAMIL FARMA E-CATALOG
// Data sourced directly from official product catalogue PDF
// ─────────────────────────────────────────────────────────────────────────────
export const ALL_PRODUCTS = [

  // ── POWDER ANTIBIOTICS ─────────────────────────────────────────────────────
  {
    id: 1, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'T Foskam', fullName: 'T Foskam Oral Powder',
    composition: 'Fosfomycin as Calcium 200mg · Tylosin as Tartrate 100mg · Fructose 1,6-Diphosphate 180mg · Sodium Phosphate 150mg · Magnesium Sulphate 100mg per gram',
    dosage: 'Treatment: 1g in 2L drinking water for 3–5 days. Prevention: 1g in 4L for 3–5 days.',
    benefits: 'Broad-spectrum antibiotic effective against Mycoplasma, E. coli, and Salmonella. Treats CRD, Coryza, Typhoid, and Fowl Cholera. Controls Staphylococcus and Streptococcus infections. Supports rapid recovery from bacterial diseases in poultry.',
  },
  {
    id: 2, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Xinmak', fullName: 'Xinmak Water Soluble Powder',
    composition: 'Tylosin (as Tartrate) 200mg · Doxycycline as HCl 400mg · Colistin Sulphate 1 MIU · Bromhexine HCl 10mg per gram',
    dosage: 'Treatment: 1g in 4L drinking water for 3–5 days. Prevention: 1g in 8L for 3–5 days.',
    benefits: 'Treats CRD, CCRD, Mycoplasmosis, and other respiratory infections. Effective against gram-positive and gram-negative bacteria including E. coli, Salmonella, Clostridium, Pasteurella, Staphylococcus, and Streptococcus. Controls Coryza, Fowl Typhoid, and bacterial enteritis. Bromhexine acts as a mucolytic, improving drug penetration and reducing mucus viscosity.',
  },
  {
    id: 3, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Floxy N-Mak', fullName: 'Floxy N-Mak Water Soluble Powder',
    composition: 'Neomycin Sulphate 150mg · Florfenicol 100mg · Oxytetracycline HCl 300mg per gram',
    dosage: 'Treatment: 1g in 4L drinking water for 4–5 days. Prevention: 1g in 6L for 4–5 days.',
    benefits: 'Effective against gram-positive and gram-negative bacteria including E. coli and Pasteurella. Treats colisepticemia, synovitis, typhoid, and bacterial enteritis. Controls early chick mortality, cholera, and coryza. Manages respiratory infections like CRD, CCRD, airsacculitis, and Mycoplasmosis.',
  },
  {
    id: 4, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Tylokam-10', fullName: 'Tylokam-10 Oral Powder',
    composition: 'Tylosin (as Tartrate) 100mg per gram',
    dosage: 'Mycoplasma +ve flocks: 500g/1000kg feed. Mycoplasma −ve flocks: 220g/1000kg feed. Broiler: 50g/1000kg feed.',
    benefits: 'Prevents and treats Mycoplasma, CRD, and CCRD in poultry. Effective against sinusitis and airsacculitis. Supports respiratory health and improves recovery during outbreaks.',
  },
  {
    id: 5, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Tylokam-100', fullName: 'Tylokam-100 Soluble Powder',
    composition: 'Tylosin (as Tartrate) 1000mg per gram',
    dosage: '1g per 2 litres of water for 3–5 days. In feed: 300–500g per 1000kg feed for 3–5 days.',
    benefits: 'Prevents and treats Mycoplasma, CRD, and CCRD in poultry. Effective against sinusitis and airsacculitis. Supports respiratory health and improves recovery during outbreaks.',
  },
  {
    id: 6, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Doxykam-50', fullName: 'Doxykam-50 Powder',
    composition: 'Doxycycline as Hyclate 500mg per gram',
    dosage: '1g per 5–10 litres drinking water for 3–5 days. Use medicated water within 24 hours.',
    benefits: 'Treats gastrointestinal and respiratory infections in poultry. Effective against gram-positive and gram-negative bacteria. Controls infections caused by E. coli, Salmonella, Pasteurella, and Mycoplasma. Also targets Rickettsia, Haemophilus, Staphylococcus, Streptococcus, Campylobacter, and Chlamydia spp.',
  },
  {
    id: 7, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Doxykam-80', fullName: 'Doxykam-80 Powder',
    composition: 'Doxycycline as Hyclate 800mg per gram',
    dosage: '1g per 8–16 litres drinking water for 3–5 days. Use medicated water within 24 hours.',
    benefits: 'Treats gastrointestinal and respiratory infections in poultry. Effective against gram-positive and gram-negative bacteria. Controls infections caused by E. coli, Salmonella, Pasteurella, and Mycoplasma. Also targets Rickettsia, Haemophilus, Staphylococcus, Streptococcus, Campylobacter, and Chlamydia spp.',
  },
  {
    id: 8, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Colikam', fullName: 'Colikam Powder',
    composition: 'Colistin Sulphate 5,000,000 IU per gram',
    dosage: '1g in 10 litres of drinking water for 3–5 days.',
    benefits: 'Treats E. coli and Salmonella infections. Effective against Pseudomonas and Pasteurella. Controls Shigella and Proteus species. Supports quick recovery and reduces mortality.',
  },
  {
    id: 9, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Colikam-50', fullName: 'Colikam-50 Water Soluble Powder',
    composition: 'Colistin Sulphate 500mg per gram',
    dosage: '1g in 10–20 litres of drinking water for 3–5 days.',
    benefits: 'Treats E. coli and Salmonella infections. Effective against Pseudomonas and Pasteurella. Controls Shigella and Proteus species. Supports quick recovery and reduces mortality.',
  },
  {
    id: 10, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Neokam-72', fullName: 'Neokam-72 Powder',
    composition: 'Neomycin Sulphate 720mg per gram',
    dosage: '1g per 5 litres of drinking water for 3–7 days (30mg neomycin per kg bodyweight).',
    benefits: 'Prevents and treats GIT infections caused by E. coli and Salmonella spp. Specifically targets organisms sensitive to neomycin. Safe for use in broilers, layers, and breeders. Acts locally in the gut — not absorbed systemically.',
  },
  {
    id: 11, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Neokam-100', fullName: 'Neokam-100 Powder',
    composition: 'Neomycin Sulphate 1000mg per gram',
    dosage: '1g per 6–10 litres of drinking water for 3 to 5 days. 160–320g per ton of feed for 3–5 days.',
    benefits: 'Prevents and treats GIT infections caused by E. coli and Salmonella spp. Specifically targets organisms sensitive to neomycin. Safe for use in broilers, layers, and breeders. Acts locally in the gut — not absorbed systemically.',
  },
  {
    id: 12, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Oxykam-95%', fullName: 'Oxykam-95% Water Soluble Powder',
    composition: 'Oxytetracycline HCl 950mg per gram',
    dosage: 'Treatment: 1g per 4 litres of drinking water. Prevention: 1g per 8 litres.',
    benefits: 'Effective against gram-positive and gram-negative bacteria. Treats E. coli, Pasteurella, and Colisepticemia. Controls Cholera, Coryza, Typhoid, CRD, and CCRD. Manages bacterial enteritis and Mycoplasmosis.',
  },
  {
    id: 13, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Mprokam-50', fullName: 'Mprokam-50 Powder',
    composition: 'Amprolium HCl 500mg per gram',
    dosage: '1g per 3–5 litres of drinking water daily for 5 days.',
    benefits: 'Treatment of intestinal coccidiosis caused by Eimeria spp. susceptible to Amprolium.',
  },
  {
    id: 14, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Mprokam-90', fullName: 'Mprokam-90 Powder',
    composition: 'Amprolium HCl 900mg per gram',
    dosage: 'Prevention: 1g per 16 litres. Treatment: 1g per 8 litres of drinking water.',
    benefits: 'Treatment of intestinal coccidiosis caused by Eimeria spp. susceptible to Amprolium.',
  },
  {
    id: 15, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Chlorkam-200', fullName: 'Chlorkam-200 Water Soluble Powder',
    composition: 'Chlortetracycline HCl 200mg per gram',
    dosage: '100g per 75–100 litres of drinking water daily for 5 days.',
    benefits: 'Treats colibacillosis, especially secondary to infectious bursal disease. Controls CRD caused by Mycoplasma gallisepticum and E. coli. Effective against Salmonella enteritidis and S. typhimurium. Manages Pasteurella multocida infections in poultry.',
  },
  {
    id: 16, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Sintolin Plus', fullName: 'Sintolin Plus Oral Powder',
    composition: 'Lincomycin as HCl 50mg · Spectinomycin as HCl 75mg · Spiramycin Adipate 25mg · Bromhexine HCl 5mg per gram',
    dosage: 'Treatment: 1g per 2 litres for 3–5 days. Prevention: 1g per 4 litres for 3–5 days.',
    benefits: 'Effectively treats Mycoplasma, E. coli, Coryza, and Typhoid infections. Controls respiratory and gastrointestinal infections in poultry. Manages secondary bacterial infections during viral outbreaks. Supports fast recovery and improves flock health and performance.',
  },
  {
    id: 17, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Sintolin-40', fullName: 'Sintolin-40 Oral Powder',
    composition: 'Lincomycin as HCl 400mg per gram',
    dosage: 'Administer 3–6mg per kg bodyweight for 7 consecutive days (approx. 17mg per litre of drinking water). Mycoplasma: 75g per 1000 litres for 7 days.',
    benefits: 'Effectively treats Mycoplasma infections including CRD and CCRD. Controls necrotic enteritis caused by Clostridium perfringens. Manages dermatitis and skin infections caused by Staphylococcus. Supports faster recovery and improved flock performance.',
  },
  {
    id: 18, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Sintolin-44', fullName: 'Sintolin-44 Powder',
    composition: 'Lincomycin as HCl 44mg per gram',
    dosage: 'Weight gain: 50g per ton of feed. Necrotic enteritis and CRD control: 100g per ton. Severe CRD: 250–500g per ton of feed.',
    benefits: 'Improves feed conversion ratio (FCR) for better growth performance. Reduces mortality in poultry flocks. Easily mixable in feed, ensuring convenient administration. Highly palatable, promoting consistent feed intake.',
  },
  {
    id: 19, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Sintolin-110', fullName: 'Sintolin-110 Powder',
    composition: 'Lincomycin as HCl 110mg per gram',
    dosage: '20–40g of Sintolin-110 to be mixed per ton of feed.',
    benefits: 'Improves feed conversion ratio (FCR) for better growth performance. Reduces mortality in poultry flocks. Easily mixable in feed, ensuring convenient administration. Highly palatable, promoting consistent feed intake.',
  },
  {
    id: 20, category: 'powder-antibiotic', form: 'Powder', species: 'Poultry',
    name: 'Tmulinkam-45', fullName: 'Tmulinkam-45 Oral Powder',
    composition: 'Tiamulin Hydrogen Fumerate 450mg per gram',
    dosage: 'Poultry: 1g per 2 litres of drinking water for 5 days. Feed: 1g per 1kg of feed for 5 days. Use medicated water within 24 hours.',
    benefits: 'Effectively treats respiratory infections including bacterial and enzootic pneumonia. Combats Mycoplasmosis, ensuring better respiratory performance. Reduces mortality and enhances recovery. Effective against chlamydiosis and other tiamulin-sensitive infections. Supports rapid recovery and improved productivity in affected flocks.',
  },

  // ── LIQUID ANTIBIOTICS ─────────────────────────────────────────────────────
  {
    id: 21, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Pefloxkam-10', fullName: 'Pefloxkam-10 Solution',
    composition: 'Pefloxacin Methanesulfonate 139.6mg (equiv. Pefloxacin 100mg) per ml',
    dosage: 'Administer 1ml per 1–2 litres of drinking water for 3–4 days (10mg/kg B.W.). Dilute 5–10ml with 10L drinking water and administer orally for 3–4 days.',
    benefits: 'Effectively treats CRD, CCRD, and infectious coryza. Controls pullorum disease, fowl typhoid, and colibacillosis. Manages fowl cholera and staphylococcal infections. Supports rapid recovery and reduces mortality in poultry.',
  },
  {
    id: 22, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Ofloxkam-10', fullName: 'Ofloxkam-10 Oral Solution',
    composition: 'Ofloxacin 100mg per ml',
    dosage: 'Poultry: 5ml per 10 litres of drinking water. Dose can be doubled in severe cases.',
    benefits: 'Treats septicemia, arthritis, meningitis, and secondary bacterial infections. Effective against respiratory diseases like pneumonia, bronchitis, and sinusitis. Controls gastrointestinal infections such as enteritis and peritonitis. Manages urogenital infections including nephritis and metritis in sensitive species.',
  },
  {
    id: 23, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Makflor-25', fullName: 'Makflor-25 Oral Liquid',
    composition: 'Florfenicol 250mg per ml',
    dosage: 'As directed by a veterinarian. Suitable for drinking water administration.',
    benefits: 'Broad-spectrum antibiotic effective against respiratory infections, CRD, CCRD, Mycoplasma, Fowl Cholera, and Coryza. Inhibits bacterial protein synthesis at the 50S ribosomal subunit.',
  },
  {
    id: 24, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Makflor-23', fullName: 'Makflor-23 Oral Liquid',
    composition: 'Florfenicol 230mg per ml',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Effective against pneumonia, Mycoplasma, CRD, CCRD, Fowl Cholera, Fowl Typhoid, and Coryza. Broad-spectrum bacteriostatic activity against gram-positive and gram-negative bacteria.',
  },
  {
    id: 25, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Makflor-20', fullName: 'Makflor-20 Oral Liquid',
    composition: 'Florfenicol 200mg per ml',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Standard Florfenicol oral liquid for respiratory and enteric bacterial infections in poultry.',
  },
  {
    id: 26, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Makflor C-25', fullName: 'Makflor C-25 Liquid',
    composition: 'Florfenicol 250mg · Colistin Sulphate 0.50 MIU per ml',
    dosage: 'Prevention: 1ml in 2–3 litres for 3–5 days. Treatment: 1ml in 1–2 litres for 3–5 days.',
    benefits: 'Treats gram-positive and gram-negative bacterial infections in poultry. Effective against respiratory diseases like CRD, CCRD, pneumonia, and Mycoplasma. Manages systemic infections including omphalitis, perihepatitis, pericarditis, and endocarditis. Supports faster recovery and improves overall flock health.',
  },
  {
    id: 27, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Makflor C-23', fullName: 'Makflor C-23 Liquid',
    composition: 'Florfenicol 230mg · Colistin Sulphate 0.50 MIU per ml',
    dosage: 'Prevention: 1ml per 4 litres for 3–5 days. Treatment: 1ml per 2 litres for 3–5 days.',
    benefits: 'Dual-action Florfenicol + Colistin combination. Effective against respiratory and enteric bacterial infections in poultry.',
  },
  {
    id: 28, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Makflor C-10', fullName: 'Makflor C-10 Liquid',
    composition: 'Florfenicol 100mg · Colistin Sulphate 0.50 MIU per ml',
    dosage: '1ml in 1 litre of drinking water for 3–5 days.',
    benefits: 'Standard-concentration Florfenicol + Colistin for poultry respiratory and enteric infections.',
  },
  {
    id: 29, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Xinmak Oral', fullName: 'Xinmak Oral Liquid',
    composition: 'Tylosin Tartrate · Doxycycline HCl · Colistin Sulphate · Bromhexine HCl per ml',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Liquid version of Xinmak. Treats CRD, CCRD, Mycoplasmosis, respiratory and enteric infections with mucolytic support via Bromhexine.',
  },
  {
    id: 30, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Sulpha T-Mak', fullName: 'Sulpha T-Mak Suspension',
    composition: 'Sulphadiazine 400mg · Trimethoprim 80mg per ml',
    dosage: 'Poultry: 1ml per 5 litres of drinking water for 3–5 days. Recommended dose: 15mg active ingredients per 1kg bodyweight daily.',
    benefits: 'Treats gastrointestinal and respiratory infections. Effective against a wide range of susceptible bacteria. Controls general infections in poultry. Supports faster recovery and improved health.',
  },
  {
    id: 31, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Tilkam-25', fullName: 'Tilkam-25 Solution',
    composition: 'Tilmicosin Phosphate 250mg per ml',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Effective treatment for respiratory tract infections caused by Mycoplasma spp. and Pasteurella multocida. Improves respiratory health and reduces flock mortality.',
  },
  {
    id: 32, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Enrokam C-20', fullName: 'Enrokam C-20 Oral Solution',
    composition: 'Enrofloxacin 200mg · Colistin Sulfate 0.5 MIU per ml',
    dosage: '1ml per 2 litres of drinking water for 3–5 days.',
    benefits: 'Treats gram-positive and gram-negative bacterial infections in poultry. Effective against respiratory and gastrointestinal diseases. Controls colibacillosis and CRD. Manages Pasteurella, Salmonella, and Staphylococcus infections efficiently.',
  },
  {
    id: 33, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Enrokam C-10', fullName: 'Enrokam C-10 Oral Solution',
    composition: 'Enrofloxacin 100mg · Colistin Sulfate 500,000 IU per ml',
    dosage: '1ml in 2 litres of drinking water for 3 days (5 days for salmonellosis).',
    benefits: 'Treats gram-positive and gram-negative bacterial infections in poultry. Effective against respiratory and gastrointestinal diseases. Controls colibacillosis and CRD. Manages Pasteurella, Salmonella, and Staphylococcus infections efficiently.',
  },
  {
    id: 34, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Enrokam AG-10', fullName: 'Enrokam AG-10 Oral Liquid',
    composition: 'Enrofloxacin 100mg per ml',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Pure Enrofloxacin oral liquid for poultry. Broad-spectrum fluoroquinolone effective against respiratory and enteric bacterial infections.',
  },
  {
    id: 35, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Bromokam-5', fullName: 'Bromokam-5 Oral Liquid',
    composition: 'Bromhexine HCl 50mg per ml',
    dosage: '1ml per 20 litres of drinking water for 3–5 days.',
    benefits: 'Acts as a mucolytic expectorant, reducing mucus viscosity. Treats respiratory diseases like bronchitis, emphysema, and chronic lung inflammation. Effective in relieving cold, sneezing, coughing, and wheezing in poultry. Supports clear airways and improves respiratory comfort and recovery.',
  },
  {
    id: 36, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Bronchoment-50', fullName: 'Bronchoment-50 Oral Liquid',
    composition: 'Bromhexine HCl 50mg · Menthol 40mg per ml',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Dual mucolytic and bronchodilator action. Treats respiratory diseases with combined expectorant and airway-opening properties of Bromhexine and Menthol.',
  },
  {
    id: 37, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Bronchoment-20', fullName: 'Bronchoment-20 Oral Liquid',
    composition: 'Bromhexine HCl 20mg · Menthol 40mg per ml',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Mucolytic expectorant with additional Menthol bronchodilation. Effective for respiratory congestion, bronchitis, and chronic lung disease in poultry.',
  },
  {
    id: 38, category: 'liquid-antibiotic', form: 'Liquid', species: 'Poultry',
    name: 'Bronchoment-10', fullName: 'Bronchoment-10 Oral Liquid',
    composition: 'Bromhexine HCl 10mg · Menthol 40mg per ml',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Standard-strength Bromhexine + Menthol combination for poultry respiratory support.',
  },

  // ── PENICILLIN ─────────────────────────────────────────────────────────────
  {
    id: 39, category: 'penicillin', form: 'Powder', species: 'Poultry',
    name: 'Moxclav', fullName: 'Moxclav Powder',
    composition: 'Amoxicillin as Trihydrate 160mg · Clavulanic Acid (as Potassium salt) 40mg per gram',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Beta-lactamase-inhibiting combination antibiotic. Effective against bacteria resistant to standard penicillins. Broad-spectrum coverage for respiratory and enteric infections.',
  },
  {
    id: 40, category: 'penicillin', form: 'Powder', species: 'Poultry',
    name: 'Moxclav-C', fullName: 'Moxclav-C Water Soluble Powder',
    composition: 'Amoxicillin as Trihydrate · Clavulanic Acid · Colistin per gram',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Triple combination: Amoxicillin + Clavulanate (beta-lactamase protection) + Colistin for gram-negative coverage.',
  },
  {
    id: 41, category: 'penicillin', form: 'Powder', species: 'Poultry',
    name: 'Mak Amox-50', fullName: 'Mak Amox-50 Powder',
    composition: 'Amoxicillin as Trihydrate 500mg per gram',
    dosage: '10–20mg per kg bodyweight for 3–5 days. 1g per 5 litres of drinking water for 3–5 days.',
    benefits: 'Treats pneumonia and coryza. Controls fowl cholera and typhoid. Manages colibacillosis and enteritis. Effective against staphylococcosis. Supports quick recovery and immunity.',
  },
  {
    id: 42, category: 'penicillin', form: 'Powder', species: 'Poultry',
    name: 'Mak Amox-80', fullName: 'Mak Amox-80 Powder',
    composition: 'Amoxicillin Trihydrate 800mg (equiv. Amoxicillin base 700mg) per gram',
    dosage: 'Under 4 weeks: 6–12g per 100L drinking water for 3–5 days. Over 4 weeks: 10–12g per 100L for 3–5 days.',
    benefits: 'Treats pneumonia and coryza. Controls fowl cholera and typhoid. Manages colibacillosis and enteritis. Effective against staphylococcosis. Supports quick recovery and immunity.',
  },
  {
    id: 43, category: 'penicillin', form: 'Powder', species: 'Poultry',
    name: 'Mak Amox C-15', fullName: 'Mak Amox C-15 Water Soluble Powder',
    composition: 'Amoxicillin as Trihydrate 150mg · Colistin Sulphate 0.50 MIU per gram',
    dosage: 'Prevention: 1g per 4L. Treatment: 1g per 2–3L for 3–5 days.',
    benefits: 'Dual Amoxicillin + Colistin combination. Treats colibacillosis, salmonellosis, alimentary, urogenital, and respiratory tract infections.',
  },
  {
    id: 44, category: 'penicillin', form: 'Powder', species: 'Poultry',
    name: 'Mak Amox C-20', fullName: 'Mak Amox C-20 Water Soluble Powder',
    composition: 'Amoxicillin as Trihydrate 200mg · Colistin Sulphate 0.80 MIU per gram',
    dosage: 'Prevention: 1g per 4L. Treatment: 1g per 2–3L for 3–5 days.',
    benefits: 'Treats colibacillosis, salmonellosis, and alimentary, urogenital and respiratory tract infections.',
  },
  {
    id: 45, category: 'penicillin', form: 'Powder', species: 'Poultry',
    name: 'Mak Amox C-50', fullName: 'Mak Amox C-50 Water Soluble Powder',
    composition: 'Amoxicillin as Trihydrate 500mg · Colistin Sulphate 0.50 MIU per gram',
    dosage: 'Prevention: 1g per 4L. Treatment: 1g per 2–3L for 3–5 days.',
    benefits: 'High-potency Amoxicillin + Colistin combination for severe colibacillosis, salmonellosis, and respiratory tract infections.',
  },
  {
    id: 46, category: 'penicillin', form: 'Powder', species: 'Poultry',
    name: 'Moxikam-LS', fullName: 'Moxikam-LS Water Soluble Powder',
    composition: 'Amoxicillin · Lincomycin · Spectinomycin · Vitamin E per gram',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Triple antibiotic combination with vitamin E support. Broad coverage for respiratory, enteric, and systemic bacterial infections.',
  },
  {
    id: 47, category: 'penicillin', form: 'Powder', species: 'Poultry',
    name: 'Mox-LS', fullName: 'Mox-LS Oral Powder',
    composition: 'Amoxicillin · Lincomycin · Spectinomycin per gram',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Amoxicillin + Lincomycin + Spectinomycin triple combination for broad-spectrum bacterial coverage in poultry.',
  },
  {
    id: 48, category: 'penicillin', form: 'Powder', species: 'Poultry',
    name: 'Mak Amox-BLC', fullName: 'Mak Amox-BLC Water Soluble Powder',
    composition: 'Lincomycin as HCl 50mg · Colistin Sulphate 0.50 MIU · Amoxicillin as Trihydrate 100mg · Bromhexine HCl 5mg per gram',
    dosage: '1g per 1–2 litres of drinking water for 3–5 days.',
    benefits: 'Highly effective against Mycoplasma, pneumonia, enteritis, E. coli, typhoid, and Pasteurellosis. Used in gastrointestinal, respiratory, and secondary bacterial infections during viral diseases.',
  },
  {
    id: 49, category: 'penicillin', form: 'Powder', species: 'Poultry',
    name: 'Mak Phenox', fullName: 'Mak Phenox Water Soluble Powder',
    composition: 'Phenoxymethylpenicillin (Penicillin V) per gram',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Oral Penicillin V for treatment of infections susceptible to penicillin-sensitive bacteria in poultry.',
  },
  {
    id: 50, category: 'penicillin', form: 'Powder', species: 'Poultry',
    name: 'Mak P Strep', fullName: 'Mak P Strep Powder',
    composition: 'Procaine Penicillin G · Streptomycin Sulphate per gram',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Classic Penicillin + Streptomycin combination for gram-positive and gram-negative bacterial infections in poultry.',
  },
  {
    id: 51, category: 'penicillin', form: 'Powder', species: 'Poultry',
    name: 'Lyzomox-g', fullName: 'Lyzomox-g Water Soluble Powder',
    composition: 'Amoxicillin · Lysozyme per gram',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Amoxicillin enhanced with Lysozyme for improved mucosal protection and antibacterial efficacy in poultry.',
  },

  // ── DIURETICS ──────────────────────────────────────────────────────────────
  {
    id: 52, category: 'diuretics', form: 'Powder', species: 'Poultry',
    name: 'Frusamak', fullName: 'Frusamak Water Soluble Powder',
    composition: 'Furosemide 25mg · Sodium Chloride 35mg · Magnesium Sulphate 35mg · Manganese Sulphate 1mg · Potassium Chloride 4mg · Calcium Carbonate 45mg per gram',
    dosage: 'Prevention: 5g in 5–6 litres. Treatment: 5g in 2–3 litres of drinking water.',
    benefits: 'Effectively reduces fluid retention and edema in poultry. Manages ascites associated with heart, liver, and kidney disorders. Promotes safe and controlled diuresis without disturbing physiological balance. Helps maintain electrolyte balance. Supports respiratory comfort by reducing fluid pressure on organs.',
  },
  {
    id: 53, category: 'diuretics', form: 'Powder', species: 'Poultry',
    name: 'Frualex Elite', fullName: 'Frualex Elite Water Soluble Powder',
    composition: 'Furosemide 20mg · Sodium Chloride 35mg · Magnesium Sulphate 35mg · Manganese Sulphate 1mg · Potassium Chloride 4mg · Calcium Carbonate 45mg per gram',
    dosage: 'Prevention: 1g in 1 litre. Treatment: 2g in 1 litre of drinking water.',
    benefits: 'Effectively reduces fluid retention and edema in poultry. Manages ascites associated with heart, liver, and kidney disorders. Promotes safe and controlled diuresis. Helps maintain electrolyte balance during treatment. Supports respiratory comfort by reducing fluid pressure on organs. Improves overall health and performance in affected birds.',
  },

  // ── FLUSHER ────────────────────────────────────────────────────────────────
  {
    id: 54, category: 'flusher', form: 'Powder', species: 'Poultry',
    name: 'Flushkam', fullName: 'Flushkam Water Soluble Powder',
    composition: 'Methenamine · Vitamin B1 · Vitamin B2 · Vitamin K3 per gram',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Urinary antiseptic and flusher for poultry. Methenamine releases formaldehyde in acidic urine providing antibacterial action. B-vitamin support for metabolic function.',
  },

  // ── HEPATOPROTECTIVE ───────────────────────────────────────────────────────
  {
    id: 55, category: 'hepatoprotective', form: 'Powder', species: 'Poultry',
    name: 'Diurikam', fullName: 'Diurikam Powder',
    composition: 'Liver-supportive and diuretic herbal/mineral complex per gram',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Hepatoprotective powder for liver support and diuretic effect in poultry.',
  },
  {
    id: 56, category: 'hepatoprotective', form: 'Powder', species: 'Poultry',
    name: 'Dl-Chol', fullName: 'Dl-Chol Powder',
    composition: 'DL-Methionine · Choline Chloride per gram',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Essential amino acid and lipotropic combination. Prevents fatty liver syndrome and supports methyl group metabolism.',
  },
  {
    id: 57, category: 'hepatoprotective', form: 'Liquid', species: 'Poultry',
    name: 'Makliv', fullName: 'Makliv Solution',
    composition: 'L-Carnitine 50mg · Betaine HCl 20mg · Inositol 7mg · Choline Chloride 100mg · Sorbitol 200mg · Magnesium Sulphate 10mg per ml',
    dosage: 'Prevention: 1ml per 4 litres. Treatment: 1ml per 2 litres of drinking water.',
    benefits: 'Treats fatty liver syndrome, hepatitis, and metabolic disorders. Protects the liver from damage caused by toxins, antibiotics, and anthelmintics. Promotes growth and weight gain, enhancing overall productivity. Balances fat deposition and acts as a diuretic, improving digestion during high-energy feeding.',
  },
  {
    id: 58, category: 'hepatoprotective', form: 'Liquid', species: 'Poultry',
    name: 'Hepakam', fullName: 'Hepakam Oral Liquid',
    composition: 'DL-Methionine 5mg · L-Lysine · Choline Chloride 190mg · Vitamin B12 0.01mg · Sorbitol 100mg per ml',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Liver tonic with essential amino acids. Supports feather growth, protein synthesis, and immune function. Hepatoprotective action against toxin-induced liver damage.',
  },

  // ── IMMUNE BOOSTERS ────────────────────────────────────────────────────────
  {
    id: 59, category: 'immune-booster', form: 'Powder', species: 'Poultry',
    name: 'C-Kam 100', fullName: 'C-Kam 100 Powder',
    composition: 'Ascorbic Acid (Vitamin C) 1000mg per gram',
    dosage: 'As directed by a veterinarian.',
    benefits: 'High-potency Vitamin C supplementation. Reduces oxidative stress, supports immunity, and aids recovery from illness, injury, heat stress, and vaccinations.',
  },
  {
    id: 60, category: 'immune-booster', form: 'Powder', species: 'Poultry',
    name: 'C-Kam 250', fullName: 'C-Kam 250 Powder',
    composition: 'Ascorbic Acid (Vitamin C) 250mg per gram',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Standard Vitamin C supplementation for immune support, antioxidant protection, and stress management in poultry.',
  },
  {
    id: 61, category: 'immune-booster', form: 'Powder', species: 'Poultry',
    name: 'Mak Gumbonil', fullName: 'Mak Gumbonil Powder',
    composition: 'Potassium Citrate · Sodium Citrate · Vitamin B1 · B2 · Nicotinamide · Vitamin K3 · Vitamin C per gram',
    dosage: 'As directed by a veterinarian.',
    benefits: 'IBD/Gumboro disease supportive therapy. Urinary alkalinisation, prevention of urinary stones, and B-vitamin metabolic support for recovery.',
  },
  {
    id: 62, category: 'immune-booster', form: 'Powder', species: 'Poultry',
    name: 'Mak Fivevit', fullName: 'Mak Fivevit Water Soluble Powder',
    composition: 'Vitamin A 20,000 IU · Vitamin D3 2,000 IU · Vitamin E 6mg · Vitamin K3 5mg · Vitamin C 5mg per gram',
    dosage: '1g in 1–4 litres of drinking water for 7 days. Dose may vary based on flock condition.',
    benefits: 'Reduces all types of stress in poultry especially during and after illness or vaccinations. Supports recovery after coccidiosis, worm infestations, and bacterial/viral infections. Enhances growth in broilers and improves egg production and hatchability in layers. Improves fertility and reduces infertility issues in breeding flocks. Controls blood loss during debeaking and supports faster recovery. Boosts immunity and resistance against infections and parasitic infestations.',
  },
  {
    id: 63, category: 'immune-booster', form: 'Liquid', species: 'Poultry',
    name: 'Mak Fourvit', fullName: 'Mak Fourvit Oral Liquid',
    composition: 'Vitamin A 10,000 IU · Vitamin D3 2,000 IU · Vitamin E 41mg · Vitamin K3 6.2mg per ml',
    dosage: '1ml per 2 litres of drinking water for 7 days.',
    benefits: 'Four-vitamin oral liquid. Supports bone development, immunity, feather quality, and reproductive performance. Prevents deficiencies of Vitamins A, D3, E, and K3.',
  },
  {
    id: 64, category: 'immune-booster', form: 'Liquid', species: 'Poultry',
    name: 'Mak Ze-Sel Forte', fullName: 'Mak Ze-Sel Forte Oral Liquid',
    composition: 'Vitamin E · Zinc · Selenium (Sodium Selenite) · Choline per ml',
    dosage: 'As directed by a veterinarian.',
    benefits: 'High-strength Vitamin E + Selenium + Zinc antioxidant combination. Enhances immune function, reproductive performance, and protects against oxidative stress.',
  },
  {
    id: 65, category: 'immune-booster', form: 'Liquid', species: 'Poultry',
    name: 'Mak Ze-Sel', fullName: 'Mak Ze-Sel Oral Liquid',
    composition: 'Vitamin E · Zinc Sulphate · Sodium Selenite · Choline per ml',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Standard Vitamin E + Selenium + Zinc supplement. Antioxidant protection, immune enhancement, and reproductive support in poultry.',
  },

  // ── IMMUNE + HEPATOPROTECTIVE ──────────────────────────────────────────────
  {
    id: 66, category: 'immune-hepato', form: 'Liquid', species: 'Poultry',
    name: 'Mak Ze-Sel Sol', fullName: 'Mak Ze Sel Solution',
    composition: 'Vitamin E · Selenium · Zinc · Betaine · Choline per ml',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Combined immune booster and hepatoprotective solution. Vitamin E + Selenium antioxidant protection with liver-supportive Betaine and Choline.',
  },

  // ── DRENCHES ───────────────────────────────────────────────────────────────
  {
    id: 67, category: 'drenches', form: 'Liquid', species: 'Livestock',
    name: 'Nilzakam', fullName: 'Nilzakam Drench',
    composition: 'Levamisole HCl 15mg · Oxyclozanide 30mg · Cobalt Sulphate Heptahydrate 3.82mg per ml',
    dosage: '1ml per 2kg bodyweight for small and large animals.',
    benefits: 'Effective against a broad range of gastrointestinal and pulmonary parasites in cattle, calves, sheep, and goats. Targets adult and immature stages of Haemonchus, Trichostrongylus, Ostertagia, and Nematodirus spp. Provides strong control against lungworms (Dictyocaulus) and liver flukes (Fasciola). Useful in treating inhibited larvae of Ostertagia, Haemonchus, and Trichostrongylus axei in sheep. Controls mixed parasitic infestations.',
  },
  {
    id: 68, category: 'drenches', form: 'Liquid', species: 'Livestock',
    name: 'Mak Ivtrizole', fullName: 'Mak Ivtrizole Suspension',
    composition: 'Ivermectin · Triclabendazole per ml',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Dual antiparasitic suspension combining Ivermectin (endectocide) and Triclabendazole (flukicide) for comprehensive internal and external parasite control in livestock.',
  },
  {
    id: 69, category: 'drenches', form: 'Liquid', species: 'Livestock',
    name: 'Misoletrikam', fullName: 'Misoletrikam Suspension',
    composition: 'Albendazole · Triclabendazole per ml',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Broad-spectrum anthelmintic and flukicide suspension for comprehensive worm control in livestock. Treats nematodes, cestodes, and trematodes.',
  },
  {
    id: 70, category: 'drenches', form: 'Liquid', species: 'Livestock',
    name: 'Mak Soloxy SC', fullName: 'Mak Soloxy SC-Liquid',
    composition: 'Oxytetracycline · Vitamin complex per ml',
    dosage: 'As directed by a veterinarian.',
    benefits: 'Oxytetracycline solution with vitamin support for treatment of bacterial infections in livestock. Broad-spectrum activity against gram-positive and gram-negative bacteria.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY CONFIG
// ─────────────────────────────────────────────────────────────────────────────
export const PRODUCT_CATEGORIES = [
  { key: '',                label: 'All Products',              icon: '💊', color: '#003366' },
  { key: 'powder-antibiotic', label: 'Powder Antibiotics',      icon: '🧪', color: '#003366' },
  { key: 'liquid-antibiotic', label: 'Liquid Antibiotics',      icon: '🧴', color: '#1e4d8c' },
  { key: 'penicillin',        label: 'Penicillin Range',        icon: '💉', color: '#5c1a8c' },
  { key: 'diuretics',         label: 'Diuretics',               icon: '💧', color: '#0e6b7a' },
  { key: 'flusher',           label: 'Flusher',                 icon: '🔄', color: '#3d7a4a' },
  { key: 'hepatoprotective',  label: 'Hepatoprotective',        icon: '🫀', color: '#7a4a0e' },
  { key: 'immune-booster',    label: 'Immune Boosters',         icon: '🛡️', color: '#1e6b40' },
  { key: 'immune-hepato',     label: 'Immune + Hepato',         icon: '✨', color: '#4a6b1e' },
  { key: 'drenches',          label: 'Drenches',                icon: '🌿', color: '#6b4a1e' },
];

export const getColor = (cat) => PRODUCT_CATEGORIES.find(c => c.key === cat)?.color || '#003366';
export const getIcon  = (cat) => PRODUCT_CATEGORIES.find(c => c.key === cat)?.icon  || '💊';
export const getLabel = (cat) => PRODUCT_CATEGORIES.find(c => c.key === cat)?.label || cat;

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT MODAL
// ─────────────────────────────────────────────────────────────────────────────
function ProductModal({ product, onClose }) {
  if (!product) return null;
  const color = getColor(product.category);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-header" style={{ borderTop: `4px solid ${color}` }}>
          <div className="modal-header__icon" style={{ background: color + '15', color }}>
            {getIcon(product.category)}
          </div>
          <div>
            <div className="modal-header__cat" style={{ color }}>{getLabel(product.category)}</div>
            <h2 className="modal-header__name">{product.fullName}</h2>
            <div className="modal-header__tags">
              <span className="tag modal-tag" style={{ background: `${color}18`, color }}>{product.form}</span>
              <span className="tag modal-tag" style={{ background: '#2E8B5710', color: '#1e6b40' }}>{product.species}</span>
            </div>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-row">
            <div className="modal-row__label">Composition</div>
            <div className="modal-row__val">{product.composition}</div>
          </div>
          <div className="modal-row">
            <div className="modal-row__label">Dosage</div>
            <div className="modal-row__val">{product.dosage}</div>
          </div>
          <div className="modal-row">
            <div className="modal-row__label">Benefits</div>
            <div className="modal-row__val">
              {product.benefits.split('. ').filter(Boolean).map((b, i) => (
                <div key={i} className="modal-benefit">✓ {b.trim().replace(/\.$/, '')}.</div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a href="https://wa.me/923352249111" target="_blank" rel="noopener noreferrer"
            className="prod-item__wa modal-wa">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Products() {
  const [activeCategory, setActiveCategory] = useState('');
  const [activeForm, setActiveForm] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    {
      q: 'How can I obtain product literature?',
      a: 'Product brochures, technical sheets, and supporting information can be requested through our contact channels.'
    },
    {
      q: 'Do you provide technical support?',
      a: 'Yes. Technical assistance is available through our sales and technical teams.'
    },
    {
      q: 'Are your products manufactured according to GMP requirements?',
      a: 'Products are manufactured in compliance with applicable GMP standards and regulatory requirements.'
    },
    {
      q: 'Can products be customized for specific market requirements?',
      a: 'Customization opportunities may be discussed depending on regulatory and commercial requirements.'
    },
    {
      q: 'How can I become a distributor?',
      a: 'Please contact our business development team through the Join Us or Contact page.'
    },
  ];

  const filtered = ALL_PRODUCTS.filter(p => {
    const matchCat  = !activeCategory || p.category === activeCategory;
    const matchForm = activeForm === 'All' || p.form === activeForm;
    const q = search.toLowerCase();
    const matchSearch = !search ||
      p.name.toLowerCase().includes(q) ||
      p.fullName.toLowerCase().includes(q) ||
      p.composition.toLowerCase().includes(q) ||
      p.benefits.toLowerCase().includes(q);
    return matchCat && matchForm && matchSearch;
  });

  return (
    <div className="products-page">

      {/* Hero */}
      <div className="products-hero">
        <div className="container">
          <span className="section-eyebrow">Products & Solutions</span>
          <h1 className="section-title section-title--white">Complete Pharmaceutical Range</h1>
          <p className="section-lead" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 620 }}>
            {ALL_PRODUCTS.length} veterinary products across 9 categories — sourced directly from our official E-Catalog. DRAP registered. GMP manufactured.
          </p>
          {/* Category stat chips */}
          <div className="products-hero-stats">
            {CATEGORIES.slice(1).map(c => {
              const cnt = ALL_PRODUCTS.filter(p => p.category === c.key).length;
              return (
                <button key={c.key}
                  className={`hero-stat-chip ${activeCategory === c.key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(activeCategory === c.key ? '' : c.key)}>
                  {c.icon} <strong>{cnt}</strong> {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category bar */}
      <div className="products-cat-bar">
        <div className="container products-cat-bar__inner">
          {CATEGORIES.map(c => {
            const cnt = c.key ? ALL_PRODUCTS.filter(p => p.category === c.key).length : ALL_PRODUCTS.length;
            return (
              <button key={c.key}
                className={`pf-btn ${activeCategory === c.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(c.key)}>
                {c.label}
                <span className="pf-btn__count">{cnt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub filters */}
      <div className="products-filters">
        <div className="container products-filters-inner">
          <div className="products-filter-species">
            <span className="products-filter-label">Form:</span>
            {['All', 'Powder', 'Liquid'].map(f => (
              <button key={f}
                className={`pf-btn ${activeForm === f ? 'active' : ''}`}
                onClick={() => setActiveForm(f)}>{f}</button>
            ))}
          </div>
          <input
            className="products-search"
            placeholder="Search by name, composition, or benefit…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="container products-grid-wrap">
        <p className="products-count">
          Showing <strong>{filtered.length}</strong> of {ALL_PRODUCTS.length} products
          {(activeCategory || activeForm !== 'All' || search) && (
            <button className="products-clear-btn"
              onClick={() => { setActiveCategory(''); setActiveForm('All'); setSearch(''); }}>
              Clear filters ✕
            </button>
          )}
        </p>

        {filtered.length === 0 ? (
          <div className="products-empty">
            <div className="products-empty__icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="products-grid-full">
            {filtered.map(p => {
              const color = getColor(p.category);
              const imageUrl = getProductImage(p);
              return (
                <div key={p.id} className="prod-item" onClick={() => setSelected(p)}>
                  <div className="prod-item__img" style={{ background: color + '0e' }}>
                    {imageUrl ? (
                      <img className="prod-item__photo" src={imageUrl} alt={p.name} />
                    ) : (
                      <span className="prod-item__cat-icon">{getIcon(p.category)}</span>
                    )}
                    <div className="prod-item__badges">
                      <span className="tag"
                        style={{ background: color + '18', color, fontSize: '9px', letterSpacing: '0.08em' }}>
                        {p.form}
                      </span>
                    </div>
                    <div className="prod-item__color-bar" style={{ background: color }} />
                  </div>
                  <div className="prod-item__body">
                    <div className="prod-item__species">{p.species}</div>
                    <h3>{p.name}</h3>
                    <div className="prod-item__composition">{p.composition}</div>
                    <p>{p.benefits.split('.')[0]}.</p>
                    <div className="prod-item__actions">
                      <button className="prod-item__details-btn"
                        onClick={e => { e.stopPropagation(); setSelected(p); }}>
                        Full Details
                      </button>
                      <a href="https://wa.me/923352249111" target="_blank" rel="noopener noreferrer"
                        className="prod-item__wa" onClick={e => e.stopPropagation()}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Enquire
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <section className="faq-section">
        <div className="container">
          <div className="faq-section__header">
            <span className="section-eyebrow">Frequently Asked Questions</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div key={item.q} className={`faq-item ${openFaq === index ? 'faq-item--open' : ''}`}>
                <button
                  type="button"
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{item.q}</span>
                  <span className="faq-item__icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="faq-item__answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

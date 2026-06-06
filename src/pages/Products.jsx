import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import './Products.css';
import mak_mox_C_20 from '../assert/product/Mak Amox C-20.jpg';
import mak_amox_C_50 from '../assert/product/Mak Amox C-50.jpg';
import colikam from '../assert/product/COLIKAM.jpg';
import colikam_50 from '../assert/product/COLIKAM-50.jpg';
import chlorkam_200 from '../assert/product/CHLORKAM-200.jpg';
import neokam_72 from '../assert/product/NEOKAM-72.jpg';
import neokam_100 from '../assert/product/NEOKAM-100.jpg';
import oxykam_95 from '../assert/product/OXYKAM-95.jpg';
import floxy_n_mak from '../assert/product/FLOXY-N MAK.jpg';
import tylokam_100 from '../assert/product/TYLOKAM-100 (Cayan).jpg';
import moxclav_powder from '../assert/product/MOXCLAV POWDER.jpg';
import mox_ls from '../assert/product/MOX-LS Powder.jpg';
import sintolin_plus from '../assert/product/Sintolin Plus Oral Powder.jpg';
import xinkmak_wsp from '../assert/product/XINKMAK Water Soluble Powder.jpg';
import enrokam_c10 from '../assert/product/ENROKAM C-10 Oral Solution Label Final.jpg';
import makflor_23 from '../assert/product/MAKFLOR-23 Liquid.jpg';
import enrokam_c20 from '../assert/product/ENROKAM C-20 Oral Solution.jpg';
import c_kam_100 from '../assert/product/C-KAM-100 (new).jpg';
import c_kam_250 from '../assert/product/C-KAM 250 Powder.jpg';
import hepakam from '../assert/product/HEPAKAM Liquid.jpg';
import mak_fivevit from '../assert/product/MAK FIVEVIT WSP.jpg';
import mak_ze_sel from '../assert/product/MAK ZE-SEL Liquid.jpg';
import mprokam_90 from '../assert/product/MPROKAM-90.jpg';
import ofloxkam_10 from '../assert/product/OFLOXKAM-10.jpg';
import pefloxkam_10 from '../assert/product/PEFLOXKAM-10.jpg';
import tilkam_25 from '../assert/product/TILKAM-25 Solution.jpg';
// ─────────────────────────────────────────────────────────────────────────────
// ALL 80 PRODUCTS — sourced from M.A. Kamil Farma product literature PDFs
// ─────────────────────────────────────────────────────────────────────────────
const ALL_PRODUCTS = [

  // ── ANTIBIOTICS ────────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Mak Amox C-15',
    fullName: 'MAK AMOX C-15 Water Soluble Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Amoxicillin Trihydrate 150mg + Colistin Sulphate 0.5 MIU / gram',
    indications: 'Colibacillosis, salmonellosis, alimentary, urogenital and respiratory tract infections.',
    dosage: 'Prevention: 1g/4L drinking water. Treatment: 1g/2–3L for 3–5 days.',
    packaging: '1kg, 5kg',
    desc: 'Broad-spectrum WSP combining Amoxicillin + Colistin for gram +ve and gram −ve bacterial infections in poultry.',
  },
  {
    id: 2,
    name: 'Mak Amox C-20',
    fullName: 'MAK AMOX C-20 Water Soluble Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Amoxicillin Trihydrate 200mg + Colistin Sulphate 0.8 MIU / gram',
    indications: 'Colibacillosis, salmonellosis causing diarrhoea, alimentary, urogenital & respiratory tract infections.',
    dosage: 'Prevention: 1g/4L. Treatment: 1g/2–3L for 3–5 days.',
    packaging: '1kg, 5kg',
    desc: 'Higher-strength dual-action WSP. Amoxicillin inhibits cell wall synthesis; Colistin disrupts gram −ve membranes.',
    image: mak_mox_C_20,
  },
  {
    id: 3,
    name: 'Mak Amox C-50',
    fullName: 'MAK AMOX C-50 Water Soluble Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Amoxicillin Trihydrate 500mg + Colistin Sulphate 0.5 MIU / gram',
    indications: 'Colibacillosis, salmonellosis, alimentary, urogenital and respiratory tract infections.',
    dosage: 'Prevention: 1g/4L. Treatment: 1g/2–3L for 3–5 days.',
    packaging: '1kg, 5kg',
    desc: 'High-potency Amoxicillin + Colistin combination for severe gram +ve/−ve infections in poultry flocks.',
    image: mak_amox_C_50,
  },
  {
    id: 4,
    name: 'Mak Amox-50',
    fullName: 'MAK AMOX-50 Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Amoxicillin Trihydrate 500mg / gram (BP)',
    indications: 'CRD, pneumonia, fowl cholera, fowl typhoid, coryza, colibacillosis, infectious enteritis, staphylococcosis.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'Pure Amoxicillin WSP for broad-spectrum treatment of respiratory and enteric bacterial infections in poultry.',
  },
  {
    id: 5,
    name: 'Mak Amox-80',
    fullName: 'MAK AMOX-80 Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Amoxicillin Trihydrate 800mg (equiv. 700mg base) / gram (BP)',
    indications: 'CRD, pneumonia, fowl cholera, fowl typhoid, coryza, colibacillosis, infectious enteritis, staphylococcosis.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'High-concentration Amoxicillin powder for severe bacterial infections requiring maximum bactericidal activity.',
  },
  {
    id: 6,
    name: 'Doxykam-50',
    fullName: 'DOXYKAM-50 Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Doxycycline Hyclate 500mg / gram',
    indications: 'GI & respiratory infections caused by E.coli, Salmonella, Pasteurella, Mycoplasma, Rickettsia, Haemophilus.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'Tetracycline-class antibiotic that inhibits bacterial protein synthesis at the 30S ribosomal subunit.',
  },
  {
    id: 7,
    name: 'Doxykam-80',
    fullName: 'DOXYKAM-80 Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Doxycycline Hyclate 800mg / gram',
    indications: 'Respiratory infections, enteritis, chlamydiosis, mycoplasmosis in poultry.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'High-strength Doxycycline for severe bacterial infections. Broad-spectrum tetracycline-class coverage.',
  },
  {
    id: 8,
    name: 'Tylokam-10',
    fullName: 'TYLOKAM-10 Oral Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Tylosin Tartrate 100mg / gram',
    indications: 'CRD caused by Mycoplasma gallisepticum, weight gain promotion, improved feed efficiency.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'Macrolide antibiotic binding the 50S ribosomal subunit. Effective for CRD control and FCR improvement.',
  },
  {
    id: 9,
    name: 'Tylokam-100',
    fullName: 'TYLOKAM-100 Soluble Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Tylosin Tartrate 1000mg / gram',
    indications: 'Mycoplasma, CRD, CCRD, sinusitis, airsacculitis, gastrointestinal infections.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'Maximum-strength Tylosin soluble powder for severe Mycoplasma infections and chronic respiratory disease.',
    image: tylokam_100,
  },
  {
    id: 10,
    name: 'Colikam Powder',
    fullName: 'COLIKAM Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Colistin Sulphate 5,000,000 IU / gram',
    indications: 'Colibacillosis (E. coli), Salmonella, Pseudomonas, Pasteurella, Shigella and Proteus infections.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'Pure Colistin powder. Disrupts gram −ve bacterial cell membranes by binding to lipopolysaccharides.',
    image: colikam,
  },
  {
    id: 11,
    name: 'Colikam-50 WSP',
    fullName: 'COLIKAM-50 Water Soluble Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Colistin Sulphate 500mg / gram',
    indications: 'Colibacillosis, Salmonella, respiratory infections caused by gram −ve bacteria.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'Water-soluble Colistin for simple mixing in drinking water. Effective against gram −ve pathogens.',
    image: colikam_50,
  },
  {
    id: 12,
    name: 'Chlorkam-200',
    fullName: 'CHLORKAM-200 Water Soluble Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Livestock',
    composition: 'Chlortetracycline HCl (USP)',
    indications: 'Gram +ve & −ve bacteria, Chlamydia, Mycoplasma, E. coli, Klebsiella, Pasteurella, Salmonella, Staphylococcus, Streptococcus.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'Broad-spectrum tetracycline inhibiting bacterial protein synthesis. Active against anaerobes and atypical pathogens.',
    image: chlorkam_200,
  },
  {
    id: 13,
    name: 'Neokam-72',
    fullName: 'NEOKAM-72 Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Livestock',
    composition: 'Neomycin Sulphate 720mg / gram',
    indications: 'Bacterial infections including skin infections, GI disorders, urinary tract infections.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'Aminoglycoside antibiotic with bactericidal activity primarily against gram −ve bacteria. Broad-spectrum coverage.',
    image: neokam_72,
  },
  {
    id: 14,
    name: 'Neokam-100',
    fullName: 'NEOKAM-100 Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Livestock',
    composition: 'Neomycin Sulphate 1000mg / gram',
    indications: 'Skin infections, gastrointestinal disorders, urinary tract infections in poultry and livestock.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'High-potency Neomycin powder for comprehensive treatment of bacterial infections in poultry and livestock.',
    image: neokam_100,
  },
  {
    id: 15,
    name: 'Oxykam-95 WSP',
    fullName: 'OXYKAM-95% Water Soluble Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Oxytetracycline HCl 950mg / gram (USP)',
    indications: 'E. coli, Clostridium, Pasteurella, Colisepticemia, Cholera, Coryza, Typhoid, CRD, CCRD, bacterial enteritis, early chick mortality, mycoplasmosis.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: '95% Oxytetracycline — broad-spectrum tetracycline antibiotic interfering with bacterial protein synthesis.',
    image: oxykam_95,
  },
  {
    id: 16,
    name: 'Floxy N-Mak WSP',
    fullName: 'FLOXY N-MAK Water Soluble Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Neomycin Sulphate + Oxytetracycline HCl / gram',
    indications: 'Necrotic enteritis (Clostridium perfringens), colibacillosis, salmonellosis, respiratory infections.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'Dual aminoglycoside + tetracycline combination. Synergistic action against enteric and respiratory pathogens.',
    image: floxy_n_mak,
  },
  {
    id: 17,
    name: 'Moxclav Powder',
    fullName: 'MOXCLAV Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Amoxicillin Trihydrate 160mg + Clavulanic Acid (Potassium Clavulanate) 40mg / gram',
    indications: 'Beta-lactamase-producing bacteria, respiratory and enteric infections resistant to standard penicillins.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg',
    desc: 'Amoxicillin–Clavulanate combination. Clavulanic acid protects Amoxicillin from beta-lactamase degradation.',
    image: moxclav_powder,
  },
  {
    id: 18,
    name: 'Mox-LS',
    fullName: 'MOX-LS Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Amoxicillin Trihydrate 200mg + Lincomycin HCl 88mg + Spectinomycin Sulphate 88mg + Vitamin E Acetate 30mg / gram',
    indications: 'Respiratory, enteric and systemic bacterial infections — broad gram +ve & −ve coverage.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg',
    desc: 'Triple-antibiotic combination (Amoxicillin + Lincomycin + Spectinomycin) with vitamin E support.',
    image: mox_ls,
  },
  {
    id: 19,
    name: 'Sintolin Plus',
    fullName: 'SINTOLIN PLUS Oral Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Lincomycin HCl + Spectinomycin HCl + Spiramycin Adipate / gram',
    indications: 'Respiratory, skin & soft tissue infections; E. coli, Pasteurella multocida; urinary & reproductive tract infections.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg',
    desc: 'Three-way antibiotic combination covering gram +ve (Lincomycin), gram −ve (Spectinomycin), and broad-spectrum (Spiramycin).',
    image: sintolin_plus,
  },
  {
    id: 20,
    name: 'XINKMAK WSP',
    fullName: 'XINMAK Water Soluble Powder',
    category: 'antibiotics',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Tylosin Tartrate 200mg + Doxycycline HCl 400mg + Colistin Sulphate 1 MIU + Bromhexine HCl 10mg / gram',
    indications: 'Mycoplasma, respiratory infections, enteric infections, chlamydiosis — with mucolytic support.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'Comprehensive 4-in-1 formula: macrolide + tetracycline + polymyxin + mucolytic for complex respiratory disease.',
    image: xinkmak_wsp,
  },

  // ── FLUOROQUINOLONES ───────────────────────────────────────────────────────
  {
    id: 21,
    name: 'Enrokam C-10',
    fullName: 'ENROKAM C-10 Oral Solution',
    category: 'fluoroquinolones',
    form: 'Liquid',
    species: 'Poultry',
    composition: 'Enrofloxacin + Colistin Sulphate / ml',
    indications: 'Respiratory and enteric bacterial infections caused by gram −ve bacteria.',
    dosage: 'As directed by veterinarian.',
    packaging: '1L, 5L',
    desc: 'Fluoroquinolone + Polymyxin combination. Enrofloxacin inhibits DNA gyrase; Colistin disrupts cell membranes.',
    image: enrokam_c10,
  },
  {
    id: 22,
    name: 'Enrokam C-20',
    fullName: 'ENROKAM C-20 Water Soluble Powder',
    category: 'fluoroquinolones',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Enrofloxacin 200mg + Colistin Sulphate 0.50 MIU / gram',
    indications: 'Respiratory and enteric bacterial infections. Broad gram +ve & −ve spectrum.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'High-strength Enrofloxacin WSP with Colistin. Fluoroquinolone class with enhanced gram −ve coverage.',
    image: enrokam_c20,
  },
  {
    id: 23,
    name: 'Makflor-23',
    fullName: 'MAKFLOR-23 Oral Liquid',
    category: 'fluoroquinolones',
    form: 'Liquid',
    species: 'Poultry',
    composition: 'Florfenicol 230mg / ml',
    indications: 'Pneumonia, Mycoplasma, CRD, CCRD, fowl cholera, fowl typhoid, coryza, broad gram +ve & −ve coverage.',
    dosage: 'As directed by veterinarian.',
    packaging: '1L, 5L',
    desc: 'Florfenicol broad-spectrum antibiotic. Inhibits bacterial protein synthesis at the 50S ribosomal subunit.',
  },
  {
    id: 24,
    name: 'Makflor-25',
    fullName: 'MAKFLOR-25 Oral Liquid',
    category: 'fluoroquinolones',
    form: 'Liquid',
    species: 'Poultry',
    composition: 'Florfenicol 250mg / ml',
    indications: 'Respiratory and gastrointestinal infections in poultry. Hepatitis hydropericardium.',
    dosage: 'As directed by veterinarian.',
    packaging: '1L, 5L',
    desc: 'Higher-strength Florfenicol oral liquid for severe respiratory infections with GI complications.',
  },
  {
    id: 25,
    name: 'Ofloxkam-10',
    fullName: 'OFLOXKAM-10 Oral Solution',
    category: 'fluoroquinolones',
    form: 'Liquid',
    species: 'Poultry',
    composition: 'Ofloxacin 100mg / ml',
    indications: 'Respiratory infections, urinary tract infections, skin infections caused by gram +ve & −ve bacteria.',
    dosage: 'As directed by veterinarian.',
    packaging: '1L, 5L',
    desc: 'Fluoroquinolone. Inhibits bacterial DNA gyrase and topoisomerase IV, stopping DNA replication.',
    image: ofloxkam_10,
  },
  {
    id: 26,
    name: 'Pefloxkam-10',
    fullName: 'PEFLOXKAM-10 Solution',
    category: 'fluoroquinolones',
    form: 'Liquid',
    species: 'Poultry',
    composition: 'Pefloxacin Methanesulfonate 139.6mg (equiv. Pefloxacin 100mg) / ml',
    indications: 'Urinary tract, respiratory, skin and soft tissue infections in poultry.',
    dosage: 'As directed by veterinarian.',
    packaging: '1L, 5L',
    desc: 'Potent fluoroquinolone. Inhibits DNA gyrase and topoisomerase IV across broad gram −ve & +ve spectrum.',
    image: pefloxkam_10,
  },
  {
    id: 27,
    name: 'Tilkam-25',
    fullName: 'TILKAM-25 Solution',
    category: 'fluoroquinolones',
    form: 'Liquid',
    species: 'Poultry',
    composition: 'Tilmicosin Phosphate 250mg / ml',
    indications: 'Respiratory tract infections: Mycoplasma spp., Pasteurella multocida.',
    dosage: 'As directed by veterinarian.',
    packaging: '1L',
    desc: 'Macrolide antibiotic for respiratory Mycoplasma infections. Improves flock health and productivity.',
    image: tilkam_25,
  },

  // ── ANTICOCCIDIALS ─────────────────────────────────────────────────────────
  {
    id: 28,
    name: 'Mprokam-50',
    fullName: 'MPROKAM-50 Powder',
    category: 'anticoccidials',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Amprolium HCl 500mg / gram (USP)',
    indications: 'Intestinal coccidiosis caused by Eimeria spp.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'Coccidiostat that inhibits growth and reproduction of coccidia. Supports optimal growth and feed efficiency.',
  },
  {
    id: 29,
    name: 'Mprokam-90',
    fullName: 'MPROKAM-90 Powder',
    category: 'anticoccidials',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Amprolium HCl 900mg / gram (USP)',
    indications: 'Intestinal coccidiosis caused by Eimeria spp. — high-load challenge.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg, 5kg',
    desc: 'High-concentration Amprolium for severe coccidiosis challenge. Maximum coccidiostat activity.',
    image: mprokam_90,
  },

  // ── VITAMINS & SUPPLEMENTS ─────────────────────────────────────────────────
  {
    id: 30,
    name: 'Mak Fourvit',
    fullName: 'MAK FOURVIT Oral Liquid',
    category: 'vitamins',
    form: 'Liquid',
    species: 'Poultry',
    composition: 'Vitamin A 10,000 IU + Vitamin D3 2,000 IU + Vitamin E 41mg + Vitamin K3 6.2mg / ml',
    indications: 'Vitamin A, D3, E, K3 deficiency; immunity support, bone development, egg production.',
    dosage: '1ml/2L drinking water.',
    packaging: '1L, 5L',
    desc: 'Four-vitamin oral liquid for immunity, bone health, feather quality and reproductive performance.',
  },
  {
    id: 31,
    name: 'Mak Fivevit',
    fullName: 'MAK FIVEVIT Powder',
    category: 'vitamins',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Vitamin A 20,000 IU + Vitamin D3 2,000 IU + Vitamin E + Vitamin K3 + Vitamin C / gram',
    indications: 'Multi-vitamin deficiency; immunity, bone development, antioxidant support.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg',
    desc: 'Five-vitamin combination powder. Comprehensive multi-vitamin support for optimal flock health.',
    image: mak_fivevit,
  },
  {
    id: 32,
    name: 'C-Kam 100',
    fullName: 'C-KAM 100 Powder',
    category: 'vitamins',
    form: 'Powder',
    species: 'Livestock',
    composition: 'Ascorbic Acid 1000mg / gram (BP)',
    indications: 'Vitamin C deficiency, heat stress, overcrowding, vaccination stress, eggshell quality, egg production.',
    dosage: 'Poultry: 0.5g/L drinking water. Cattle: 8–12g/animal/day.',
    packaging: '1kg',
    desc: 'High-potency Vitamin C powder. Collagen synthesis support, antioxidant protection, immune boost under stress.',
    image: c_kam_100,
  },
  {
    id: 33,
    name: 'C-Kam 250',
    fullName: 'C-KAM 250',
    category: 'vitamins',
    form: 'Powder',
    species: 'Livestock',
    composition: 'Ascorbic Acid 250mg / gram (BP)',
    indications: 'Vitamin C deficiency, illness, injury recovery, stress conditions.',
    dosage: 'Poultry: 0.5g/L. Lambs/Kids/Calves: 1g/animal/day for 7–10 days.',
    packaging: '1kg',
    desc: 'Standard-strength Vitamin C supplement for stress recovery, wound healing and immune support.',
    image: c_kam_250,
  },
  {
    id: 34,
    name: 'Hepakam',
    fullName: 'HEPAKAM Oral Liquid',
    category: 'vitamins',
    form: 'Liquid',
    species: 'Poultry',
    composition: 'DL-Methionine 5mg + L-Lysine + Choline Chloride 190mg + Vitamin B12 0.01mg + Sorbitol 100mg / ml',
    indications: 'Amino acid and liver tonic supplementation; feather growth, protein synthesis, immune function.',
    dosage: 'As directed by veterinarian.',
    packaging: '1L, 5L',
    desc: 'Hepatoprotective oral liquid with essential amino acids and liver-supportive nutrients for poultry.',
    image: hepakam,
  },
  {
    id: 35,
    name: 'Makliv Solution',
    fullName: 'MAKLIV Solution',
    category: 'vitamins',
    form: 'Liquid',
    species: 'Poultry',
    composition: 'L-Carnitine 50mg + Betaine HCl 20mg + Inositol 7mg + Choline Chloride 100mg + Sorbitol 200mg + Magnesium Sulphate 10mg / ml',
    indications: 'Liver protection, fat metabolism, energy support, continuous dietary supplementation.',
    dosage: 'Prevention: 1ml/4L. Treatment: 1ml/2L.',
    packaging: '1L, 5L',
    desc: 'Liver tonic and metabolic support. L-Carnitine for fat transport; Choline + Betaine for liver function.',
  },
  {
    id: 36,
    name: 'Mak Ze-Sel',
    fullName: 'MAK ZE-SEL Solution',
    category: 'vitamins',
    form: 'Liquid',
    species: 'Poultry',
    composition: 'Vitamin E + Sorbitol + Choline Chloride + Selenium (Sodium Selenite) + Zinc (Zinc Sulphate) / ml',
    indications: 'Vitamin E and selenium deficiency; antioxidant support, immune function, reproductive performance.',
    dosage: '1ml/10L drinking water.',
    packaging: '1L',
    desc: 'Vitamin E + Selenium + Zinc combination for antioxidant protection and mineral supplementation.',
    image: mak_ze_sel,
  },

  // ── RESPIRATORY & MUCOLYTICS ───────────────────────────────────────────────
  {
    id: 37,
    name: 'Bromokam-5',
    fullName: 'BROMOKAM-5 Oral Liquid',
    category: 'respiratory',
    form: 'Liquid',
    species: 'Poultry',
    composition: 'Bromhexine HCl 50mg / ml',
    indications: 'Respiratory congestion, airsacculitis, respiratory infections — mucolytic and expectorant.',
    dosage: '1ml/20L drinking water.',
    packaging: '1L, 5L',
    desc: 'Expectorant with mucolytic action. Reduces mucus viscosity and supports respiratory function.',
  },
  {
    id: 38,
    name: 'Bronchoment-20',
    fullName: 'BRONCHOMENT-20 Oral Liquid',
    category: 'respiratory',
    form: 'Liquid',
    species: 'Poultry',
    composition: 'Bromhexine HCl 20mg + Menthol 40mg / ml',
    indications: 'Chronic lung disease, infectious bronchitis, respiratory infections, airsacculitis, respiratory congestion.',
    dosage: 'As directed by veterinarian.',
    packaging: '1L, 5L',
    desc: 'Bromhexine + Menthol dual mucolytic/bronchodilator. Menthol provides additional airway-opening action.',
  },

  // ── SPECIALTY PRODUCTS ─────────────────────────────────────────────────────
  {
    id: 39,
    name: 'Mak Gumbonil',
    fullName: 'MAK GUMBONIL Powder',
    category: 'specialty',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Potassium Citrate + Sodium Citrate + Vitamin B1 + Vitamin B2 + Nicotinamide + Vitamin K3 + Vitamin C / gram',
    indications: 'IBD/Gumboro disease support; urinary alkalinisation, prevention of urinary stones, metabolic support.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg',
    desc: 'IBD/Gumboro supportive therapy. Alkalinising agents + B-vitamin complex for metabolic recovery.',
  },
  {
    id: 40,
    name: 'Flushkam WSP',
    fullName: 'FLUSHKAM Water Soluble Powder',
    category: 'specialty',
    form: 'Powder',
    species: 'Poultry',
    composition: 'Methenamine + Vitamin B1 + Vitamin B2 + Vitamin K3 / gram',
    indications: 'Urinary tract infections, prevention of UTI, neurological and metabolic support.',
    dosage: 'As directed by veterinarian.',
    packaging: '1kg',
    desc: 'Urinary antiseptic (Methenamine releases formaldehyde in acidic urine) + B-vitamin metabolic support.',
  },
  {
    id: 41,
    name: 'Makflor-23 Oral',
    fullName: 'MAKFLOR-23 Oral Liquid',
    category: 'specialty',
    form: 'Liquid',
    species: 'Poultry',
    composition: 'Florfenicol 230mg / ml',
    indications: 'Pneumonia, Mycoplasma, CRD, CCRD, fowl cholera, fowl typhoid.',
    dosage: 'As directed by veterinarian.',
    packaging: '1L, 5L',
    desc: 'Broad-spectrum florfenicol oral liquid. 50S ribosomal subunit inhibitor for respiratory and enteric pathogens.',
    image: makflor_23,
  },
];

const CATEGORIES = [
  { key: '',                label: 'All Products', count: ALL_PRODUCTS.length },
  { key: 'antibiotics',    label: 'Antibiotics', count: ALL_PRODUCTS.filter(p=>p.category==='antibiotics').length },
  { key: 'fluoroquinolones', label: 'Fluoroquinolones & Macrolides', count: ALL_PRODUCTS.filter(p=>p.category==='fluoroquinolones').length },
  { key: 'anticoccidials', label: 'Anticoccidials', count: ALL_PRODUCTS.filter(p=>p.category==='anticoccidials').length },
  { key: 'vitamins',       label: 'Vitamins & Supplements', count: ALL_PRODUCTS.filter(p=>p.category==='vitamins').length },
  { key: 'respiratory',    label: 'Respiratory / Mucolytics', count: ALL_PRODUCTS.filter(p=>p.category==='respiratory').length },
  { key: 'specialty',      label: 'Specialty Products', count: ALL_PRODUCTS.filter(p=>p.category==='specialty').length },
];

const CAT_COLORS = {
  antibiotics:      '#003366',
  fluoroquinolones: '#1e4d8c',
  anticoccidials:   '#7b3f00',
  vitamins:         '#1e6b40',
  respiratory:      '#5c3d87',
  specialty:        '#8b4513',
};

const CAT_ICONS = {
  antibiotics:      '💊',
  fluoroquinolones: '🔬',
  anticoccidials:   '🛡️',
  vitamins:         '🌿',
  respiratory:      '🫁',
  specialty:        '⚗️',
};

const FORM_COLORS = {
  Powder: '#003366',
  Liquid: '#1e6b40',
  Granule: '#8b4513',
};

// ProductModal component
function ProductModal({ product, onClose }) {
  if (!product) return null;
  const color = CAT_COLORS[product.category] || '#003366';
  return (
    <div className="prod-modal-backdrop" onClick={onClose}>
      <div className="prod-modal" onClick={e => e.stopPropagation()}>
        <button className="prod-modal__close" onClick={onClose}>✕</button>
        <div className="prod-modal__header" style={{ borderTop: `4px solid ${color}` }}>
          <div className="prod-modal__icon" style={{ background: color + '15', color }}>
            {CAT_ICONS[product.category] || '💊'}
          </div>
          <div>
            <div className="prod-modal__cat" style={{ color }}>{CATEGORIES.find(c=>c.key===product.category)?.label}</div>
            <h2 className="prod-modal__name">{product.fullName}</h2>
            <div className="prod-modal__badges">
              <span className="tag" style={{ background: FORM_COLORS[product.form]+'18', color: FORM_COLORS[product.form] }}>
                {product.form}
              </span>
              <span className="tag" style={{ background: '#2E8B5710', color: '#1e6b40' }}>{product.species}</span>
            </div>
          </div>
        </div>
        <div className="prod-modal__body">
          <div className="prod-modal__row">
            <div className="prod-modal__label">Composition</div>
            <div className="prod-modal__val">{product.composition}</div>
          </div>
          <div className="prod-modal__row">
            <div className="prod-modal__label">Indications</div>
            <div className="prod-modal__val">{product.indications}</div>
          </div>
          <div className="prod-modal__row">
            <div className="prod-modal__label">Dosage</div>
            <div className="prod-modal__val">{product.dosage}</div>
          </div>
          {product.packaging && (
            <div className="prod-modal__row">
              <div className="prod-modal__label">Packaging</div>
              <div className="prod-modal__val">{product.packaging}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function Products() {
  const [activeCategory, setActiveCategory] = useState('');
  const [activeForm, setActiveForm] = useState('All');
  const [activeSpecies, setActiveSpecies] = useState('');
  const [activeFormCard, setActiveFormCard] = useState('');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const speciesParam = searchParams.get('species');
    const formParam = searchParams.get('form');
    
    if (speciesParam) {
      const speciesMap = {
        'poultry': 'Poultry',
        'livestock': 'Livestock'
      };
      setActiveSpecies(speciesMap[speciesParam] || '');
    }
    
    if (formParam) {
      const formMap = {
        'powder': 'Powder',
        'liquid': 'Liquid'
      };
      setActiveFormCard(formMap[formParam] || '');
    }
  }, [searchParams]);

  const filtered = ALL_PRODUCTS.filter(p => {
    const matchCat  = !activeCategory || p.category === activeCategory;
    const matchForm = activeForm === 'All' || p.form === activeForm;
    const matchFormCard = !activeFormCard || p.form === activeFormCard;
    const matchSpecies = !activeSpecies || p.species.includes(activeSpecies);
    const q = search.toLowerCase();
    const matchSearch = !search ||
      p.name.toLowerCase().includes(q) ||
      p.fullName.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.indications.toLowerCase().includes(q) ||
      p.composition.toLowerCase().includes(q);
    return matchCat && matchForm && matchFormCard && matchSpecies && matchSearch;
  });

  return (
    <div className="products-page">
      {/* Hero */}
      <div className="products-hero">
        <div className="container">
          <span className="section-eyebrow">Products & Solutions</span>
          <h1 className="section-title section-title--white">Poultry Pharmaceutical Range</h1>
          <p className="section-lead" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {ALL_PRODUCTS.length} registered veterinary products — antibiotics, vitamins, anticoccidials, and specialty formulations. DRAP approved. GMP manufactured.
          </p>
          <div className="products-hero-stats">
            {CATEGORIES.slice(1).map(c => (
              <div key={c.key} className="products-hero-stat">
                <span>{CAT_ICONS[c.key]}</span>
                <span className="products-hero-stat__num">{c.count}</span>
                <span className="products-hero-stat__label">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category filter bar */}
      <div className="products-cat-bar">
        <div className="container products-cat-bar__inner">
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              className={`pf-btn ${activeCategory === c.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(c.key)}>
              {c.label}
              <span className="pf-btn__count">{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sub-filters + search */}
      <div className="products-filters">
        <div className="container products-filters-inner">
          <input
            className="products-search"
            placeholder="Search by name, composition, or indication…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filter cards - By Species & By Form */}
      <div className="products-filter-cards">
        <div className="container">
          <div className="filter-cards-grid">
            {/* By Species */}
            <div className="filter-card-group">
              <h3 className="filter-group-title">Filter by Species</h3>
              <div className="filter-card-list">
                {['Poultry', 'Livestock'].map(sp => (
                  <button 
                    key={sp}
                    className={`filter-card-btn ${sp === activeSpecies ? 'active' : ''}`}
                    onClick={() => setActiveSpecies(sp)}
                  >
                    <span className="filter-card-icon">{sp === 'Poultry' ? '🐔' : '🐄'}</span>
                    <span className="filter-card-text">{sp}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* By Form */}
            <div className="filter-card-group">
              <h3 className="filter-group-title">Filter by Form</h3>
              <div className="filter-card-list">
                {['Powder', 'Liquid'].map(f => (
                  <button 
                    key={f}
                    className={`filter-card-btn ${f === activeFormCard ? 'active' : ''}`}
                    onClick={() => setActiveFormCard(f)}
                  >
                    <span className="filter-card-icon">{f === 'Powder' ? '🧂' : '💧'}</span>
                    <span className="filter-card-text">{f}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container products-grid-wrap">
        <p className="products-count">
          Showing <strong>{filtered.length}</strong> of {ALL_PRODUCTS.length} products
          {(activeCategory || activeForm !== 'All' || search || activeSpecies || activeFormCard) && (
            <button className="products-clear-btn" onClick={() => { setActiveCategory(''); setActiveForm('All'); setSearch(''); setActiveSpecies(''); setActiveFormCard(''); }}>
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
              const color = CAT_COLORS[p.category] || '#003366';
              return (
                <div key={p.id} className="prod-item" onClick={() => setSelectedProduct(p)}>
                  <div className="prod-item__img" style={{ background: p.image ? 'transparent' : color + '10' }}>
                    {p.image ? (
                      <>
                        <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.35)' }} />
                      </>
                    ) : (
                      <>
                        <div className="prod-item__cat-icon" style={{ color }}>{CAT_ICONS[p.category] || '💊'}</div>
                        <div className="prod-item__color-bar" style={{ background: color }} />
                      </>
                    )}
                    <div className="prod-item__badges">
                      <span className="tag" style={{ background: p.image ? FORM_COLORS[p.form] : FORM_COLORS[p.form]+'18', color: p.image ? '#fff' : FORM_COLORS[p.form], fontSize:'10px', fontWeight: '600' }}>
                        {p.form}
                      </span>
                    </div>
                  </div>
                  <div className="prod-item__body">
                    <div className="prod-item__species">{p.species}</div>
                    <h3>{p.name}</h3>
                    <div className="prod-item__composition">{p.composition}</div>
                    <p>{p.desc}</p>
                    <button className="prod-item__details-btn" onClick={e => { e.stopPropagation(); setSelectedProduct(p); }}>
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}

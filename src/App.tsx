/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Trees, 
  Shovel, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Home, 
  Users,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Snowflake,
  Info,
  Calendar,
  Sprout,
  Flower2,
  Calculator,
  Check,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import emailjs from '@emailjs/browser';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const services = [
  {
    title: "Sekání trávy",
    description: "Pravidelné i jednorázové sečení trávníků všech rozměrů, od malých zahrad po velké firemní areály.",
    longDescription: "Zajistíme zkrácení vašeho trávníku. Nabízíme sečení rotačními sekačkami se sběrem do koše, mulčování vysoké trávy i sečení křovinořezem v těžko přístupných místech nebo svazích. Odvážíme a ekologicky likvidujeme veškerý vzniklý bioodpad.",
    icon: Sprout,
    price: "od 2 Kč/m²",
    image: "https://images.pexels.com/photos/20113318/pexels-photo-20113318.jpeg?auto=compress&cs=tinysrgb&w=800",
    detailedPrices: [
      { name: "Sekačkou bez sběru (do 10 cm)", price: "2 Kč/m²" },
      { name: "Sekačkou se sběrem (do 10 cm)", price: "2,5 Kč/m²" },
      { name: "Vysoká tráva (10–15 cm) se sběrem", price: "6 Kč/m²" },
      { name: "Křovinořez (do 25 cm) bez sběru", price: "6 Kč/m²" }
    ]
  },
  {
    title: "Střih keřů a živých plotů",
    description: "Tvarování a zmlazování živých plotů a okrasných dřevin pro dokonalý vzhled vaší zahrady.",
    longDescription: "Provádíme řez okrasných dřevin, tvarování živých plotů i zmlazovací řezy starších keřů. Práce provádíme s důrazem na zdraví rostlin a estetický výsledek.",
    icon: Trees,
    price: "od 800 Kč/hod",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800",
    detailedPrices: [
      { name: "Nižší keře (do 2 m)", price: "800 Kč/hod" },
      { name: "Vyšší keře a stromy", price: "1200 Kč/hod" },
      { name: "Práce ve svahu (příplatek)", price: "+200 Kč/hod" }
    ]
  },
  {
    title: "Záhony a výsadba",
    description: "Pletí, mulčování, hnojení a výsadba nových rostlin. Postaráme se, aby vaše záhony kvetly.",
    longDescription: "Kompletní péče o vaše okrasné i užitkové záhony. Od jarního pletí a hnojení přes doplňování mulčovací kůry až po podzimní přípravu na zimu. Zajistíme potřebný materiál pro výsadbu i údržbu.",
    icon: Shovel,
    price: "od 600 Kč/hod",
    image: "https://images.pexels.com/photos/59659/pexels-photo-59659.jpeg?auto=compress&cs=tinysrgb&w=800",
    detailedPrices: [
      { name: "Pletí plevele", price: "600 Kč/hod" },
      { name: "Mulčování a výsadba", price: "800 Kč/hod" },
      { name: "Doplnění zeminy", price: "800 Kč/hod" }
    ]
  },
  {
    title: "Vertikutace trávníku",
    description: "Provzdušnění trávníku pro lepší příjem živin a vody. Nezbytné pro zdravý a hustý pažit.",
    longDescription: "Vertikutace odstraňuje z trávníku plsť, mech a zbytky rostlin, které brání přístupu vzduchu, vody a živin ke kořenům. Doporučujeme provádět dvakrát ročně (jaro/podzim) pro udržení hustého a sytě zeleného trávníku bez mechu.",
    icon: CheckCircle2,
    price: "9 Kč/m²",
    image: "https://images.pexels.com/photos/12932883/pexels-photo-12932883.jpeg?auto=compress&cs=tinysrgb&w=800",
    detailedPrices: [
      { name: "Vertikutace / vyčesání trávníku", price: "9 Kč/m²" },
      { name: "Oprava trávníku (zemina + osivo)", price: "25 Kč/m²" }
    ]
  },
  {
    title: "Úklid listí a bioodpadu",
    description: "Kompletní sezónní úklid zahrady včetně odvozu a ekologické likvidace veškerého bioodpadu.",
    longDescription: "Zbavíme vaši zahradu spadaného listí, větví a dalších organických zbytků. Vše naložíme a odvezeme k ekologické likvidaci. Nabízíme i pravidelný odvoz bioodpadu z vašich nádob nebo kompostů.",
    icon: Leaf,
    price: "6 Kč/m²",
    image: "https://images.pexels.com/photos/14168019/pexels-photo-14168019.jpeg?auto=compress&cs=tinysrgb&w=800",
    detailedPrices: [
      { name: "Hrabání listí", price: "6 Kč/m²" },
      { name: "Odvoz bioodpadu", price: "450 Kč/m³" }
    ]
  },
  {
    title: "Zimní údržba",
    description: "Údržba zpevněných ploch posypovou solí či štěrkem. Zajištění bezpečného pohybu v zimním období.",
    longDescription: "Zajišťujeme sjízdnost a schůdnost chodníků, parkovišť a příjezdových cest. Provádíme posyp solí nebo inertním materiálem. Služba je dostupná pro firmy, SVJ i soukromé osoby v Liberci a okolí.",
    icon: Snowflake,
    price: "900 Kč/h",
    image: "https://images.pexels.com/photos/15921627/pexels-photo-15921627.jpeg?auto=compress&cs=tinysrgb&w=800",
    detailedPrices: [
      { name: "Zimní údržba (strojní)", price: "900 Kč/motohodina" },
      { name: "Posypový materiál", price: "dle spotřeby" }
    ]
  }
];

const specializations = [
  {
    title: "Firemní areály",
    description: "Reprezentativní vzhled okolí vaší firmy je vaší vizitkou. Nabízíme komplexní správu zeleně.",
    icon: Building2,
    color: "bg-brand-100 text-brand-600"
  },
  {
    title: "SVJ a bytové domy",
    description: "Pravidelná údržba společných prostor a dvorů pro spokojenost všech obyvatel domu.",
    icon: Users,
    color: "bg-brand-100 text-brand-600"
  },
  {
    title: "Soukromé zahrady",
    description: "Zajistíme kompletní údržbu vaší zahrady, aby zůstala oázou klidu. Vy jen odpočívejte.",
    icon: Home,
    color: "bg-brand-100 text-brand-600"
  }
];

const pricingData = [
  { category: "Trávníky", icon: Leaf, items: [
    { name: "Sekání trávy sekačkou bez sběru | do 10 cm", price: "2 Kč / m²" },
    { name: "Sekání trávy sekačkou se sběrem | do 10 cm", price: "2,5 Kč / m²" },
    { name: "Sekání trávy se sběrem | 10–15 cm", price: "6 Kč / m²" },
    { name: "Sekání trávy se sběrem | 15–20 cm", price: "9 Kč / m²" },
    { name: "Mulčování vysoké trávy | 50–80 cm", price: "6 Kč / m²" },
    { name: "Sekání trávy ve svahu | příplatek", price: "+2 Kč / m²" },
    { name: "Sekání křovinořezem bez sběru | do 25 cm", price: "6 Kč / m²" },
    { name: "Sekání křovinořezem bez sběru | 30–50 cm", price: "9 Kč / m²" },
    { name: "Sekání křovinořezem bez sběru | 50–100 cm", price: "16 Kč / m²" },
    { name: "Vertikutace / vyčesání trávníku", price: "9 Kč / m²" },
    { name: "Oprava trávníku | (zemina + osivo)", price: "25 Kč / m²" },
  ]},
  { category: "Záhon", icon: Flower2, items: [
    { name: "Pletí plevele", price: "600 Kč / hod" },
    { name: "Mulčování", price: "800 Kč / hod | (+materiál)" },
    { name: "Doplnění zeminy", price: "800 Kč / hod | (+materiál)" },
    { name: "Výsadba", price: "800 Kč / hod | (+materiál)" },
  ]},
  { category: "Střih keřů a živých plotů", icon: Trees, items: [
    { name: "Prořez nižších keřů | do 2 m", price: "800 Kč / hod" },
    { name: "Prořez vyšších keřů a stromů", price: "1200 Kč / hod" },
    { name: "Práce ve svahu | příplatek", price: "+200 Kč / hod" },
  ]},
  { category: "Ostatní", icon: Snowflake, items: [
    { name: "Doprava", price: "12 Kč / km | (z Dlouhého Mostu)" },
    { name: "Hrabání listí", price: "6 Kč / m²" },
    { name: "Odvoz bioodpadu", price: "450 Kč / m³" },
    { name: "Zimní údržba | (motorizovaný posyp solí nebo štěrkem)", price: "900 Kč / motohodina | (+ materiál)" },
  ]}
];

const SERVICE_CONFIG: Record<string, { 
  unit: string; 
  basePrice: number; 
  subOptions?: { label: string; price: number }[];
  hasSlope?: boolean;
  slopeSurcharge?: number;
  bioWasteFactor?: number; // m3 per unit
  estimateLogic?: (qty: number) => number; // for winter maintenance
}> = {
  "Sekání trávy": {
    unit: "m²",
    basePrice: 2,
    hasSlope: true,
    slopeSurcharge: 2,
    bioWasteFactor: 0.003,
    subOptions: [
      { label: "Sekačkou bez sběru (do 10 cm)", price: 2 },
      { label: "Sekačkou se sběrem (do 10 cm)", price: 2.5 },
      { label: "Vysoká tráva (10–15 cm) se sběrem", price: 6 },
      { label: "Vysoká tráva (15–20 cm) se sběrem", price: 9 },
      { label: "Křovinořez (do 25 cm) bez sběru", price: 6 },
      { label: "Křovinořez (30–50 cm) bez sběru", price: 9 },
      { label: "Křovinořez (50–100 cm) bez sběru", price: 16 },
    ]
  },
  "Střih keřů a živých plotů": {
    unit: "hod",
    basePrice: 800,
    hasSlope: true,
    slopeSurcharge: 200,
    bioWasteFactor: 0.15,
    subOptions: [
      { label: "Nižší keře (do 2 m)", price: 800 },
      { label: "Vyšší keře a stromy", price: 1200 },
    ]
  },
  "Pletí a údržba záhonů": {
    unit: "hod",
    basePrice: 600,
    bioWasteFactor: 0.02,
  },
  "Mulčování": {
    unit: "hod",
    basePrice: 800,
  },
  "Výsadba": {
    unit: "hod",
    basePrice: 800,
  },
  "Vertikutace trávníku": {
    unit: "m²",
    basePrice: 9,
    bioWasteFactor: 0.001,
  },
  "Úklid listí a bioodpadu": {
    unit: "m²",
    basePrice: 6,
    hasSlope: true,
    slopeSurcharge: 2,
    bioWasteFactor: 0.003,
  },
  "Zimní údržba": {
    unit: "m²",
    basePrice: 900,
    estimateLogic: (qty) => Math.ceil(qty / 500) // 1 hour per 500m2
  }
};

interface ServiceItem {
  id: string;
  service: string;
  quantity: number;
  subOption?: string;
  isSlope?: boolean;
}

interface PriceBreakdownItem {
  label: string;
  price: number;
}

const getDistanceByPsc = (psc: string): number => {
  const cleanPsc = psc.replace(/\s/g, '');
  
  // Lokality s dopravou zdarma (Liberec, Dlouhý Most, Šimonovice, Jeřmanice)
  if (cleanPsc.startsWith('460') || cleanPsc === '46312') return 0;
  
  // Specific towns
  if (cleanPsc.startsWith('511')) return 22; // Turnov
  if (cleanPsc.startsWith('46342')) return 10; // Hodkovice nad Mohelkou
  if (cleanPsc.startsWith('466')) return 12; // Jablonec nad Nisou
  if (cleanPsc.startsWith('46331')) return 18; // Chrastava
  if (cleanPsc.startsWith('46334')) return 28; // Hrádek nad Nisou
  if (cleanPsc.startsWith('464')) return 32; // Frýdlant
  
  // General areas
  if (cleanPsc.startsWith('463')) return 8; // Blízké okolí Liberce
  if (cleanPsc.startsWith('46')) return 25;
  if (cleanPsc.startsWith('51')) return 30;
  
  return 40; // default pro velmi vzdálené lokality
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [view, setView] = useState<'main' | 'calculator'>('main');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'jednorázová',
    frequency: '2-3x ročně',
    date: '',
    psc: '',
    message: '',
    items: [
      { id: Math.random().toString(36).substr(2, 9), service: "Sekání trávy", quantity: 0, subOption: "Sekačkou bez sběru (do 10 cm)", isSlope: false },
      { id: Math.random().toString(36).substr(2, 9), service: "Žádná", quantity: 0, isSlope: false },
    ] as ServiceItem[]
  });

  const getPriceBreakdown = () => {
    const breakdown: PriceBreakdownItem[] = [];
    let totalBioWasteVolume = 0;

    formData.items.forEach(item => {
      if (item.service === "Žádná" || item.quantity <= 0) return;
      
      const config = SERVICE_CONFIG[item.service];
      if (!config) return;

      let basePrice = config.basePrice;
      if (item.subOption && config.subOptions) {
        const selectedSub = config.subOptions.find(so => so.label === item.subOption);
        if (selectedSub) basePrice = selectedSub.price;
      }

      let itemTotal = basePrice * item.quantity;
      let label = `${item.service}${item.subOption ? ` (${item.subOption})` : ''}`;
      
      if (item.isSlope && config.hasSlope && config.slopeSurcharge) {
        const surcharge = config.slopeSurcharge * item.quantity;
        itemTotal += surcharge;
        label += ` + příplatek za svah`;
      }

      if (config.estimateLogic) {
        const hours = config.estimateLogic(item.quantity);
        itemTotal = hours * config.basePrice;
        label = `${item.service} (odhad ${hours} hod)`;
      }

      breakdown.push({ label, price: itemTotal });

      // Bio waste calculation
      if (config.bioWasteFactor) {
        // Only add bio waste for grass mowing if it's "se sběrem"
        if (item.service === "Sekání trávy") {
          if (item.subOption?.includes("se sběrem")) {
            let specificFactor = config.bioWasteFactor;
            if (item.subOption.includes("do 10 cm")) {
              specificFactor = 0.001; // 1/3 of 0.003
            } else if (item.subOption.includes("10–15 cm")) {
              specificFactor = 0.0015; // 1/2 of 0.003
            }
            totalBioWasteVolume += specificFactor * item.quantity;
          }
        } else {
          totalBioWasteVolume += config.bioWasteFactor * item.quantity;
        }
      }
    });

    if (totalBioWasteVolume > 0) {
      const bioWastePrice = Math.ceil(totalBioWasteVolume * 450);
      breakdown.push({ 
        label: `Odvoz a likvidace bioodpadu (odhad ${totalBioWasteVolume.toFixed(2)} m³)`, 
        price: bioWastePrice 
      });
    }

    if (formData.psc) {
      const distance = getDistanceByPsc(formData.psc);
      const transportPrice = distance * 12 * 2; // tam i zpět
      if (transportPrice > 0) {
        breakdown.push({ label: `Doprava (${distance * 2} km celkem)`, price: transportPrice });
      }
    }

    // Apply discount for regular maintenance
    if (formData.serviceType === 'pravidelná') {
      let discountPercent = 0;
      switch (formData.frequency) {
        case '2-3x ročně': discountPercent = 2; break;
        case '4-6x ročně': discountPercent = 5; break;
        case '1x měsíčně': discountPercent = 7; break;
        case '2x měsíčně': discountPercent = 10; break;
        case 'týdně': discountPercent = 15; break;
      }

      if (discountPercent > 0) {
        const currentTotal = breakdown.reduce((sum, item) => sum + item.price, 0);
        const discountAmount = Math.round(currentTotal * (discountPercent / 100));
        breakdown.push({ label: `Sleva za pravidelnost (${discountPercent}%)`, price: -discountAmount });
      }
    }

    return breakdown;
  };

  const priceBreakdown = getPriceBreakdown();
  const calculatedPrice = priceBreakdown.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Prosím vyplňte jméno a email.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const templateParams = {
      to_name: formData.name,
      to_email: formData.email,
      owner_email: 'zahradnik.lbc@gmail.com',
      total_price: `${calculatedPrice.toLocaleString()} Kč`,
      service_type: formData.serviceType,
      frequency: formData.serviceType === 'pravidelná' ? formData.frequency : 'Jednorázová',
      date: formData.date || 'Nespecifikováno',
      psc: formData.psc || 'Nespecifikováno',
      message: formData.message || 'Bez zprávy',
      price_breakdown: priceBreakdown.map(item => `${item.label}: ${item.price.toLocaleString()} Kč`).join('\n')
    };

    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'sVd3x5rH1tZu6JGUR';

    if (!publicKey) {
      console.error('EmailJS Public Key is missing!');
      setSubmitStatus('error');
      return;
    }

    try {
      await emailjs.send(
        'service_q9pfyvh',
        'template_n389n7r',
        templateParams,
        publicKey
      );
      setSubmitStatus('success');
      // Reset form after success
      setTimeout(() => {
        setView('main');
        setSubmitStatus('idle');
        setFormData({
          ...formData,
          name: '',
          email: '',
          message: '',
          items: [
            { id: Math.random().toString(36).substr(2, 9), service: "Sekání trávy", quantity: 0, subOption: "Sekačkou bez sběru (do 10 cm)", isSlope: false },
          ]
        });
      }, 3000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (view === 'calculator') {
      window.scrollTo(0, 0);
    }
  }, [view]);

  if (view === 'calculator') {
    return (
      <div className="min-h-screen bg-stone-50 font-sans selection:bg-brand-200 selection:text-brand-900">
        <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => setView('main')}
              className="flex items-center gap-2 text-stone-600 hover:text-brand-500 transition-colors font-bold"
            >
              <ArrowRight className="rotate-180" size={20} />
              Zpět na úvod
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-400 rounded-lg flex items-center justify-center text-white">
                <Leaf size={20} />
              </div>
              <span className="text-lg font-bold tracking-tight text-stone-900">
                Zahrady <span className="text-brand-500">LBC</span>
              </span>
            </div>
          </div>
        </nav>

        <main className="pt-24 pb-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 tracking-tight">Cenová kalkulačka</h1>
              <p className="text-stone-600 font-medium text-lg">Získejte okamžitý odhad ceny údržby vaší zeleně.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-100">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-stone-900">1. Vyberte služby</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.items.map((item, index) => {
                      const config = SERVICE_CONFIG[item.service];
                      return (
                        <motion.div 
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 relative"
                        >
                          {formData.items.length > 1 && (
                            <button 
                              type="button"
                              onClick={() => {
                                const newItems = formData.items.filter(i => i.id !== item.id);
                                setFormData({...formData, items: newItems});
                              }}
                              className="absolute top-4 right-4 text-stone-300 hover:text-red-500 transition-colors"
                            >
                              <X size={20} />
                            </button>
                          )}
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Služba</label>
                                <select 
                                  value={item.service}
                                  onChange={(e) => {
                                    const newService = e.target.value;
                                    const newConfig = SERVICE_CONFIG[newService];
                                    const newItems = [...formData.items];
                                    newItems[index] = {
                                      ...item,
                                      service: newService,
                                      subOption: newConfig?.subOptions ? newConfig.subOptions[0].label : undefined,
                                      isSlope: false,
                                      quantity: newService === "Žádná" ? 0 : item.quantity
                                    };
                                    setFormData({...formData, items: newItems});
                                  }}
                                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-200 focus:border-brand-400 outline-none transition-all font-bold text-sm"
                                >
                                  {index > 0 && <option value="Žádná">-- Nevybráno --</option>}
                                  {Object.keys(SERVICE_CONFIG).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Rozsah ({config?.unit})</label>
                              <input 
                                type="number" 
                                placeholder="0"
                                value={item.quantity || ''}
                                onChange={(e) => {
                                  const newItems = [...formData.items];
                                  newItems[index] = { ...item, quantity: Number(e.target.value) };
                                  setFormData({...formData, items: newItems});
                                }}
                                className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-200 focus:border-brand-400 outline-none transition-all font-bold text-sm"
                              />
                            </div>
                          </div>

                          {(config?.subOptions || config?.hasSlope) && (
                            <div className="grid md:grid-cols-2 gap-4 pt-3 border-t border-stone-200">
                              {config.subOptions && (
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Specifikace</label>
                                  <select 
                                    value={item.subOption}
                                    onChange={(e) => {
                                      const newItems = [...formData.items];
                                      newItems[index] = { ...item, subOption: e.target.value };
                                      setFormData({...formData, items: newItems});
                                    }}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-200 focus:border-brand-400 outline-none transition-all font-bold text-sm"
                                  >
                                    {config.subOptions.map(so => <option key={so.label} value={so.label}>{so.label}</option>)}
                                  </select>
                                </div>
                              )}
                              
                              {config.hasSlope && (
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Práce ve svahu?</label>
                                  <div className="flex gap-1.5 p-1 bg-white rounded-xl border border-stone-200">
                                    {[
                                      { label: 'Ano', value: true },
                                      { label: 'Ne', value: false }
                                    ].map((opt) => (
                                      <button
                                        key={opt.label}
                                        type="button"
                                        onClick={() => {
                                          const newItems = [...formData.items];
                                          newItems[index] = { ...item, isSlope: opt.value };
                                          setFormData({...formData, items: newItems});
                                        }}
                                        className={cn(
                                          "flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                                          item.isSlope === opt.value 
                                            ? "bg-brand-500 text-white shadow-md shadow-brand-500/20" 
                                            : "text-stone-400 hover:text-stone-600"
                                        )}
                                      >
                                        {opt.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {item.service === "Zimní údržba" && item.quantity > 0 && (
                                <div className="col-span-2 flex items-center gap-3 text-sm font-bold text-brand-600 bg-brand-50 p-4 rounded-2xl border border-brand-100">
                                  <Clock size={20} />
                                  Odhadovaný čas: cca {config.estimateLogic!(item.quantity)} motohodin práce sypače
                                </div>
                              )}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  <button 
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        items: [...formData.items, { 
                          id: Math.random().toString(36).substr(2, 9), 
                          service: "Žádná", 
                          quantity: 0, 
                          isSlope: false 
                        }]
                      });
                    }}
                    className="w-full py-5 border-2 border-dashed border-brand-200 bg-brand-50/30 rounded-3xl text-brand-600 font-bold hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 transition-all flex items-center justify-center gap-3 shadow-sm"
                  >
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-500">
                      <ArrowRight size={18} className="rotate-90" />
                    </div>
                    Přidat další službu do kalkulace
                  </button>
                </div>

                <div className="pt-6 border-t border-stone-100 space-y-6">
                  <h3 className="text-lg font-bold text-stone-900">2. Vaše údaje</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Jméno a příjmení</label>
                      <input 
                        type="text" 
                        placeholder="Vaše jméno"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-400 outline-none transition-all font-bold text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Email</label>
                      <input 
                        type="email" 
                        placeholder="vas@email.cz"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-400 outline-none transition-all font-bold text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Četnost údržby</label>
                      <div className="flex gap-1.5 p-1 bg-stone-50 rounded-xl border border-stone-200">
                        {['jednorázová', 'pravidelná'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({...formData, serviceType: type})}
                            className={cn(
                              "flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                              formData.serviceType === type 
                                ? "bg-brand-500 text-white shadow-md shadow-brand-500/20" 
                                : "text-stone-400 hover:text-stone-600"
                            )}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {formData.serviceType === 'pravidelná' && (
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Četnost služeb</label>
                        <select 
                          value={formData.frequency}
                          onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                          className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-400 outline-none transition-all font-bold text-sm"
                        >
                          <option value="2-3x ročně">2-3x ročně (sleva 2 %)</option>
                          <option value="4-6x ročně">4-6x ročně (sleva 5 %)</option>
                          <option value="1x měsíčně">1x měsíčně (sleva 7 %)</option>
                          <option value="2x měsíčně">2x měsíčně (sleva 10 %)</option>
                          <option value="týdně">Týdně (sleva 15 %)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Preferovaný termín zahájení prací</label>
                      <input 
                        type="date" 
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-400 outline-none transition-all font-bold text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">PSČ (pro dopravu)</label>
                      <input 
                        type="text" 
                        placeholder="463 12"
                        value={formData.psc}
                        onChange={(e) => setFormData({...formData, psc: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-400 outline-none transition-all font-bold text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Zpráva (volitelné)</label>
                    <textarea 
                      rows={3}
                      placeholder="Doplňující informace..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:border-brand-400 outline-none transition-all resize-none font-bold text-sm"
                    />
                  </div>
                </div>

                <div className="pt-8">
                  {calculatedPrice > 0 && (
                    <div className="mb-8 p-8 rounded-[2.5rem] bg-stone-900 text-white shadow-2xl shadow-stone-900/20">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 pb-8 border-b border-white/10">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-3xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
                            <Calculator size={32} />
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-1">Celkový odhad ceny</p>
                            <p className="text-4xl font-black text-brand-400">{calculatedPrice.toLocaleString()} Kč</p>
                          </div>
                        </div>
                        <div className="text-center md:text-right max-w-xs">
                          <p className="text-sm font-medium text-stone-400 leading-relaxed">
                            Jedná se o orientační cenu dle zadaných parametrů. Cena se může lišit dle skutečného rozsahu služeb.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500 mb-4">Rozpis položek</p>
                        {priceBreakdown.map((item, i) => (
                          <div key={i} className="flex justify-between items-center group">
                            <span className="text-sm font-medium text-stone-300 group-hover:text-white transition-colors">{item.label}</span>
                            <span className="font-bold text-brand-400">{item.price.toLocaleString()} Kč</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button 
                    id="submit-calc"
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className={cn(
                      "w-full py-6 rounded-3xl font-bold text-xl transition-all flex items-center justify-center gap-3",
                      submitStatus === 'success' 
                        ? "bg-green-500 text-white cursor-default" 
                        : "bg-brand-500 text-white hover:bg-brand-600 hover:shadow-2xl hover:shadow-brand-500/20 active:scale-[0.98]",
                      isSubmitting && "opacity-70 cursor-wait"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={24} />
                        Odesílám...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <Check size={24} />
                        Poptávka odeslána!
                      </>
                    ) : (
                      <>
                        Odeslat poptávku z kalkulačky
                        <ArrowRight size={24} />
                      </>
                    )}
                  </button>
                  {submitStatus === 'error' && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold">
                      <AlertCircle size={20} />
                      Něco se nepovedlo. Zkuste to prosím znovu nebo nás kontaktujte přímo.
                    </div>
                  )}
                  <p className="text-center text-stone-500 font-medium text-sm mt-4">
                    Cenovou nabídku vám pošleme na váš zadaný e-mail.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </main>

        {/* Bottom Price Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-stone-200 px-6 py-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-0.5">Aktuální odhad ceny</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-stone-900">{calculatedPrice.toLocaleString()}</span>
                <span className="text-sm font-bold text-brand-600">Kč</span>
              </div>
            </div>
            <button 
              onClick={() => {
                const element = document.getElementById('submit-calc');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-brand-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2"
            >
              Dokončit poptávku
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-brand-200 selection:text-brand-900">
      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-stone-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all text-white md:text-stone-500 md:bg-stone-100 md:hover:bg-stone-200"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent md:hidden" />
                <div className="absolute bottom-6 left-6 md:hidden">
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedService.title}</h3>
                  <span className="text-brand-400 font-bold bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm">
                    {selectedService.price}
                  </span>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
                <div className="hidden md:block mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-brand-100 text-brand-500 rounded-xl flex items-center justify-center">
                      <selectedService.icon size={24} />
                    </div>
                    <span className="text-sm font-bold text-brand-600 bg-brand-100 px-3 py-1 rounded-full">
                      {selectedService.price}
                    </span>
                  </div>
                  <h3 className="text-4xl font-bold text-stone-900">{selectedService.title}</h3>
                </div>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-stone-900 font-bold text-lg mb-3 flex items-center gap-2">
                      <Info size={20} className="text-brand-500" />
                      O službě
                    </h4>
                    <p className="text-stone-600 leading-relaxed font-medium">
                      {selectedService.longDescription}
                    </p>
                  </section>

                  <section>
                    <h4 className="text-stone-900 font-bold text-lg mb-4 flex items-center gap-2">
                      <Calculator size={20} className="text-brand-500" />
                      Ceník podrobně
                    </h4>
                    <div className="bg-stone-50 rounded-2xl p-6 space-y-4">
                      {selectedService.detailedPrices.map((price: any, i: number) => (
                        <div key={i} className="flex justify-between items-center border-b border-stone-200 pb-3 last:border-0 last:pb-0">
                          <span className="text-sm font-medium text-stone-600">{price.name}</span>
                          <span className="font-bold text-brand-600">{price.price}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <div className="pt-4">
                    <a 
                      href="#kontakt"
                      onClick={() => setSelectedService(null)}
                      className="w-full bg-brand-500 text-white py-5 rounded-2xl font-bold text-lg hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/20 flex items-center justify-center gap-3 group"
                    >
                      Poptat tuto službu
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modals for Privacy and Terms */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                <h3 className="text-2xl font-bold text-stone-900">
                  {activeModal === 'privacy' ? 'Ochrana osobních údajů (GDPR)' : 'Obchodní podmínky'}
                </h3>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-stone-200 rounded-full transition-colors text-stone-500"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 overflow-y-auto text-stone-600 leading-relaxed space-y-6 font-medium">
                {activeModal === 'privacy' ? (
                  <>
                    <section>
                      <h4 className="text-stone-900 font-bold mb-2">1. Správce údajů</h4>
                      <p>Správcem vašich osobních údajů je subjekt Zahrady LBC, IČO: 23217375, se sídlem v Liberci. Kontaktní e-mail: zahradnik.lbc@gmail.com.</p>
                    </section>
                    <section>
                      <h4 className="text-stone-900 font-bold mb-2">2. Rozsah zpracování</h4>
                      <p>Zpracováváme pouze údaje, které nám dobrovolně poskytnete prostřednictvím poptávkového formuláře: jméno, příjmení, e-mailová adresa a případné další informace uvedené ve zprávě.</p>
                    </section>
                    <section>
                      <h4 className="text-stone-900 font-bold mb-2">3. Účel zpracování</h4>
                      <p>Vaše údaje zpracováváme výhradně za účelem vyřízení vaší poptávky, přípravy cenové nabídky a následné komunikace ohledně realizace služeb údržby zeleně.</p>
                    </section>
                    <section>
                      <h4 className="text-stone-900 font-bold mb-2">4. Doba uchování</h4>
                      <p>Údaje uchováváme po dobu nezbytnou k vyřízení poptávky nebo po dobu trvání smluvního vztahu. Poté jsou údaje smazány, pokud zákon nevyžaduje jejich delší uchování (např. pro účely účetnictví).</p>
                    </section>
                    <section>
                      <h4 className="text-stone-900 font-bold mb-2">5. Vaše práva</h4>
                      <p>Máte právo požadovat přístup k vašim údajům, jejich opravu, výmaz nebo omezení zpracování. Také můžete vznést námitku proti zpracování. Stačí nás kontaktovat na výše uvedený e-mail.</p>
                    </section>
                  </>
                ) : (
                  <>
                    <section>
                      <h4 className="text-stone-900 font-bold mb-2">1. Úvodní ustanovení</h4>
                      <p>Tyto obchodní podmínky upravují vztah mezi poskytovatelem služeb Zahrady LBC (IČO: 23217375) a zákazníkem při poskytování služeb údržby zeleně a zimní údržby.</p>
                    </section>
                    <section>
                      <h4 className="text-stone-900 font-bold mb-2">2. Objednávka a ceny</h4>
                      <p>Poptávka odeslaná přes webový formulář je nezávazná. Ceny uvedené v ceníku jsou orientační. Konečná cena je vždy stanovena po osobní prohlídce místa realizace a odsouhlasena oběma stranami.</p>
                    </section>
                    <section>
                      <h4 className="text-stone-900 font-bold mb-2">3. Realizace služeb</h4>
                      <p>Termín realizace je stanoven dohodou. V případě nepříznivého počasí (silný déšť, mráz), které by znemožnilo kvalitní provedení práce, si vyhrazujeme právo na změnu termínu po dohodě se zákazníkem.</p>
                    </section>
                    <section>
                      <h4 className="text-stone-900 font-bold mb-2">4. Platební podmínky</h4>
                      <p>Platba probíhá hotově po dokončení práce nebo převodem na účet na základě vystavené faktury se splatností 7–14 dní, není-li dohodnuto jinak.</p>
                    </section>
                    <section>
                      <h4 className="text-stone-900 font-bold mb-2">5. Reklamace</h4>
                      <p>Případné nedostatky v provedené práci je zákazník povinen nahlásit ihned po dokončení nebo nejpozději do 48 hodin od realizace. Na pozdější reklamace u služeb charakteru údržby (sekání, pletí) nelze brát zřetel.</p>
                    </section>
                  </>
                )}
              </div>
              <div className="p-6 bg-stone-50 border-t border-stone-100 flex justify-end">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="bg-brand-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-brand-600 transition-all"
                >
                  Rozumím
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "glass shadow-sm py-3" : "bg-transparent border-b border-white/5"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#o-nás" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-brand-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-400/20">
              <Leaf size={24} />
            </div>
            <span className={cn(
              "text-xl font-bold tracking-tight transition-colors",
              scrolled ? "text-stone-900" : "text-stone-900"
            )}>
              Zahrady <span className="text-brand-400 text-outline-sm">LBC</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['O nás', 'Služby', 'Ceník', 'Kontakt'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={cn(
                  "text-sm font-bold transition-colors",
                  scrolled ? "text-stone-900 hover:text-brand-600" : "text-white hover:text-brand-300 drop-shadow-md"
                )}
              >
                {item}
              </a>
            ))}
            <a 
              href="#kontakt"
              className={cn(
                "text-sm font-bold transition-colors",
                scrolled ? "text-brand-600 hover:text-brand-700" : "text-brand-400 hover:text-brand-300 drop-shadow-md"
              )}
            >
              Poptat údržbu
            </a>
            <button 
              onClick={() => setView('calculator')}
              className="bg-brand-500 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-brand-600 transition-all hover:shadow-lg hover:shadow-brand-500/20 active:scale-95"
            >
              Cenová kalkulačka
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={cn(
              "md:hidden p-2 transition-colors",
              scrolled ? "text-stone-900" : "text-white"
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {['O nás', 'Služby', 'Ceník', 'Kontakt'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-2xl font-bold text-stone-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a 
                href="#kontakt"
                className="text-2xl font-bold text-brand-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Poptat údržbu
              </a>
              <button 
                className="bg-brand-500 text-white px-8 py-4 rounded-2xl text-center font-bold text-lg"
                onClick={() => {
                  setView('calculator');
                  setIsMenuOpen(false);
                }}
              >
                Cenová kalkulačka
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Shortened */}
      <section id="o-nás" className="relative min-h-[75vh] flex items-center pt-20 overflow-hidden scroll-mt-20">
        {/* Background Moving Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.25],
              rotate: [0, 1, 0],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
            className="absolute inset-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=2000" 
              alt="Zelená zahrada" 
              className="w-full h-full object-cover opacity-70"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/40 to-stone-50" />
          
          {/* Floating leaves/greenery */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 right-10 text-brand-200 opacity-50 hidden lg:block"
          >
            <Leaf size={120} />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/4 left-10 text-brand-200 opacity-50 hidden lg:block"
          >
            <Trees size={160} />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
                Liberec a okolí
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
                <span className="text-stone-900 drop-shadow-[0_0_40px_rgba(255,255,255,0.9)] drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                  Zahrady <span className="text-brand-400 text-outline-sm drop-shadow-[0_0_25px_rgba(115,209,61,0.6)]">LBC</span>
                </span>
                <br />
                <span className="text-2xl md:text-4xl text-brand-500 font-semibold block mt-4 text-outline-sm drop-shadow-md">
                  Péče o vaši zeleň
                </span>
              </h1>
              <p className="text-lg text-brand-100 mb-8 max-w-lg leading-relaxed font-medium drop-shadow-lg text-outline-sm">
                Údržba zeleně pro firmy, SVJ i soukromé zahrady.
                <br />
                Jednorázově i pravidelně v Liberci, Jablonci, Turnově a širokém okolí.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#kontakt"
                  className="bg-brand-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-600 transition-all hover:shadow-xl hover:shadow-brand-500/30 group"
                >
                  Nezávazná poptávka
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Target groups visible immediately */}
            <div className="grid gap-4">
              {specializations.map((spec, idx) => (
                <motion.div
                  key={spec.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass p-5 rounded-2xl flex items-center gap-5 hover:border-brand-300 transition-all group cursor-default"
                >
                  <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", spec.color)}>
                    <spec.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">{spec.title}</h3>
                    <p className="text-sm text-stone-600 font-medium">{spec.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="služby" className="pt-8 pb-20 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden scroll-mt-20">
        {/* Decorative background greenery */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 opacity-5 pointer-events-none">
          <Leaf size={400} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-500 tracking-tight">Naše služby</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedService(service)}
                className="bg-stone-50 p-8 rounded-3xl border border-stone-100 hover:border-brand-200 hover:bg-white hover:shadow-xl hover:shadow-brand-500/5 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-white text-brand-500 rounded-xl flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors shadow-sm">
                    <service.icon size={24} />
                  </div>
                  <span className="text-xs font-bold text-brand-600 bg-brand-100 px-3 py-1 rounded-full">
                    {service.price}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">{service.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed font-medium mb-4">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-brand-600 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                  Více informací <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table - Simplified and Updated */}
      <section id="ceník" className="section-padding bg-brand-50 relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">Ceník</h2>
            <div className="mt-4 inline-flex items-center gap-2 text-stone-600 bg-brand-100/50 px-4 py-2 rounded-full text-sm font-medium border border-brand-200">
              <Info size={16} className="text-brand-600" />
              Ceny jsou orientační. V případě pravidelné údržby možnost slevy dle pravidelnosti údržby.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {[
              [pricingData[0]],
              [pricingData[2], pricingData[1]],
              [pricingData[3]]
            ].map((column, colIdx) => (
              <div key={colIdx} className="space-y-6">
                {column.map((group, groupIdx) => (
                  <motion.div 
                    key={group.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (colIdx * 2 + groupIdx) * 0.1 }}
                    className="bg-white rounded-[1.5rem] shadow-sm border border-brand-100 flex flex-col overflow-hidden"
                  >
                    <div className="bg-brand-100/50 p-5 text-brand-900 border-b border-brand-100 flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg text-brand-600">
                        <group.icon size={20} />
                      </div>
                      <h3 className="text-xl font-bold leading-tight">{group.category}</h3>
                    </div>
                    <div className="p-5 flex-grow">
                      <div className="space-y-0">
                        {group.items.map((item, i) => {
                          const nameParts = item.name.split('|');
                          const mainName = nameParts[0].trim();
                          const subName = nameParts[1] ? nameParts[1].trim() : null;

                          const priceParts = item.price.split('|');
                          const mainPrice = priceParts[0].trim();
                          const subPrice = priceParts[1] ? priceParts[1].trim() : null;
                          
                          return (
                            <div key={i} className="flex flex-col py-4 border-b border-stone-100 last:border-0 group hover:bg-brand-50/50 transition-colors px-2 -mx-2 rounded-lg">
                              <div className="flex items-start justify-between gap-3">
                                <span className="text-sm font-semibold text-stone-900 leading-snug">{mainName}</span>
                                <span className="text-brand-600 font-bold text-sm whitespace-nowrap text-right">{mainPrice}</span>
                              </div>
                              {(subName || subPrice) && (
                                <div className="flex justify-between items-start mt-1.5 gap-2">
                                  <span className="text-[13px] text-stone-500 leading-tight italic">{subName || ''}</span>
                                  <span className="text-[13px] text-brand-500 leading-tight italic text-right ml-auto">{subPrice || ''}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-8 rounded-[2.5rem] bg-stone-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 -rotate-12 translate-x-1/4 -translate-y-1/4">
              <Trees size={200} />
            </div>
            <div className="relative z-10">
              <h4 className="text-2xl font-bold mb-2">Individuální kalkulace pro firmy a SVJ</h4>
              <p className="text-stone-400 font-medium">Připravíme vám nabídku na míru. V případě pravidelné údržby možnost slevy dle pravidelnosti.</p>
            </div>
            <a 
              href="#kontakt"
              className="relative z-10 bg-brand-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-600 transition-all whitespace-nowrap shadow-lg shadow-brand-500/20"
            >
              Chci nabídku
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="pt-20 pb-44 md:pt-24 md:pb-72 lg:pt-32 lg:pb-96 px-6 md:px-12 lg:px-24 relative overflow-hidden scroll-mt-24">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2000&auto=format&fit=crop")',
          }}
        />
        <div className="absolute inset-0 z-0 bg-stone-950/60 backdrop-blur-[1px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.8fr] gap-12 items-center">
            <div className="text-white">
              <h2 className="text-sm font-bold text-brand-400 uppercase tracking-[0.2em] mb-4">Kontakt</h2>
              <p className="text-3xl md:text-4xl font-bold mb-8 leading-tight tracking-tight">
                Pojďme se postarat <br />
                <span className="text-brand-400">o vaši zeleň</span>
              </p>
              
              <div className="space-y-6 mt-10">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/10 text-brand-400 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all border border-white/10">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-stone-300 text-[10px] font-bold uppercase tracking-widest">Napište nám</p>
                    <p className="text-lg font-bold">zahradnik.lbc@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/10 text-brand-400 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all border border-white/10">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-stone-300 text-[10px] font-bold uppercase tracking-widest">Působnost</p>
                    <p className="text-lg font-bold">Liberec, Jablonec nad Nisou, Turnov a široké okolí</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex flex-col gap-1">
                    <span className="text-stone-300 text-[10px] font-bold uppercase tracking-widest">Fakturační údaje</span>
                    <span className="text-md font-bold">IČO: 23217375</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 text-stone-900 shadow-2xl shadow-black/50 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-brand-100 text-brand-500 rounded-3xl flex items-center justify-center mb-6">
                <Calculator size={40} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Cenová kalkulačka</h3>
              <button 
                onClick={() => setView('calculator')}
                className="bg-brand-500 text-white px-8 py-6 rounded-2xl font-bold text-lg hover:bg-brand-600 transition-all hover:shadow-xl hover:shadow-brand-500/20 active:scale-[0.98] flex items-center gap-4 group max-w-md leading-tight"
              >
                <span>Získejte cenovou nabídku ihned díky naší cenové kalkulačce</span>
                <ArrowRight className="shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-50 text-stone-500 py-6 px-6 border-t border-stone-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#o-nás" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white shadow-sm">
              <Leaf size={18} />
            </div>
            <span className="text-lg font-bold text-stone-900 drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
              Zahrady <span className="text-brand-400 text-outline-sm">LBC</span>
            </span>
          </a>
          
          <div className="text-center md:text-left">
            <p className="text-sm font-medium">
              © {new Date().getFullYear()} Zahrady LBC | IČO: 23217375
            </p>
            <p className="text-xs mt-1">Údržba zeleně v Liberci, Jablonci, Turnově a okolí</p>
          </div>
          
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
            <button 
              onClick={() => setActiveModal('privacy')}
              className="hover:text-brand-500 transition-colors cursor-pointer"
            >
              Ochrana údajů
            </button>
            <button 
              onClick={() => setActiveModal('terms')}
              className="hover:text-brand-500 transition-colors cursor-pointer"
            >
              Podmínky
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

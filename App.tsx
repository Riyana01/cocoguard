
import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Search, MapPin, BookOpen, Globe, Home, ChevronRight, AlertCircle, Phone, Map as MapIcon, X, Loader2 } from 'lucide-react';
import { Language, PestInfo, PesticideShop } from './types';
import { PEST_DATABASE, TIRUCHENGODE_SHOPS, TRANSLATIONS } from './constants';
import { analyzeCoconutPest } from './services/geminiService';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ta');
  const [view, setView] = useState<'home' | 'browse' | 'camera' | 'shops' | 'detail' | 'result'>('home');
  const [selectedPest, setSelectedPest] = useState<PestInfo | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      const base64Data = base64.split(',')[1];
      setCapturedImage(base64);
      setIsAnalyzing(true);
      setView('result');
      try {
        const result = await analyzeCoconutPest(base64Data, lang);
        setAnalysisResult(result);
      } catch (error) {
        console.error("Analysis failed", error);
        alert("Failed to analyze image. Please try again.");
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const NavItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full py-2 px-1 transition-colors ${active ? 'text-green-600' : 'text-slate-500 hover:text-green-500'}`}
    >
      <Icon size={24} className={active ? 'stroke-[2.5px]' : 'stroke-2'} />
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </button>
  );

  const Header = () => (
    <header className="bg-green-700 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <div className="bg-white p-1 rounded-full text-green-700">
              <AlertCircle size={20} fill="currentColor" />
            </div>
            {t.appTitle}
          </h1>
          <p className="text-[10px] opacity-80">{t.appSubtitle}</p>
        </div>
        <button 
          onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
          className="flex items-center gap-1 bg-green-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-green-900 transition-colors"
        >
          <Globe size={16} />
          {lang === 'en' ? 'தமிழ்' : 'English'}
        </button>
      </div>
    </header>
  );

  const HomeView = () => (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
          <Camera size={32} />
        </div>
        <h2 className="text-lg font-bold mb-2">{t.scanTree}</h2>
        <p className="text-slate-500 text-sm mb-6">{t.appSubtitle}</p>
        
        <label className="w-full bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform">
          <Camera size={20} />
          {t.takePhoto}
          <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageUpload} />
        </label>
        
        <label className="mt-4 text-green-700 font-semibold text-sm cursor-pointer hover:underline">
          {t.uploadPhoto}
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setView('browse')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:bg-slate-50 transition-colors"
        >
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600 mb-3">
            <BookOpen size={24} />
          </div>
          <span className="text-sm font-bold text-slate-800">{t.browsePests}</span>
        </button>
        <button 
          onClick={() => setView('shops')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:bg-slate-50 transition-colors"
        >
          <div className="bg-orange-100 p-3 rounded-xl text-orange-600 mb-3">
            <MapPin size={24} />
          </div>
          <span className="text-sm font-bold text-slate-800">{t.nearbyShops}</span>
        </button>
      </div>

      <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
        <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
          <AlertCircle size={18} />
          {t.safety}
        </h3>
        <p className="text-sm text-green-700 leading-relaxed">
          {t.disclaimer}
        </p>
      </div>
    </div>
  );

  const BrowseView = () => (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{t.browsePests}</h2>
      {PEST_DATABASE.map(pest => (
        <div 
          key={pest.id} 
          onClick={() => { setSelectedPest(pest); setView('detail'); }}
          className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex gap-4 cursor-pointer active:bg-slate-50 transition-colors"
        >
          <img src={pest.imageUrl} alt={pest.name[lang]} className="w-24 h-24 object-cover rounded-xl" />
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="font-bold text-slate-900">{pest.name[lang]}</h3>
            <p className="text-xs italic text-slate-500 mb-2">{pest.scientificName}</p>
            <div className="flex items-center text-green-600 text-sm font-semibold">
              {t.viewDetails} <ChevronRight size={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const PestDetailView = ({ pest }: { pest: PestInfo }) => (
    <div className="bg-white min-h-screen">
      <div className="relative h-64">
        <img src={pest.imageUrl} alt={pest.name[lang]} className="w-full h-full object-cover" />
        <button 
          onClick={() => setView('browse')}
          className="absolute top-4 left-4 bg-white/90 p-2 rounded-full shadow-lg"
        >
          <X size={20} />
        </button>
      </div>
      <div className="p-6 -mt-8 bg-white rounded-t-[32px] relative z-10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{pest.name[lang]}</h2>
          <p className="text-slate-500 italic">{pest.scientificName}</p>
        </div>

        <section>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-green-800">
            <Search size={20} /> {t.symptoms}
          </h3>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            {pest.symptoms[lang].map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </section>

        <section>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-blue-800">
            <AlertCircle size={20} /> {t.causes}
          </h3>
          <p className="text-slate-700 leading-relaxed">{pest.causes[lang]}</p>
        </section>

        <section className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-lg mb-4 text-slate-900">{t.treatment}</h3>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-bold text-sm text-green-700 uppercase tracking-wider">{t.biological}</h4>
              <p className="text-slate-700">{pest.treatments.biological[lang]}</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-bold text-sm text-red-700 uppercase tracking-wider">{t.chemical}</h4>
              <p className="text-slate-700">{pest.treatments.chemical[lang]}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-1">{t.dosage}</h4>
              <p className="text-slate-800 font-medium">{pest.treatments.dosage[lang]}</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="font-bold text-lg mb-3 text-green-800">{t.prevention}</h3>
          <ul className="grid grid-cols-1 gap-2">
            {pest.prevention[lang].map((p, i) => (
              <li key={i} className="flex items-start gap-2 bg-green-50 p-3 rounded-xl text-green-800 text-sm">
                <div className="mt-1"><AlertCircle size={14} /></div>
                {p}
              </li>
            ))}
          </ul>
        </section>

        <div className="pb-24"></div>
      </div>
    </div>
  );

  const ShopsView = () => (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MapPin className="text-orange-500" /> {t.findShops}
      </h2>
      <div className="space-y-3">
        {TIRUCHENGODE_SHOPS.map(shop => (
          <div key={shop.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-900">{shop.name}</h3>
                <p className="text-sm text-slate-500 flex items-start gap-1 mt-1">
                  <MapIcon size={14} className="mt-1 shrink-0" /> {shop.address}
                </p>
              </div>
              <a href={`tel:${shop.phone}`} className="bg-green-100 p-2 rounded-full text-green-700">
                <Phone size={20} />
              </a>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                <MapPin size={16} /> Directions
              </button>
              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                <Phone size={16} /> {t.contact}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AnalysisResultView = () => (
    <div className="bg-white min-h-screen">
      {isAnalyzing ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
          <Loader2 className="animate-spin text-green-600 mb-4" size={48} />
          <h2 className="text-xl font-bold text-slate-800 mb-2">{t.loading}</h2>
          <p className="text-slate-500">Connecting to agricultural knowledge base...</p>
        </div>
      ) : (
        <div className="p-4 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{t.resultTitle}</h2>
            <button onClick={() => setView('home')} className="p-2 bg-slate-100 rounded-full"><X size={20}/></button>
          </div>
          
          {capturedImage && (
            <img src={capturedImage} className="w-full h-48 object-cover rounded-2xl border-4 border-green-500 shadow-lg" alt="Analyzed" />
          )}

          {analysisResult && (
            <div className="space-y-6">
              <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg">
                <div className="text-xs uppercase font-bold opacity-80 mb-1">Identified Pest</div>
                <h3 className="text-2xl font-bold">{analysisResult.pestName}</h3>
                <div className="mt-2 bg-white/20 inline-block px-3 py-1 rounded-full text-sm font-medium">
                  Confidence: {Math.round(analysisResult.confidence * 100)}%
                </div>
              </div>

              <section>
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-slate-800">
                  <Search size={20} className="text-blue-500" /> {t.symptoms}
                </h3>
                <ul className="space-y-2">
                  {analysisResult.symptoms.map((s: string, i: number) => (
                    <li key={i} className="bg-blue-50 text-blue-800 p-3 rounded-xl text-sm border border-blue-100 flex items-start gap-2">
                      <div className="mt-1 text-blue-400">•</div> {s}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-lg mb-2 text-slate-800">{t.causes}</h3>
                <p className="text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">{analysisResult.causes}</p>
              </section>

              <section className="bg-green-50 p-5 rounded-2xl border border-green-100 space-y-4">
                <h3 className="font-bold text-xl text-green-800">{t.treatment}</h3>
                <div>
                  <h4 className="text-xs font-bold text-green-600 uppercase mb-1">{t.biological}</h4>
                  <p className="text-slate-800 font-medium">{analysisResult.treatmentOrganic}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-red-600 uppercase mb-1">{t.chemical}</h4>
                  <p className="text-slate-800 font-medium">{analysisResult.treatmentChemical}</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-green-200">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">{t.dosage}</h4>
                  <p className="text-green-800 font-bold">{analysisResult.dosage}</p>
                </div>
              </section>

              <section>
                <h3 className="font-bold text-lg mb-2 text-slate-800">{t.prevention}</h3>
                <div className="grid grid-cols-1 gap-2">
                  {analysisResult.prevention.map((p: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-100 p-3 rounded-xl text-slate-700 text-sm">
                      <ChevronRight size={16} className="text-green-600" /> {p}
                    </div>
                  ))}
                </div>
              </section>
              
              <div className="pb-24"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
      <Header />
      
      <main className="flex-1 overflow-y-auto">
        {view === 'home' && <HomeView />}
        {view === 'browse' && <BrowseView />}
        {view === 'shops' && <ShopsView />}
        {view === 'detail' && selectedPest && <PestDetailView pest={selectedPest} />}
        {view === 'result' && <AnalysisResultView />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-1 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <NavItem 
          icon={Home} 
          label={t.home} 
          active={view === 'home'} 
          onClick={() => setView('home')} 
        />
        <NavItem 
          icon={Search} 
          label={t.identifyPest} 
          active={view === 'result'} 
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.capture = 'environment';
            input.onchange = (e: any) => handleImageUpload(e);
            input.click();
          }} 
        />
        <NavItem 
          icon={BookOpen} 
          label={t.browsePests} 
          active={view === 'browse' || view === 'detail'} 
          onClick={() => setView('browse')} 
        />
        <NavItem 
          icon={MapPin} 
          label={t.nearbyShops} 
          active={view === 'shops'} 
          onClick={() => setView('shops')} 
        />
      </nav>
    </div>
  );
};

export default App;

import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowRight, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import { SUPPORTED_BREEDS, BreedInfo } from '../data/breedsData';

interface LibraryPageProps {
  setActivePage: (page: string) => void;
  onOpenDocModal: (docId: string) => void;
}

export const LibraryPage: React.FC<LibraryPageProps> = ({ setActivePage, onOpenDocModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState<'all' | 'cow' | 'buffalo'>('all');
  const [selectedBreed, setSelectedBreed] = useState<BreedInfo | null>(null);

  const filteredBreeds = useMemo(() => {
    return SUPPORTED_BREEDS.filter((b) => {
      const matchesSpecies = speciesFilter === 'all' || b.species === speciesFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.nativeRegion.toLowerCase().includes(q) ||
        b.states.some((s) => s.toLowerCase().includes(q)) ||
        b.primaryPurpose.toLowerCase().includes(q) ||
        b.keyPhenotypicDifferentiator.toLowerCase().includes(q);

      return matchesSpecies && matchesSearch;
    });
  }, [searchQuery, speciesFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <span>Verified Germplasm Library</span>
              <span aria-hidden="true">·</span>
              <span>ICAR-NBAGR Standards</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-1">
              Indian Cattle & Buffalo Breed Library
            </h1>
          </div>

          <button
            onClick={() => onOpenDocModal('paper')}
            className="text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-800" />
            <span>Research Citations</span>
          </button>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Comprehensive phenotypic descriptors, geographic distribution tracts, lactation performance, and anatomical hallmarks for all 8 target classes officially registered with the National Bureau of Animal Genetic Resources.
        </p>
      </div>

      {/* Search & Segmented Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by breed, state, or traits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
          />
        </div>

        {/* Segmented Filter Control (Interactive Buttons) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-full sm:w-auto">
          <button
            onClick={() => setSpeciesFilter('all')}
            className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              speciesFilter === 'all'
                ? 'bg-white text-slate-950 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Classes (8)
          </button>
          <button
            onClick={() => setSpeciesFilter('cow')}
            className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              speciesFilter === 'cow'
                ? 'bg-white text-slate-950 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Indian Cows (4)
          </button>
          <button
            onClick={() => setSpeciesFilter('buffalo')}
            className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              speciesFilter === 'buffalo'
                ? 'bg-white text-slate-950 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Riverine Buffaloes (4)
          </button>
        </div>
      </div>

      {/* Breeds Grid */}
      {filteredBreeds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBreeds.map((breed) => (
            <div
              key={breed.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-emerald-600 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo container */}
                <div className="aspect-4/3 bg-slate-100 relative overflow-hidden">
                  <img
                    src={breed.image}
                    alt={breed.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {breed.species === 'cow' ? 'Bos indicus' : 'Bubalus bubalis'}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-emerald-900/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {breed.species === 'cow' ? 'Cattle' : 'Buffalo'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-950">
                      {breed.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {breed.nativeRegion}
                    </p>
                    <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                      {breed.accessionCode}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {breed.summary}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px]">
                    <div>
                      <span className="font-semibold text-slate-800">Primary Hallmark:</span>
                      <p className="text-slate-600 italic mt-0.5">
                        {breed.keyPhenotypicDifferentiator}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px]">
                      <div className="p-1.5 bg-slate-50 rounded">
                        <span className="text-slate-400 block">Lactation</span>
                        <span className="font-semibold text-slate-800">{breed.averageLactationYieldKg.split('(')[0]}</span>
                      </div>
                      <div className="p-1.5 bg-slate-50 rounded">
                        <span className="text-slate-400 block">Fat Content</span>
                        <span className="font-semibold text-slate-800">{breed.fatPercentage}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-2">
                <button
                  onClick={() => setSelectedBreed(breed)}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-950 cursor-pointer"
                >
                  Full Phenotype Dossier
                </button>
                <button
                  onClick={() => {
                    setActivePage('recognition');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Test in AI</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 space-y-3">
          <p className="text-sm font-semibold text-slate-700">
            No breeds match your search query &quot;{searchQuery}&quot;
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSpeciesFilter('all'); }}
            className="text-xs text-emerald-800 hover:underline font-medium cursor-pointer"
          >
            Clear filters and reset library
          </button>
        </div>
      )}

      {/* Phenotypic Dossier Detail Modal */}
      {selectedBreed && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-800 uppercase tracking-wider font-semibold">
                  ICAR-NBAGR Breed Registration Standard
                </span>
                <h3 className="text-lg font-bold text-slate-950">
                  {selectedBreed.name} ({selectedBreed.scientificName})
                </h3>
              </div>
              <button
                onClick={() => setSelectedBreed(null)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
              <div className="aspect-16/9 rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={selectedBreed.image}
                  alt={selectedBreed.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 text-[10px] font-mono block">Accession Code</span>
                  <span className="font-semibold text-slate-900">{selectedBreed.accessionCode}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 text-[10px] font-mono block">Primary Purpose</span>
                  <span className="font-semibold text-slate-900">{selectedBreed.primaryPurpose}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 text-[10px] font-mono block">Lactation Yield</span>
                  <span className="font-semibold text-emerald-800 font-mono">{selectedBreed.averageLactationYieldKg}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Detailed Phenotypic Descriptors
                </h4>
                <div className="border border-slate-200 rounded-lg divide-y divide-slate-100">
                  <div className="p-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="font-semibold text-slate-900 sm:w-1/3">Horns:</span>
                    <span className="sm:w-2/3 text-slate-600">{selectedBreed.visualHallmarks.horns}</span>
                  </div>
                  <div className="p-2.5 flex flex-col sm:flex-row sm:justify-between gap-1 bg-slate-50/50">
                    <span className="font-semibold text-slate-900 sm:w-1/3">Cranial / Forehead:</span>
                    <span className="sm:w-2/3 text-slate-600">{selectedBreed.visualHallmarks.forehead}</span>
                  </div>
                  <div className="p-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="font-semibold text-slate-900 sm:w-1/3">Ears:</span>
                    <span className="sm:w-2/3 text-slate-600">{selectedBreed.visualHallmarks.ears}</span>
                  </div>
                  <div className="p-2.5 flex flex-col sm:flex-row sm:justify-between gap-1 bg-slate-50/50">
                    <span className="font-semibold text-slate-900 sm:w-1/3">Coat Color:</span>
                    <span className="sm:w-2/3 text-slate-600">{selectedBreed.visualHallmarks.coatColor}</span>
                  </div>
                  <div className="p-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <span className="font-semibold text-slate-900 sm:w-1/3">Hump & Dewlap:</span>
                    <span className="sm:w-2/3 text-slate-600">{selectedBreed.visualHallmarks.humpAndDewlap}</span>
                  </div>
                  <div className="p-2.5 flex flex-col sm:flex-row sm:justify-between gap-1 bg-slate-50/50">
                    <span className="font-semibold text-slate-900 sm:w-1/3">Conformation:</span>
                    <span className="sm:w-2/3 text-slate-600">{selectedBreed.visualHallmarks.bodyBuild}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => setSelectedBreed(null)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedBreed(null);
                  setActivePage('recognition');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs"
              >
                Test {selectedBreed.name} in Classifier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


import React from 'react';
import { Exercise } from '../types';

interface Props {
  exercise: Exercise;
}

export const DrillItem: React.FC<Props> = ({ exercise }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Física': return 'text-emerald-400 bg-emerald-400/10 border-emerald-500/30';
      case 'Tática': return 'text-blue-400 bg-blue-400/10 border-blue-500/30';
      case 'Técnica': return 'text-amber-400 bg-amber-400/10 border-amber-500/30';
      case 'Ensaiada': return 'text-violet-400 bg-violet-400/10 border-violet-500/30';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-500/30';
    }
  };

  return (
    <div className="bg-slate-800/20 border border-slate-700/50 p-8 rounded-[32px] hover:bg-slate-800/40 transition-all group">
      <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
        <div className="flex items-start gap-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-black text-xl border ${getCategoryColor(exercise.category)}`}>
            {exercise.category[0]}
          </div>
          <div>
            <h4 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors mb-2">
              {exercise.title}
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${getCategoryColor(exercise.category)}`}>
                {exercise.category}
              </span>
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
                INTENSIDADE: {exercise.intensity}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 lg:self-start">
           <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700 text-center min-w-[100px]">
              <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Duração</span>
              <span className="text-xl font-black text-white">{exercise.duration} MIN</span>
           </div>
        </div>
      </div>
      
      <div className="pl-0 lg:pl-20">
        <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Metodologia e Execução</div>
        <div className="text-slate-300 text-lg leading-relaxed mb-8 font-medium whitespace-pre-wrap">
          {exercise.description}
        </div>
        
        <div className="flex justify-end pt-6 border-t border-slate-700/50">
          {exercise.videoUrl && (
            <a 
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.videoUrl)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-xs font-black text-blue-400 hover:text-white bg-blue-500/5 hover:bg-blue-600 px-6 py-3 rounded-xl transition-all uppercase tracking-widest border border-blue-500/20 group/btn"
            >
              <span>Ver Demonstração Prática</span>
              <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

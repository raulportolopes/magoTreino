
import React from 'react';
import { TrainingSession } from '../types';

interface Props {
  session: TrainingSession;
  onClick: (session: TrainingSession) => void;
}

export const SessionCard: React.FC<Props> = ({ session, onClick }) => {
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}`;
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase();
  };

  return (
    <div 
      onClick={() => onClick(session)}
      className="bg-slate-800 border border-slate-700 p-4 rounded-xl hover:border-blue-500 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="text-xs font-bold text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
            {getDayName(session.date)}
          </span>
          <h3 className="text-lg font-bold mt-2 text-white group-hover:text-blue-400 transition-colors">
            {formatDate(session.date)} - {session.theme}
          </h3>
        </div>
        <span className="text-slate-400 text-sm font-mono">{session.startTime}</span>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {Array.from(new Set(session.exercises.map(e => e.category))).map(cat => (
          <span key={cat} className="text-[10px] uppercase tracking-wider bg-slate-700 px-2 py-0.5 rounded text-slate-300">
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
};


import React, { useState, useEffect, useMemo } from 'react';
import { TrainingSession, Exercise, TrainingCategory } from './types';
import { generateTrainingDates, INITIAL_PHASES, DRILL_POOL, DetailedDrill } from './constants';
import { SessionCard } from './components/SessionCard';
import { DrillItem } from './components/DrillItem';
import { generateDrillSuggestions } from './services/geminiService';

const App: React.FC = () => {
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past'>('Upcoming');

  // Generator Logic with non-repetitive selection
  useEffect(() => {
    const dates = generateTrainingDates("2026-01-19", "2026-12-31");
    let drillCounters: Record<string, number> = {};

    const getUniqueDrillData = (category: keyof typeof DRILL_POOL): DetailedDrill => {
      const pool = DRILL_POOL[category];
      const count = drillCounters[category] || 0;
      const drill = pool[count % pool.length];
      drillCounters[category] = count + 1;
      return drill;
    };

    const initialSessions: TrainingSession[] = dates.map((date, idx) => {
      const isPreSeason = date < "2026-03-15";
      const isMonday = new Date(date + "T00:00:00").getDay() === 1;
      
      let microcycle = "";
      let theme = "";
      let loadLevel = 3;

      if (isPreSeason) {
        const weekNum = Math.floor(idx / 2);
        if (weekNum < 2) {
          microcycle = "Adaptação Anatômica";
          theme = "Fundamentos e Ativação Progressiva";
          loadLevel = 2;
        } else if (weekNum < 6) {
          microcycle = "Acumulação de Carga";
          theme = "Força Explosiva e Sistemas Táticos Básicos";
          loadLevel = 5;
        } else {
          microcycle = "Transformação Especial";
          theme = "Velocidade de Reação e Transições Rápidas";
          loadLevel = 4;
        }
      } else {
        microcycle = isMonday ? "Recuperação / Ajuste Tático" : "Ajuste Fino / Prontidão Competitiva";
        theme = isMonday ? "Correção de Movimentação e Posse" : "Estratégias Específicas e Bolas Paradas";
        loadLevel = isMonday ? 3 : 4;
      }

      const cats: TrainingCategory[] = isPreSeason 
        ? ['Física', 'Técnica', 'Tática'] 
        : (isMonday ? ['Técnica', 'Tática', 'Jogo'] : ['Ensaiada', 'Tática', 'Jogo']);

      const exercises: Exercise[] = cats.map((cat, eIdx) => {
        const drillData = getUniqueDrillData(cat);
        return {
          id: `ex-${idx}-${eIdx}`,
          title: drillData.title,
          description: drillData.description,
          duration: eIdx === 0 ? 15 : eIdx === 1 ? 25 : 30, // Proportional duration
          intensity: loadLevel >= 4 ? 'Alta' : 'Média',
          category: cat,
          videoUrl: drillData.videoQuery
        };
      });

      return {
        id: `session-${idx}`,
        date,
        startTime: "20:00",
        endTime: "21:15",
        theme,
        microcycle,
        loadLevel,
        exercises,
        status: 'Planejado'
      };
    });
    setSessions(initialSessions);
  }, []);

  const sortedSessions = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    if (activeTab === 'Upcoming') {
      return sessions.filter(s => s.date >= today).sort((a, b) => a.date.localeCompare(b.date));
    }
    return sessions.filter(s => s.date < today).sort((a, b) => b.date.localeCompare(a.date));
  }, [sessions, activeTab]);

  const handleMagoMagic = async () => {
    if (!selectedSession) return;
    setLoading(true);
    try {
      const suggestions = await generateDrillSuggestions(selectedSession.theme, "Futsal de Elite Sub-18");
      const newExercises: Exercise[] = suggestions.map((s: any, i: number) => ({
        ...s,
        id: `gemini-${Date.now()}-${i}`
      }));
      
      const updatedSessions = sessions.map(s => 
        s.id === selectedSession.id 
          ? { ...s, exercises: [...newExercises] } 
          : s
      );
      setSessions(updatedSessions);
      setSelectedSession({ ...selectedSession, exercises: [...newExercises] });
    } catch (error) {
      alert("Houve uma falha na visão do Mago. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  const getLoadColor = (level: number) => {
    if (level >= 5) return 'bg-red-600';
    if (level >= 4) return 'bg-orange-500';
    if (level >= 3) return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0b1120] text-slate-100">
      <aside className="w-full md:w-[400px] border-r border-slate-800 flex flex-col h-screen overflow-hidden shrink-0 bg-[#0f172a]/95 backdrop-blur-sm">
        <header className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 transform hover:scale-110 transition-transform">
              <span className="text-3xl">🪄</span>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white uppercase leading-none">Mago Treino</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-black bg-blue-500/20 px-2 py-0.5 rounded text-blue-400 border border-blue-500/30">SUB-18</span>
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Época 2026</span>
              </div>
            </div>
          </div>
          
          <div className="flex bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/50">
            <button 
              onClick={() => setActiveTab('Upcoming')}
              className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all ${activeTab === 'Upcoming' ? 'bg-blue-600 text-white shadow-xl translate-z-0' : 'text-slate-500 hover:text-slate-300'}`}
            >
              PRÓXIMOS TREINOS
            </button>
            <button 
              onClick={() => setActiveTab('Past')}
              className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all ${activeTab === 'Past' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
            >
              HISTÓRICO
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {sortedSessions.map(session => (
            <div 
              key={session.id} 
              onClick={() => setSelectedSession(session)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group hover:scale-[1.02] ${selectedSession?.id === session.id ? 'bg-blue-600/10 border-blue-500 shadow-2xl shadow-blue-500/10' : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-500'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${selectedSession?.id === session.id ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                  {new Date(session.date + "T00:00:00").toLocaleDateString('pt-BR', { weekday: 'long' }).toUpperCase()}
                </span>
                <div className="flex gap-1">
                   {[1,2,3,4,5].map(v => (
                     <div key={v} className={`w-1.5 h-4 rounded-full ${v <= session.loadLevel ? getLoadColor(session.loadLevel) : 'bg-slate-700'}`} title={`Carga: ${session.loadLevel}`}></div>
                   ))}
                </div>
              </div>
              <h3 className={`font-black text-lg leading-snug ${selectedSession?.id === session.id ? 'text-blue-100' : 'text-slate-100'}`}>
                {new Date(session.date + "T00:00:00").toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} • {session.theme}
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-slate-500"></div>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{session.microcycle}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen relative bg-[#0b1120]">
        {selectedSession ? (
          <div className="p-6 md:p-12 lg:p-16 max-w-6xl mx-auto">
            <div className="mb-16">
              <div className="flex flex-col xl:flex-row justify-between items-start gap-8 mb-12">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                     <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full font-black text-xs">
                       📅 {new Date(selectedSession.date + "T00:00:00").toLocaleDateString('pt-BR', { dateStyle: 'full' })}
                     </span>
                     <span className="bg-slate-800/80 px-4 py-1.5 rounded-full text-slate-400 font-bold text-xs border border-slate-700">
                       ⏰ {selectedSession.startTime} - {selectedSession.endTime} (75 MIN)
                     </span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-[0.9]">{selectedSession.theme}</h2>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 flex flex-col gap-1 min-w-[140px]">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Microciclo</span>
                      <span className="text-blue-400 font-black text-sm">{selectedSession.microcycle.toUpperCase()}</span>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 flex flex-col gap-1 min-w-[140px]">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Nível de Carga</span>
                      <span className={`font-black text-sm ${selectedSession.loadLevel > 3 ? 'text-red-400' : 'text-emerald-400'}`}>{selectedSession.loadLevel} / 5</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleMagoMagic}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-10 py-5 rounded-2xl font-black flex items-center gap-4 transition-all transform hover:-translate-y-1 shadow-2xl shadow-blue-600/30 shrink-0 group"
                >
                  <span className="text-2xl group-hover:rotate-12 transition-transform">🔮</span>
                  <span>{loading ? 'ANALISANDO...' : 'CONSULTAR O MAGO'}</span>
                </button>
              </div>

              <section>
                <div className="flex items-center gap-6 mb-10">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter shrink-0">Plano de Treino Detalhado</h3>
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-slate-800 to-transparent"></div>
                </div>
                <div className="grid gap-8">
                  {selectedSession.exercises.map((ex, i) => (
                    <DrillItem key={ex.id} exercise={ex} />
                  ))}
                </div>
              </section>

              <div className={`mt-16 p-10 rounded-[32px] border-2 shadow-2xl ${selectedSession.date < "2026-03-15" ? 'bg-blue-900/10 border-blue-500/20' : 'bg-amber-900/10 border-amber-500/20'}`}>
                <div className="flex items-start gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${selectedSession.date < "2026-03-15" ? 'bg-blue-600 text-white' : 'bg-amber-500 text-black'}`}>
                    <span className="text-2xl">{selectedSession.date < "2026-03-15" ? '🚀' : '⚔️'}</span>
                  </div>
                  <div>
                    <h4 className={`text-2xl font-black mb-3 ${selectedSession.date < "2026-03-15" ? 'text-blue-400' : 'text-amber-400'}`}>
                      {selectedSession.date < "2026-03-15" ? 'DIRETRIZ DE PRÉ-TEMPORADA' : 'DIRETRIZ DE COMPETIÇÃO'}
                    </h4>
                    <p className="text-slate-400 leading-relaxed font-medium text-lg">
                      {selectedSession.date < "2026-03-15" 
                        ? "O foco atual é o desenvolvimento da resistência específica e força explosiva. Cobrar que os atletas realizem todos os fundamentos técnicos com o máximo de intensidade possível. Fase de construção de volume e adaptação física intensa."
                        : "Prioridade: Ajustes táticos e bolas paradas. Os treinos de segunda servem para recuperação ativa e correção dos erros observados no jogo do fim de semana. Quarta-feira é o dia da estratégia e preparação mental para o próximo confronto."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center">
            <div className="w-32 h-32 bg-slate-800/30 rounded-[40px] flex items-center justify-center mb-8 animate-pulse border border-slate-700">
               <span className="text-6xl">⚽</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-6">Prancheta do Mago Sub-18</h2>
            <p className="text-slate-500 max-w-md text-lg font-medium leading-relaxed">
              Bem-vindo ao centro de comando. Selecione uma sessão de treino no calendário para gerenciar o desenvolvimento da sua equipe para 2026.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

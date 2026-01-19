
import { TrainingSession, SeasonPhase } from './types';

export const COLORS = {
  primary: '#3b82f6', 
  secondary: '#8b5cf6', 
  accent: '#f59e0b', 
  bg: '#0f172a',
  card: '#1e293b'
};

export const INITIAL_PHASES: SeasonPhase[] = [
  {
    name: "Pré-Temporada",
    start: "2026-01-19",
    end: "2026-03-14",
    description: "Foco em base física, fundamentos técnicos e sistemas básicos."
  },
  {
    name: "Temporada Competitiva",
    start: "2026-03-15",
    end: "2026-12-31",
    description: "Foco em estratégia de jogo, manutenção física e jogadas ensaiadas."
  }
];

export interface DetailedDrill {
  title: string;
  description: string;
  videoQuery: string;
}

export const DRILL_POOL: Record<string, DetailedDrill[]> = {
  Física: [
    {
      title: "Circuito de Potência Aeróbica (Intermitente)",
      description: "Estações de 30 segundos: Sprints com mudança de direção, saltos sobre barreiras baixas e deslocamento lateral defensivo. Descanso de 15 segundos entre estações. 3 séries de 6 minutos.",
      videoQuery: "futsal interval training sub18 intermittent drills"
    },
    {
      title: "Pliometria e Reatividade",
      description: "Saltos em caixa seguidos de sprint curto de 5 metros. Foco no tempo de contato mínimo com o solo e explosão muscular. Ideal para ganho de arranque.",
      videoQuery: "futsal plyometric training explosive power"
    },
    {
      title: "Core e Estabilidade Funcional",
      description: "Pranchas dinâmicas, agachamentos com bola medicinal e exercícios de equilíbrio unipodal. Fundamental para proteção de bola e prevenção de lesões.",
      videoQuery: "futsal core stability injury prevention drills"
    },
    {
      title: "Resistência de Velocidade em Losango",
      description: "Sprints em formato de losango simulando a movimentação de quadra. Alternância entre trote e velocidade máxima (80-100%).",
      videoQuery: "futsal speed endurance diamond drills"
    }
  ],
  Técnica: [
    {
      title: "Finalização sob Pressão 1x1",
      description: "O atacante recebe a bola de costas, realiza o giro sobre o marcador e finaliza em no máximo 2 toques. Enfatiza o uso do corpo para proteger a bola e precisão no chute.",
      videoQuery: "futsal 1v1 finishing drills pivot turn"
    },
    {
      title: "Passe Paralelo e Diagonal com Terceiro Homem",
      description: "Dinâmica de passe em trio: Ala toca na paralela para o pivô, que escora para o ala oposto que entra na diagonal. Foco no tempo de bola e precisão do passe.",
      videoQuery: "futsal 3rd man run passing patterns"
    },
    {
      title: "Domínio Orientado e Drible Curto",
      description: "Exercício em espaço reduzido (2x2m). O jogador deve dominar a bola já direcionando para o espaço vazio e executar um drible rápido para sair da marcação.",
      videoQuery: "futsal close control directional touch"
    },
    {
      title: "Técnica de Cobertura e Antecipação",
      description: "Trabalho específico para fixos: Leitura da trajetória da bola e posicionamento do corpo para interceptação e cobertura das alas.",
      videoQuery: "futsal defensive technique interception drills"
    }
  ],
  Tática: [
    {
      title: "Sistema 4-0: Rotações e Mobilidade",
      description: "Treino tático sem pivô fixo. Movimentação constante em oito, trocando de alas para fixo. Foco em gerar dúvida na marcação e infiltrações rápidas.",
      videoQuery: "futsal 4-0 rotation tactics movements"
    },
    {
      title: "Marcação Pressão em Quadrante",
      description: "Dividir a quadra em quadrantes. A equipe defensora deve pressionar o portador da bola sempre em superioridade numérica local, forçando o erro na saída de bola.",
      videoQuery: "futsal high press defensive tactics"
    },
    {
      title: "Superioridade Numérica 3x2 (Transição)",
      description: "Ataque rápido de 3 jogadores contra 2 defensores. O objetivo é tomar a decisão correta entre o passe final ou a finalização rápida antes da recomposição.",
      videoQuery: "futsal 3v2 counter attack transition"
    },
    {
      title: "Defesa em Zona 2-2 e Flutuação",
      description: "Posicionamento defensivo em bloco médio. Treinar a flutuação dos jogadores de acordo com o lado da bola, mantendo as linhas compactas.",
      videoQuery: "futsal zone defense 2-2 system"
    }
  ],
  Ensaiada: [
    {
      title: "Escanteio: Bloqueio e Chute de Primeira",
      description: "Ala realiza o bloqueio no marcador do batedor, enquanto o fixo entra em velocidade para finalizar de primeira na entrada da área.",
      videoQuery: "futsal corner kick set piece routine blocks"
    },
    {
      title: "Falta Frontal: Ocultação e Desvio",
      description: "Dois jogadores passam por cima da bola simulando o chute, o terceiro rola para o lado para o batedor oficial finalizar ou buscar o desvio na trave.",
      videoQuery: "futsal free kick routines tactical"
    },
    {
      title: "Goleiro-Linha: Circulação em 'U'",
      description: "Posicionamento com 5 jogadores no ataque. Circulação rápida de bola em formato de U para cansar a defesa e buscar o passe de infiltração na segunda trave.",
      videoQuery: "futsal 5v4 power play tactics"
    }
  ],
  Jogo: [
    {
      title: "Jogo de Setores (Restrição de Toques)",
      description: "Quadra dividida em 3 zonas. Defesa: 2 toques. Meio: 3 toques. Ataque: Livre. Estimula a transição rápida e a objetividade no terço final.",
      videoQuery: "futsal conditioned games small sided"
    },
    {
      title: "Situação Real: Placar Adverso (Últimos 5 min)",
      description: "Simulação de final de jogo perdendo por 1 gol. Uso obrigatório de goleiro-linha ou pressão total. Foco em gestão emocional e rapidez de raciocínio.",
      videoQuery: "futsal match simulation pressure situations"
    },
    {
      title: "Coletivo com Foco em Transição Defensiva",
      description: "Jogo livre, mas cada vez que a equipe perde a bola, deve recompor abaixo da linha da bola em menos de 4 segundos. Punição (tiro livre) se não conseguir.",
      videoQuery: "futsal defensive transition training"
    }
  ]
};

export const generateTrainingDates = (startDate: string, endDate: string): string[] => {
  const dates: string[] = [];
  let curr = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");

  while (curr <= end) {
    const day = curr.getDay();
    if (day === 1 || day === 3) {
      dates.push(curr.toISOString().split('T')[0]);
    }
    curr.setDate(curr.getDate() + 1);
  }
  return dates;
};

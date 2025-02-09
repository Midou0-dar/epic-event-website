import { Trophy } from 'lucide-react';
import { clsx } from 'clsx';
import { supabase } from '../lib/supabase';

interface Team {
  id: string;
  name: string;
  score: number;
  room: number;
}

interface ScoreboardProps {
  room: number;
  teams: Team[];
  onScoreUpdate: (teamId: string, newScore: number) => void;
}

export function Scoreboard({ room, teams, onScoreUpdate }: ScoreboardProps) {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  const updateScore = async (teamId: string, increment: boolean) => {
    const team = sortedTeams.find(t => t.id === teamId);
    if (team) {
      const newScore = increment ? team.score + 1 : team.score - 1;
      const { error } = await supabase
        .from('teams')
        .update({ score: newScore })
        .eq('id', teamId);

      if (!error) {
        onScoreUpdate(teamId, newScore);
      } else {
        console.error('Error updating score:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Room {room}</h2>
        <Trophy className="h-6 w-6 text-yellow-500" />
      </div>
      <div className="space-y-4">
        {sortedTeams.map((team, index) => (
          <div
            key={team.id}
            className={clsx(
              'flex items-center justify-between p-4 rounded-lg transition-all duration-300',
              index === 0 ? 'bg-yellow-100' : 'bg-gray-50'
            )}
          >
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-600">
                #{index + 1}
              </span>
              <span className="text-lg font-medium text-gray-800">
                {team.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => updateScore(team.id, true)}>+</button>
              <span className="text-2xl font-bold text-indigo-600">{team.score}</span>
              <button onClick={() => updateScore(team.id, false)}>-</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

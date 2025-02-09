import { useEffect, useState } from 'react';
import { Scoreboard } from '../components/Scoreboard';
import { supabase } from '../lib/supabase';

interface Team {
  id: string;
  name: string;
  score: number;
  room: number;
}

export function Scores() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    // Initial fetch
    fetchTeams();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('teams')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'teams' },
        (payload) => {
          console.log('Change received!', payload);
          fetchTeams();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchTeams = async () => {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('room', { ascending: true });

    if (error) {
      console.error('Error fetching teams:', error);
      return;
    }

    setTeams(data);
  };

  const handleScoreUpdate = (teamId: string, newScore: number) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, score: newScore } : team
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Live Scores
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((room) => (
            <Scoreboard
              onScoreUpdate={handleScoreUpdate}
              key={room}
              room={room}
              teams={teams.filter((team) => team.room === room)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

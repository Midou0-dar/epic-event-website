/*
  # Create teams table for EPIC event

  1. New Tables
    - `teams`
      - `id` (uuid, primary key)
      - `name` (text, team name)
      - `score` (integer, current score)
      - `room` (integer, room number 1-3)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `teams` table
    - Add policies for:
      - Public read access
      - Authenticated users can update scores
*/

CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  score integer DEFAULT 0,
  room integer NOT NULL CHECK (room BETWEEN 1 AND 3),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON teams
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to update scores
CREATE POLICY "Allow authenticated users to update scores"
  ON teams
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial teams
INSERT INTO teams (name, room, score) VALUES
  ('Team spe', 1, 0),
  ('Team Beta', 1, 0),
  ('Team Gamma', 1, 0),
  ('Team Delta', 1, 0),
  ('Team Epsilon', 2, 0),
  ('Team Zeta', 2, 0),
  ('Team Eta', 2, 0),
  ('Team Theta', 2, 0),
  ('Team Iota', 3, 0),
  ('Team Kappa', 3, 0),
  ('Team Lambda', 3, 0),
  ('Team Mu', 3, 0)
ON CONFLICT DO NOTHING;
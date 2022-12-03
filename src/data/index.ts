export const MOCK_DATA = {
  PLAYERS_BIO: [
    {
      id: 2,
      first_name: "Andrzej",
      last_name: "Strzelba",
      main_position: "ST",
      nationality: "POL",
      current_club: "Korona Kielce",
      price: 500000,
      b_day: "1990-12-02",
      pref_foot: "left",
      weight: 85,
      height: 190,
    },
  ],

  PLAYER_TOTAL_STATS: [
    [
      {
        goals: 12,
        assists: 4,
        minutes: 686,
        yellow_cards: 2,
        red_cards: 1,
        wins: 4,
        draws: 4,
        losts: 1,
        team_goals_scored: 18,
        team_goals_lost: 14,
        team_goals_particip: 66.7,
        clean_defence: 1,
        goal_per_minutes: 57,
      },
      [
        { team_goals_participation: 66.7 },
        { clean_defence_participation: 11.1 },
        { won_matches_ratio: 44.4 },
        { lost_matches_ratio: 11.1 },
        { total_minutes_ratio: 84.7 },
      ],
    ],
  ],
};

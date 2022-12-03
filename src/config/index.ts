export const ENDPOINTS = {
  POST: {
    REGISTER: "/api/register",
  },

  GET: {
    GET_PLAYERS_BIO: "/data-science/api/players-bio/?format=json",
    GET_PLAYER_BIO: "/data-science/api/player-bio/:id/?format=json",
    GET_PLAYER_PANEL_DATA:
      "/data-science/api/player-total-stats/:id/:season/?format=json",
    GET_PLAYER_DETAILED_STATS:
      "/data-science/api/player-detail-stats/:id/:season/?format=json",
  },
};

export const FIELDS = {
  username: {
    min: 3,
    max: 30,
    regex: /^[a-zA-Z0-9._-]{3,30}$/,
  },

  password: {
    min: 8,
    max: 40,
    regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$/,
  },

  email: {
    min: 5,
    max: 320,
  },
};

export const DASHBOARD_RADAR_CHART_LABELS: string[] = [
  "Team goals participation",
  "Clean defence participation",
  "Won matches ratio",
  "Lost matches ratio",
  "Total minutes ratio",
];

export const DASHBOARD_RADAR_CHART_OPTIONS = {
  scales: {
    r: {
      pointLabels: {
        color: "#fff",
      },
      grid: {
        color: "#fff",
      },
      angleLines: {
        color: "#fff",
      },
    },
  },
};

export const HEATMAP_CHART_OPTIONS: ApexCharts.ApexOptions = {
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    heatmap: {
      colorScale: {
        ranges: [
          {
            from: -1,
            to: -0.5,
            color: "#6372c3",
            name: "From -1 to -0.5",
          },

          {
            from: -0.5,
            to: 0,
            color: "#acb4df",
            name: "From -0.5 to 0",
          },

          {
            from: 0,
            to: 0.5,
            color: "#acb4df",
            name: "From 0 to 0.5",
          },
          {
            from: 0.5,
            to: 1,
            color: "#6372c3",
            name: "From 0.5 to 1",
          },
        ],
      },
    },
  },
  theme: {
    mode: "dark",
  },
};

export const APIS = {
  API_V1: "http://192.168.1.190:3000/",
  API_V2: "https://hackathon-api-2.onrender.com",
};

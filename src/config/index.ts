export const ENDPOINTS = {
  POST: {
    REGISTER: "/api/register",
  },

  GET: {},
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

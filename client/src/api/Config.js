const PORT = process.env.REACT_APP_PORT;
const ENV = process.env.REACT_APP_ENV;

export const URL =
  ENV == "development"
    ? "https://packt-project-development.herokuapp.com"
    : ENV == "production"
    ? "https://packt-project.herokuapp.com"
    : `http://localhost:${PORT}`;

export const API_KEY = "6de18130-637f-4c38-ac3e-81f18c8251d7";

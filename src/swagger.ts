import swaggerAutogen from 'swagger-autogen';


const doc = {
  info: {
    title: 'API de Inscripciones Académicas',
    description: 'Documentación de la API REST del MP-S2',
    version:"1.0.0",
  },
  host: "https://n1z6p03m-3000.brs.devtunnels.ms",
  basePath: "/",
  schemes: ["https"],
};


const outputFile = './swagger_output.json';
const routes = ['./src/index.ts'];

swaggerAutogen()(outputFile, routes, doc);


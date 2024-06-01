import swaggerJSDoc, { SwaggerDefinition, Options } from 'swagger-jsdoc';

const options: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'DAR Express API with Swagger',
      version: '1.0.0',
      description:
        'A simple CRUD API application made with Express and documented with Swagger',
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
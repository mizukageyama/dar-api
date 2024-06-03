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
    components: {
      securitySchemes: {
        Authorization: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          value: 'Bearer <JWT token here>',
        },
      },
    },
  },
  apis: [
    './src/api/auth/v1/auth.swagger.ts',
    './src/api/users/v1/user.swagger.ts',
    './src/api/tasks/v1/task.swagger.ts',
    './src/api/dar/v1/dar.swagger.ts',
    './src/api/notes/v1/note.swagger.ts',
  ],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;

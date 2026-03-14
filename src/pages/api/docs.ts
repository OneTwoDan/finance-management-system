import { withSwagger } from 'next-swagger-doc';

const swaggerHandler = withSwagger({
  openApiVersion: '3.0.0',
  title: 'Finance Management System API',
  version: '1.0',
  apiFolder: 'src/pages/api',
});

export default swaggerHandler();

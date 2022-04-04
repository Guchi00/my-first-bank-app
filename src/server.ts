import http from 'http';

import app from './app';
import { initializeDB } from './database';


const port = process.env.PORT || 3006;

const server = http.createServer(app);

initializeDB();

server.listen(port, () => {
  console.log(`Bank app listening on port: ${port}`);
});

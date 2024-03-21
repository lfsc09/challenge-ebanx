import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import { handleApiConfigCors, handleApiErrors } from './infra/middlewares/ApiMiddlewares';

const serverInit = async (listeningPort: number = 5000) => {
    const server = express();

	/********************************
	 * CONFIGURE HEADERS AND REQUEST
	 ********************************/
	server.use(handleApiConfigCors);
	server.use(bodyParser.json());

	/********************
	 * GRAB ASYNC ERRORS
	 ********************/
	server.use(handleApiErrors);

	const httpServer = http.createServer(server);
	httpServer.listen(listeningPort);
	console.log(`HTTP server start at: ${listeningPort}`);
};

serverInit();

import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import { handleApiConfigCors, handleApiErrors } from './infra/middlewares/ApiMiddlewares';
import { ApiRepositoryMemory } from './infra/repositories/memory/ApiRepository';
import ApiRoutes from './infra/routes/ApiRoutes';

export interface CustomRequest extends Request {
    [key: string]: any;
}

const serverInit = async (listeningPort: number = 5000) => {
    const server = express();
    let accountManager = new Map();
    let apiRepositoryMemory = new ApiRepositoryMemory(accountManager);

	/********************************
	 * CONFIGURE HEADERS AND REQUEST
	 ********************************/
	server.use(handleApiConfigCors);
	server.use(bodyParser.json());
    server.use((request: CustomRequest, response: Response, next: NextFunction) => {
        request['apiRepositoryMemory'] = apiRepositoryMemory;
        next();
    });

    /*********
     * ROUTES
     *********/
    server.use(ApiRoutes);
    
	/********************
	 * GRAB ASYNC ERRORS
	 ********************/
	server.use(handleApiErrors);

	const httpServer = http.createServer(server);
	httpServer.listen(listeningPort);
	console.log(`HTTP server start at: ${listeningPort}`);
};

serverInit();

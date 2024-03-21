import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../core/exceptions/ApiError';

/**
 * Handles adding to @param request, information for CORS
 */
export const handleApiConfigCors = (request: Request, response: Response, next: NextFunction) => {
	response.setHeader('Access-Control-Allow-Origin', process.env.API_URL ?? '');
	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
};

/**
 * Handle generation of @param response of errors thrown from deeper layers
 */
export const handleApiErrors = (error: ApiError, request: Request, response: Response, next: NextFunction): void => {
	response.status(error.code).send(error.message);
};

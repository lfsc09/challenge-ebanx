import { Router } from 'express';
import { ApiController } from '../controllers/ApiController';

const router = Router();

/****************
 * PUBLIC ROUTES
 ****************/
router.post('/event', ApiController.event);

export default router;

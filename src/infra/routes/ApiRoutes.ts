import { Router } from 'express';
import { ApiController } from '../controllers/ApiController';

const router = Router();

/****************
 * PUBLIC ROUTES
 ****************/
router.post('/reset', ApiController.reset);
router.post('/event', ApiController.event);

export default router;

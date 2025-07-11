import { Router } from 'express';
import { HealthCheck } from '../controllers/index';

const router = Router();

// Health check route
router.get('/health', HealthCheck);

export default router;

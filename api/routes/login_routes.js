import { Router } from 'express';
import { handle_login, whoAreYou } from '../controllers/loginController.js';
const router = Router();

router.post('/handler', handle_login);
router.get('/favicon.ico', whoAreYou);

export default router;
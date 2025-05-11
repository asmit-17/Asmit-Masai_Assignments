const express = require('express');
const TicketController = require('../controllers/ticketController');
const dataCheck = require('../middlewares/dataCheckMiddleware');
const router = express.Router();

router.get('/tickets', TicketController.getAllTickets);
router.get('/tickets/:id', TicketController.getTicketById);
router.post('/tickets', dataCheck, TicketController.createTicket);
router.put('/tickets/:id', TicketController.updateTicket);
router.delete('/tickets/:id', TicketController.deleteTicket);
router.patch('/tickets/:id/resolve', TicketController.resolveTicket);

module.exports = router;
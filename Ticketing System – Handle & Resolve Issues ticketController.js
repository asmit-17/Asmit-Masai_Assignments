const TicketModel = require('../models/ticketModel');

class TicketController {
  static async getAllTickets(req, res) {
    try {
      const tickets = await TicketModel.getAll();
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve tickets' });
    }
  }

  static async getTicketById(req, res) {
    try {
      const { id } = req.params;
      const ticket = await TicketModel.getById(id);
      if (ticket) {
        res.status(200).json(ticket);
      } else {
        res.status(404).json({ error: 'Ticket not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve ticket' });
    }
  }

  static async createTicket(req, res) {
    try {
      const newTicket = await TicketModel.create(req.body);
      res.status(201).json(newTicket);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create ticket' });
    }
  }

  static async updateTicket(req, res) {
    try {
      const { id } = req.params;
      const updatedTicket = await TicketModel.update(id, req.body);
      if (updatedTicket) {
        res.status(200).json(updatedTicket);
      } else {
        res.status(404).json({ error: 'Ticket not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update ticket' });
    }
  }

  static async deleteTicket(req, res) {
    try {
      const { id } = req.params;
      const deleted = await TicketModel.delete(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Ticket not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete ticket' });
    }
  }

  static async resolveTicket(req, res) {
    try {
      const { id } = req.params;
      const resolvedTicket = await TicketModel.resolve(id);
      if (resolvedTicket) {
        res.status(200).json(resolvedTicket);
      } else {
        res.status(404).json({ error: 'Ticket not found or already resolved' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to resolve ticket' });
    }
  }
}

module.exports = TicketController;
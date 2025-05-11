const fs = require('fs').promises;
const path = require('path');

const dbFilePath = path.join(__dirname, '../db.json');

class TicketModel {
  static async getAll() {
    try {
      const data = await fs.readFile(dbFilePath, 'utf8');
      const { tickets } = JSON.parse(data);
      return tickets;
    } catch (error) {
      console.error('Error reading tickets:', error);
      throw error;
    }
  }

  static async getById(id) {
    const tickets = await this.getAll();
    return tickets.find(ticket => ticket.id === parseInt(id));
  }

  static async create(newTicket) {
    const tickets = await this.getAll();
    const id = tickets.length > 0 ? Math.max(...tickets.map(ticket => ticket.id)) + 1 : 1;
    const ticket = { id, status: 'pending', ...newTicket };
    tickets.push(ticket);
    await this.save(tickets);
    return ticket;
  }

  static async update(id, updatedFields) {
    let tickets = await this.getAll();
    const ticketIndex = tickets.findIndex(ticket => ticket.id === parseInt(id));

    if (ticketIndex !== -1) {
      tickets[ticketIndex] = { ...tickets[ticketIndex], ...updatedFields };
      await this.save(tickets);
      return tickets[ticketIndex];
    }
    return null;
  }

  static async delete(id) {
    let tickets = await this.getAll();
    const initialLength = tickets.length;
    tickets = tickets.filter(ticket => ticket.id !== parseInt(id));
    if (tickets.length < initialLength) {
      await this.save(tickets);
      return true;
    }
    return false;
  }

  static async resolve(id) {
    let tickets = await this.getAll();
    const ticketIndex = tickets.findIndex(ticket => ticket.id === parseInt(id));

    if (ticketIndex !== -1 && tickets[ticketIndex].status === 'pending') {
      tickets[ticketIndex] = { ...tickets[ticketIndex], status: 'resolved' };
      await this.save(tickets);
      return tickets[ticketIndex];
    }
    return null;
  }

  static async save(tickets) {
    try {
      await fs.writeFile(dbFilePath, JSON.stringify({ tickets }, null, 2), 'utf8');
    } catch (error) {
      console.error('Error saving tickets:', error);
      throw error;
    }
  }
}

module.exports = TicketModel;
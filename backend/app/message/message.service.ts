import prisma from "../common/services/database.service";

class MessageService {
  async getMessages(conversationId: string) {
    return prisma.message.findMany({ where: { conversationId } });
  }

  async sendMessage(conversationId: string, senderId: string, body: string) {
    return prisma.message.create({ data: { conversationId, senderId, body } });
  }
}

export default new MessageService();

import MessageService from "./message.service";

class MessageController {
  async getMessages(_: any, { conversationId }: any) {
    return MessageService.getMessages(conversationId);
  }

  async sendMessage(_: any, { conversationId, senderId, body }: any, { pubsub }: any) {
    const newMessage = await MessageService.sendMessage(conversationId, senderId, body);
    pubsub.publish(`MESSAGE_${conversationId}`, { messageSent: newMessage });
    return newMessage;
  }
}

export default new MessageController();

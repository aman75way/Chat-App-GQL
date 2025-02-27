import prisma from "../common/services/database.service";
import { Context } from "../common/services/context.service";
import {context} from "../common/services/context.service";

export const messageResolvers = {
  Query: {
    getMessages: async (_: any, { userToChatId }: any, context : Context) => {
      const user = context.user;
      if (!user) throw new Error("Unauthorized");

      const senderId = user.userId;

      const conversation = await prisma.conversation.findFirst({
        where: {
            participantIds: {
                hasEvery: [senderId, userToChatId],
            },
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc",
                },
            },
        },
    });

    return conversation ? conversation.messages : [];
    },

    conversations: async (_: any, __: any, context : Context) => {
      const user = context.user;
      if (!user) throw new Error("Unauthorized");

      return await prisma.user.findMany({
        where: {
            id: {
                not: user.userId,
            },
        },
        select: {
            id: true,
            fullName: true,
            profilePic: true,
        },
    });
    },
  },

  Mutation: {
    sendMessage: async (_parent: any, { receiverId, message }: any, context : Context) => {
      const user = context.user;

      if (!user) throw new Error("Unauthorized");

      const senderId = context.user?.userId;
      if (!senderId) throw new Error("Sender ID is undefined");

      console.log("Sender ID:", senderId);
      console.log("Receiver ID:", receiverId);

      let conversation = await prisma.conversation.findFirst({
        where: {
          participantIds: { hasEvery: [senderId, receiverId] },
        },
      });

      if (!conversation) {
        conversation = await prisma.conversation.create({
          data: {
            participantIds: { set: [senderId, receiverId] },
          },
        });
      }

      const newMessage = await prisma.message.create({
        data: {
          senderId,
          body: message,
          conversationId: conversation.id,
        },
      });

      await prisma.conversation.update({
        where: { id: conversation.id },
        data: { messages: { connect: { id: newMessage.id } } },
      });

      return newMessage;
    },
  },
};

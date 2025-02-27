import { useMutation } from "@apollo/client";
import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { SEND_MESSAGE_MUTATION } from "../api"; // Import from centralized API

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const [sendMessageMutation] = useMutation(SEND_MESSAGE_MUTATION);

  const sendMessage = async (message: string) => {
    if (!selectedConversation) return;
    setLoading(true);

    try {
      const { data } = await sendMessageMutation({
        variables: {
          conversationId: selectedConversation.id,
          text: message,
        },
      });

      if (!data || !data.sendMessage) throw new Error("Failed to send message");

      setMessages([...messages, data.sendMessage]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;

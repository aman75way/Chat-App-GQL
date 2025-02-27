import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "../api"; // Import the query
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { messages, setMessages, selectedConversation } = useConversation();

  // Polling every 5 seconds to check for new messages
  const { data, refetch } = useQuery(GET_MESSAGES, {
    variables: { conversationId: selectedConversation?.id },
    skip: !selectedConversation, // Skip if no conversation is selected
    pollInterval: 5000, // Poll every 5 seconds
    onError: () => {
      toast.error("Failed to fetch messages!");
    },
  });

  useEffect(() => {
    if (data?.messages) {
      // Compare and add only new messages
      if (data.messages.length > messages.length) {
        const newMessages = data.messages.slice(messages.length);
        newMessages.forEach((msg: any) => (msg.shouldShake = true));

        // Play notification sound
        const sound = new Audio(notificationSound);
        sound.play();

        setMessages([...messages, ...newMessages]);
      }
    }
  }, [data, messages, setMessages]);

  return { refetch }; // Optionally expose refetch for manual refresh
};

export default useListenMessages;

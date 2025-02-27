import { useQuery } from "@apollo/client";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { GET_MESSAGES } from "../api";

const useGetMessages = () => {
  const { messages, setMessages, selectedConversation } = useConversation();

  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { userToChatId: selectedConversation?.id },
    // skip: !selectedConversation,
    onError: (err) => {
      console.error("Error fetching messages:", err.message);
      toast.error("Failed to load messages!");
    },
  });

  // Update messages state when new data is received
  if (data && data.messages !== messages) {
    setMessages(data.messages);
  }

  return { messages, loading, error };
};

export default useGetMessages;

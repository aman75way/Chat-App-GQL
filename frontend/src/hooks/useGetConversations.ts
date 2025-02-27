import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { GET_CONVERSATIONS } from "../api";

const useGetConversations = () => {
  const { data, loading, error } = useQuery(GET_CONVERSATIONS, {
    onError: (err) => {
      console.error("Error fetching conversations:", err.message);
      toast.error("Failed to load conversations!");
    },
  });

  return {
    conversations: data?.conversations || [],
    loading,
    error,
  };
};

export default useGetConversations;

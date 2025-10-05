import { Message } from "@/types/api";

const MessageItems = ({ message }: { message: Message }) => {
  return <>{message.message}</>;
};

export default MessageItems;


export type Message = {
  id: string;            
  sender: "user" | "bot";
  text: string;
  timestamp: string;     
};

 export type ChatWindowProps = {
  activeUser: { user_name: string; user_avatar: string; chat_key?: string };
  messages: Message[];
  onSend: (text: string) => void;
};
export type ChatProfilesProps = {
  activeChat: string;
  onSelectChat: (chatId: string) => void;
};

export type ChatHeaderProps = {
  userName: string;
  avatar: string;
};

export type ChatInputProps = {
  onSend: (message: string) => void;
};

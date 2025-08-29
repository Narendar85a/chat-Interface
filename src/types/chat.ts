export type FlatMessage = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

export type ChatUser = {
  user_id: string;
  user_name: string;
  user_avatar: string;
  chat_key: string;
};

export type ChatWindowProps = {
  activeUser: ChatUser;
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

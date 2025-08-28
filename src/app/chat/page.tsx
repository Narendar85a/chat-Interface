import ChatProfiles from "@/components/chat/ChatProfiles";
import ChatWindow from "@/components/chat/ChatWindow";

export default function Chat() {
  return (
    <div className="flex h-[calc(100vh-3rem)]"> 
    
      <div className="w-1/4 border-r">
        <ChatProfiles />
      </div>

      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  );
}

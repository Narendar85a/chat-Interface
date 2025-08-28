import avatarsData from "@/data/avatar_data.json";

export default function ChatProfiles() {
  return (
    <div className="p-4 flex flex-col gap-4">
      {avatarsData.avatars.map((user) => (
        <div key={user.user_id} className="flex items-center gap-3">
          <img
            src={user.user_avatar}
            alt={user.user_name}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">{user.user_name}</span>
        </div>
      ))}
    </div>
  );
}

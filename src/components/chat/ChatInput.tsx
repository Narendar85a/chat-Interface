import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ChatInput(){
    return(
        <div className="flex">
            <Input/>
            <Button>Send</Button>
        </div>
    )
}
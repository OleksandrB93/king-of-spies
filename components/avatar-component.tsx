import { signOut } from "@/auth";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button>Sign out</button>
    </form>
  );
}

interface IAvatarProps {
  ava: string;
  alt: string;
  email: string | undefined | null;
}
const AvatarComponent = ({ ava, alt, email }: IAvatarProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="p-0">
          <Avatar  className="my-auto">
            <AvatarImage src={ava} alt={alt} />
          </Avatar>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col items-center">
          <Avatar>
            <AvatarImage src={ava} alt={alt} />
          </Avatar>
          <div className="space-y-1 text-center">
            <h4 className="text-sm font-semibold">{alt}</h4>
            <p className="text-sm">{email}</p>
          </div>
          <div className="mt-3 border border-1 px-2 py-1 bg-stone-800 text-white rounded-md">
            <SignOut />
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AvatarComponent;

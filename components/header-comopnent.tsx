import Link from "next/link";
import AvatarComponent from "./avatar-component";
import { Button } from "./ui/button";
import { auth } from "@/auth";
import SidebarComponent from "./sidebar-comopnent";
import NewGameBtnComponent from "./new-game-btn-component";

const HeaderComponent = async () => {
  const session = await auth();

  return (
    <header className="flex justify-between items-center my-1">
      <SidebarComponent />
      <NewGameBtnComponent />
      {session?.user ? (
        <div>
          {session.user.name && session.user.image && (
            <>
              <AvatarComponent
                ava={session.user.image}
                alt={session.user.name}
                email={session.user.email}
              />
            </>
          )}
        </div>
      ) : (
        <div>
          <Link href="/api/auth/signin">
            <Button variant={"default"}>Sign in</Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;

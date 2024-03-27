import { User } from "@prisma/client";

interface IPlayerCardProps {
  user: User;
}

const PlayerCard = ({ user }: IPlayerCardProps) => {
  return (
    <div
      className="w-48 h-80 p-3 bg-foreground rounded-md text-background"
      key={user.id}
    >
      <img
        className="mx-auto rounded-full"
        src={user.image ? user.image : ""}
        alt={user.name}
      />
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.rating}</p>
      <p>{user.given_name}</p>
      <p>{user.family_name}</p>
    </div>
  );
};

export default PlayerCard;

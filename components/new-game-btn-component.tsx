import Link from "next/link";
import { Button } from "./ui/button";

const NewGameBtnComponent = () => {

  return (
    <Button variant="outline">
      <Link href="/game">Start Game</Link>
    </Button>
  );
};

export default NewGameBtnComponent;

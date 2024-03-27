import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import AddPlayerComponent from "./add-player-component";
import { ListInvitaionComponent } from "./list-invitaion-component";
import { useCreateGameMutation } from "@/hooks/use-create-game";
import { useAddPlayer } from "@/hooks/useAddPlayer";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CreateGameComponent = () => {
  const { players } = useAddPlayer();
  const router = useRouter();

  const formSchema = z.object({
    numberOfSpies: z.string(),
    playerEmails: z.array(z.string()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfSpies: "0",
      playerEmails: players,
    },
  });

  const onSubmit = async (values: any) => {
    values.numberOfSpies = Number(values.numberOfSpies);
    const { game } = await mutateAsync(values);

    router.push(`/game/${game.id}`);
  };

  // add emails array to form
  useEffect(() => {
    form.setValue("playerEmails", players);
  }, [players]);

  const { mutateAsync, isSuccess, isError } = useCreateGameMutation();

  return (
    <div>
      <div className="flex">
        <AddPlayerComponent />
      </div>
      <div className="flex justify-between">
        <Form {...form}>
          <form className="w-3/4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="numberOfSpies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of spies</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Number of spies"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the number of spies you want to play with
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
        <ListInvitaionComponent />
      </div>
    </div>
  );
};

export default CreateGameComponent;

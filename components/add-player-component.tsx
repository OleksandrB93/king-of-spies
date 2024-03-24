import { CirclePlus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAddPlayer } from "@/hooks/useAddPlayer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import prismadb from "@/lib/prismadb";

const AddPlayerComponent = () => {
  const { players, addPlayer } = useAddPlayer();

  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values) {
      addPlayer(values.email);
    }
    form.reset();
  };

  const getAllUsers = async () => {
    const users = await prismadb.user.findMany();
    console.log(users);
    return users;
  };
  getAllUsers();
  return (
    <div>
      <ul className="flex flex-wrap gap-4">
        {players.map((player, index) => (
          <li
            className="w-40 h-72 bg-foreground border border-1 rounded-md flex flex-wrap justify-center items-end"
            key={index}
          >
            <p className="text-center text-sm text-background">{player}</p>
          </li>
        ))}
        <li className="w-40 h-72 bg-foreground/50  border border-1 rounded-md  justify-center items-end">
          <Popover>
            <PopoverTrigger>
              <div className="w-40 h-72 flex justify-center items-center">
                <div>
                  <CirclePlus color="black" size={70} />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Form {...form}>
                <form
                  className="flex gap-x-4 items-end"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="absolute top-[49px] right-4">
                    <CirclePlus color="black" />
                  </Button>
                </form>
              </Form>
            </PopoverContent>
          </Popover>
        </li>
      </ul>
    </div>
  );
};

export default AddPlayerComponent;

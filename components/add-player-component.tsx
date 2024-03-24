"use serve";
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
import { useUsers } from "@/hooks/use-user-query";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";

const AddPlayerComponent = () => {
  const { players, addPlayer } = useAddPlayer();
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, isError } = useUsers();

  const formSchema = z.object({
    email: z.string().email(" "),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  //todo: maybe delete this
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // if (values) {
    //   addPlayer(values.email);
    // }
    // form.reset();
  };

  useEffect(() => {
    searchUsers(searchValue);
  }, [searchValue]);

  const searchUsers = (query: string) => {
    const filteredUsers = (data?.users || []).filter(
      (user: { email: string }) =>
        user.email.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredUsers);
  };

  return (
    <div>
      <ul className="flex flex-wrap gap-4">
        {players.map((email, index) => (
          <li
            className="w-40 h-72 bg-foreground border border-1 rounded-md flex flex-wrap justify-center items-end"
            key={index}
          >
            <p className="text-center text-sm text-background">{email}</p>
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
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setSearchValue(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <ul className="absolute top-[82%] left-[6%]">
                    {searchResults.map((user: User) => (
                      <li
                        className="group w-[276px] px-2 py-1 hover:bg-background transition bg-foreground border border-1 rounded-md flex flex-wrap justify-center"
                        key={user.id}
                        onClick={() => {
                          addPlayer(user.email);
                          form.reset();
                        }}
                      >
                        <p className="text-center text-sm text-background group-hover:text-foreground transition">
                          {user.email}
                        </p>
                      </li>
                    ))}
                  </ul>
                  {/* // todo!: maybe need delete this button */}
                  {/* <Button className="absolute top-[49px] right-4">
                    <CirclePlus color="black" />
                  </Button> */}
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

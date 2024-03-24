import { z } from "zod";

export const createGameDto = z.object({
    numberOfSpies: z.number(),
    players: z.array(z.string()),
})
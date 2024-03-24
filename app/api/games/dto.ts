import { z } from "zod";

export const createGameDto = z.object({
    numberOfSpies: z.number(),
    playerEmails: z.array(z.string()),
})
import { z } from "zod";

export const env = z
  .object({
    NEXT_PUBLIC_YT_API_KEY: z.string(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string(),
  })
  .parse(process.env);

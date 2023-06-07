import { Handler } from "$fresh/server.ts";

interface Props {
  temp: string;
}

export const handler: Handler<Props> = {
  async GET(req: Request, ctx) {
    console.log(req.url);
  },
};

export default function Post() {}

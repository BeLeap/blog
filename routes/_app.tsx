import { AppProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";

const App = ({ Component }: AppProps) => {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/global.css" />
        <title>BeLeap Blog</title>
      </head>
      <body class="h-screen w-screen">
        <Header />
        <div class="px-4 mb-16 min-h-[80%] grid grid-cols-3 grid-rows-1 gap-4">
          <div class="h-full col-span-3 lg:col-span-2">
            <Component />
          </div>
          <div>
            Lorem Ipsum
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
};
export default App;

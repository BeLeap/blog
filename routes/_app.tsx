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
        <title>BeLeap</title>
      </head>
      <body class="h-screen w-screen">
        <div class="px-4 mb-16 grid grid-cols-4 auto-rows-auto gap-4 justify-items-center">
          <div class="max-w-4xl w-full col-start-1 col-span-4 row-start-1 row-span-1 md:col-span-3 xl:col-start-2 xl:col-span-2">
            <Header />
          </div>
          <div class="max-w-7xl w-full col-start-1 col-span-4 row-start-2 row-span-7 md:col-span-3 xl:col-start-2 xl:col-span-2">
            <Component />
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
};
export default App;

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
        <div class="px-4 mb-16 grid grid-cols-4 grid-rows-8 gap-4">
          <div class="col-span-3 row-span-1 lg:col-start-2 lg:col-span-2">
            <Header />
          </div>
          <div class="col-span-3 row-span-7 lg:col-start-2 lg:col-span-2">
            <Component />
          </div>
          <div class="row-span-2">
            Lorem Ipsum
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
};
export default App;

import { Head, Link } from "aleph/react";

export default function E404() {
  return (
    <>
      <Head>
        <title>BeLeap Blog - 404 Not Found</title>
      </Head>
      <h2>
        Ooooooops, nothing here!
      </h2>
      <p>
        <Link to="/">
          Go back to the homepage
        </Link>
      </p>
    </>
  );
}

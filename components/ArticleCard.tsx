import { Metadata } from "../types/articles.ts";

const ArticleCard = ({ path, title, time, summary }: Metadata) => {
  return (
    <a
      href={`/${path}`}
      className={"flex flex-col w-[50%] m-2 gap-4"}
    >
      <div className={"flex justify-between"}>
        <h2 className={"text-xl text-white text-bold"}>
          {title}
        </h2>
        <time
          dateTime={time.toISOString()}
        >
          {`${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`}
        </time>
      </div>
      <p>
        {summary}
      </p>
    </a>
  );
};
export default ArticleCard;

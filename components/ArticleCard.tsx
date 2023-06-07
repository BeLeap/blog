import { Metadata } from "../types/articles.ts";

const ArticleCard = ({ path, title, time, summary }: Metadata) => {
  return (
    <a
      href={`/${path}`}
      className={`flex flex-col m-2 p-4 gap-4 rounded-2xl border`}
    >
      <div className={"flex justify-between"}>
        <h2 className={`text-xl text-black font-bold`}>
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

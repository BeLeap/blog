import { Metadata } from "../types/articles.ts";

const ArticleCard = ({ path, title, time, summary }: Metadata) => {
  return (
    <div
      className={`flex flex-col m-2 p-4 gap-4 rounded-2xl border border-gray-400 bg-white`}
    >
      <div className={"flex justify-between gap-4"}>
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
      <a
        href={`/${path}`}
        className={"text-blue-600 text-underline hover:text-blue-900"}
      >
        {"Read More"}
      </a>
    </div>
  );
};
export default ArticleCard;

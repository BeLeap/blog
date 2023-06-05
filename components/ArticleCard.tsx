import { Metadata } from "../types/articles.ts";
import * as mocha from "../consts/mocha.ts";

const ArticleCard = ({ path, title, time, summary }: Metadata) => {
  return (
    <a
      href={`/${path}`}
      className={`flex flex-col w-[50%] h-full m-2 p-4 gap-4 bg-[${mocha.Overlay0}] rounded-2xl text-[${mocha.Surface0}]`}
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

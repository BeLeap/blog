type Props = {
  title: string;
  time: Date;
};

const ArticleCard = ({ title, time }: Props) => {
  return (
    <div className={"flex flex-col w-[50%] m-2"}>
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
    </div>
  );
};
export default ArticleCard;

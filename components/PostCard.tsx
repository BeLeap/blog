import Time from "../islands/Time.tsx";

export interface Props {
  title: string;
  summary: string;
  publishedAt: Date;
  link: string;
}

const PostCard = ({ title, summary, publishedAt, link }: Props) => {
  return (
    <div class="shadow-md rounded-lg m-4 p-4">
      <h1 class="text-2xl font-extrabold mb-2">{title}</h1>
      <div class="mb-8">
        Published at <Time isoString={publishedAt.toISOString()} />
      </div>
      <div class="text-xl mb-4">{summary}</div>
      <a class="font-bold hover:text-gray-400" href={link}>CONTINUE READING</a>
    </div>
  );
};
export default PostCard;

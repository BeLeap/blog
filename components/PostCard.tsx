export interface Props {
  title: string;
  summary: string;
  link: string;
}

const PostCard = ({ title, summary, link }: Props) => {
  return (
    <div>
      <h1 class="text-2xl font-extrabold">{title}</h1>
      <div>{summary}</div>
      <a href={link}>Continue Reading</a>
    </div>
  );
};
export default PostCard;

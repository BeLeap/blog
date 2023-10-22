export interface Props {
  title: string;
  summary: string;
  link: string;
}

const PostCard = ({ title, summary, link }: Props) => {
  return (
    <div>
      <h1>{title}</h1>
      <summary>{summary}</summary>
      <a href={link}>Continue Reading</a>
    </div>
  );
};
export default PostCard;

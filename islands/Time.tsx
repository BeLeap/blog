export interface Props {
  isoString: string;
}

const Time = ({ isoString }: Props) => {
  const date = new Date(isoString);

  return (
    <time datetime={isoString}>
      {new Intl.DateTimeFormat(navigator.language).format(date)}
    </time>
  );
};
export default Time;

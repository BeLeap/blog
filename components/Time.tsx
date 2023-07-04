import { useState, useEffect } from "react";

const Time = ({ className, time }: { className: string, time: Date }) => {
 	const [hydrated, setHydrated] = useState(false);
	useEffect(() => {
		setHydrated(true);
	}, []);

	if (!hydrated) {
		return null;
	}

  return (
    <time className={className} dateTime={time.toISOString()}>
      {`${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`}
    </time>
  )
}
export default Time;

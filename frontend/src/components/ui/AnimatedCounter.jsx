import { useEffect, useState } from "react";

export default function AnimatedCounter({
  value = 0,
  suffix = "",
  duration = 1500,
}) {
  const end = Number(value) || 0;
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const frames = Math.max(1, Math.floor(duration / 16));
    const increment = end / frames;

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}
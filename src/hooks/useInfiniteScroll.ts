import { useEffect } from "react";

export function useInfiniteScroll(callback: () => void, hasMore: boolean) {
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore) return;

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, hasMore]);
}

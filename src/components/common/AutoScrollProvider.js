import { createContext, useContext } from "react";
import useAutoScroll from "../../hooks/useAutoScroll";

const AutoScrollContext = createContext();
export const useAutoScrollContext = () => useContext(AutoScrollContext);

export default function AutoScrollProvider({
  children,
  preventScrollTime,
  isHorizontalScroll,
  lastViewedId,
}) {
  const autoScrollProps = useAutoScroll({
    preventScrollTime,
    isHorizontalScroll,
    lastViewedId,
  });
  return (
    <AutoScrollContext.Provider value={autoScrollProps}>
      {children}
    </AutoScrollContext.Provider>
  );
}

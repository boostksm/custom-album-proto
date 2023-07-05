import { styled } from "styled-components";
import { ScrollBar } from "../../styles/mixins";
import { useAutoScrollContext } from "./AutoScrollProvider";

const AutoScrollBoxLayout = styled.div`
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  scrollbar-gutter: stable both-edges;
  ${ScrollBar(10, 10)}
`;

export default function AutoScrollBox({ children }) {
  const { scrollableRef } = useAutoScrollContext();
  return (
    <AutoScrollBoxLayout ref={scrollableRef}>{children}</AutoScrollBoxLayout>
  );
}

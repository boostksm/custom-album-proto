import { useCallback } from "react";
import { styled } from "styled-components";
import { useAutoScrollContext } from "./AutoScrollProvider";

const AutoScrollItemLayout = styled.div`
  height: 100%;
`;

export default function AutoScrollItem({ children, itemId }) {
  const {
    itemProps: { itemNodes, updateObserver },
  } = useAutoScrollContext();
  const callbackRef = useCallback(
    (node) => {
      if (!node) {
        itemNodes.current.delete(itemId);
      } else {
        itemNodes.current.set(itemId, node);
      }
      updateObserver();
    },
    [updateObserver]
  );
  return (
    <AutoScrollItemLayout ref={callbackRef} data-item-id={itemId}>
      {children}
    </AutoScrollItemLayout>
  );
}

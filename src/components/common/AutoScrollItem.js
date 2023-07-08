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
        // 리렌더링이 일어나도, 기존 dom node에 전달된 ref의 참조가 동일하게 유지되기 때문에 콜백이 실행되지 않는다
        // console.log("unmount -> ref removed"); // 언마운트 될 경우만 실행됨
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

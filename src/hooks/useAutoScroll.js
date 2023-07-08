import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// IntersectionObserver와 scrollIntoView를 통해 자동스크롤 기능을 제공하는 hook
export default function useAutoScroll({
  preventScrollTime = 2000, //scroll을 차단할 시간
  isHorizontalScroll = false, // scroll 방향(overflow-y/overflow-x)
  lastViewedId, // 마지막으로 viewed된 요소의 itemId
}) {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollableRef = useRef(null);
  const itemNodes = useRef(new Map());
  const [viewedItemId, setViewedItemId] = useState(lastViewedId);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledTemp, setIsDisabledTemp] = useState(false);
  const observer = useRef(null);

  const isObserving = useMemo(
    () => !isDisabled && !isDisabledTemp,
    [isDisabled, isDisabledTemp]
  );

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setViewedItemId(entry.target.dataset.itemId);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );
  }, []);

  const updateObserver = useCallback(() => {
    if (!observer.current) return;
    [...itemNodes.current].forEach(([itemId, node]) => {
      isObserving
        ? observer.current.observe(node)
        : observer.current.unobserve(node);
    });
  }, [isObserving]);

  useEffect(() => {
    updateObserver();
  }, [isObserving]);

  useEffect(() => {
    if (!scrollableRef.current) return;
    const scrollToViewedItem = () => {
      setIsScrolling(true);
      scrollableRef.current.style[
        isHorizontalScroll ? "overflow-x" : "overflow-y"
      ] = "hidden"; // scroll 차단
      itemNodes.current
        .get(viewedItemId)
        ?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        scrollableRef.current.style[
          isHorizontalScroll ? "overflow-x" : "overflow-y"
        ] = "auto";
        setIsScrolling(false);
      }, preventScrollTime);
    };
    scrollToViewedItem();
  }, [isHorizontalScroll, preventScrollTime, viewedItemId]);

  const processingCnt = useRef(0);

  const scrollIntoViewWithoutPhase = (itemId) => {
    if (isDisabled) return;
    if (itemId === viewedItemId) return;
    processingCnt.current++;
    setIsDisabledTemp(true);
    setViewedItemId(itemId);
    setTimeout(() => {
      processingCnt.current--;
      if (processingCnt.current === 0) setIsDisabledTemp(false);
    }, preventScrollTime);
  };

  return {
    scrollableRef, //AutoScrollBox에 연결할 ref
    itemProps: { itemNodes, updateObserver }, // AutoScrollItem에서 사용할 props
    viewedItemId, // 자동스크롤을 통해 보여진, 혹은 보여질 AutoScrollItem의 itemId
    isScrolling, // 자동스크롤이 진행되고 있는 상태이자, 사용자의 스크롤이 차단된 상태
    scrollIntoViewWithoutPhase, // 인자로 넘긴 itemId를 가진 AutoScrollItem으로 자동스크롤 해주는 함수
    isDisabled, // 자동스크롤 해제 여부
    setIsDisabled, // 자동스크롤 해제 여부 변경 함수
  };
}

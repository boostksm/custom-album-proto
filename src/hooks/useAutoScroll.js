import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// IntersectionObserver와 scrollIntoView를 통해 순차적인 자동스크롤 기능을 제공하는 hook
export default function useAutoScroll({
  preventScrollTime = 2000, //scroll을 차단할 시간
  isHorizontalScroll = false, // overflow-y인지 overflow-x인지
  lastViewedId, // 마지막으로 viewed된 요소의 itemId (이 경우, 재생중이었던 전역 노래 id)
}) {
  const [isScrolling, setIsScrolling] = useState(false); // scroll이 차단된 상태 : scroll이 차단된 동안 보여줄 animation등을 처리하기 위해 제공
  const scrollableRef = useRef(null); // scrollable dom요소를 담을 ref
  const itemNodes = useRef(new Map()); // scrollable 내부의 dom요소들을 담을 ref
  const [viewedItemId, setViewedItemId] = useState(lastViewedId); // itemNodes 중 자동스크롤을 통해 보여질 요소의 itemId
  const [isDisabled, setIsDisabled] = useState(false); // 자동스크롤 해제(<- IntersectionObserver unobserve)
  const [isDisabledTemp, setIsDisabledTemp] = useState(false);
  const observer = useRef(null); // IntersectionObserver

  const isObserving = useMemo(
    () => !isDisabled && !isDisabledTemp,
    [isDisabled, isDisabledTemp]
  );

  useEffect(() => {
    // IntersectionObserver를 통해 scrollable 내부 요소들의 intersecting 여부를 관찰한다.
    observer.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 자동스크롤하여 보여줄 요소의 itemId를 intersecting 요소의 itemId로 갱신한다.
            setViewedItemId(entry.target.dataset.itemId);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );
  }, []);

  // 자동스크롤 토글 혹은 itemNodeRef 추가 시 호출하여 모든 itemNodes에 대한 observe/unobserve 처리
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

  // viewedItemId가 바뀌면 해당 요소로 자동스크롤한다.
  useEffect(() => {
    if (!scrollableRef.current) return;
    const scrollToViewedItem = () => {
      setIsScrolling(true);
      scrollableRef.current.style[
        isHorizontalScroll ? "overflow-x" : "overflow-y"
      ] = "hidden"; // scroll 차단
      itemNodes.current
        .get(viewedItemId)
        ?.scrollIntoView({ behavior: "smooth" }); // scroll이 차단된 상태에서 호출돼야함 (scroll 이벤트가 먼저 발생하면 scrollIntoView가 끝까지 정상적으로 실행되지 않음)
      setTimeout(() => {
        // 차단시간 경과 이후 scroll 차단 해제
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
      if (processingCnt.current === 0) setIsDisabledTemp(false); // scrollIntoViewWithoutPhase를 통해 스크롤 이동 처리중인 건수를 트래킹하여, 해당 cnt가 0이 될때까지는 isDisabledTemp를 true로 유지하여 unobserve(미관찰) 상태를 유지한다. 이를 통해 연달은 스크롤 이동 요청 발생 시, 목표한 아이템으로의 스크롤 이동이 모두 완료되어서야 isDisabledTemp가 false가 되어 observe처리되도록 한다.
    }, preventScrollTime);
  };

  return {
    scrollableRef, //AutoScrollBox에 연결할 ref
    itemProps: { itemNodes, updateObserver }, // AutoScrollItem에서 사용할 props
    viewedItemId, // 자동스크롤을 통해 보여진, 혹은 보여질 AutoScrollItem의 itemId
    isScrolling, // 자동스크롤이 진행되고 있는 상태이자 사용자 스크롤이 차단된 상태
    scrollIntoViewWithoutPhase, // 인자로 넘긴 itemId를 가진 AutoScrollItem으로 자동스크롤 해주는 함수
    isDisabled, // 자동스크롤 해제 여부
    setIsDisabled, // 자동스크롤 토글
  };
}

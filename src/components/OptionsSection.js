import { useCallback } from "react";

const OptionsSection = ({
  isFromHighlight,
  setIsFromHighlight,
  isBlurEnabled,
  setIsBlurEnabled,
  isDisabled,
  setIsDisabled,
}) => {
  const toggleAutoScroll = useCallback(
    (e) => {
      const { checked } = e.currentTarget;
      setIsDisabled(!checked);
    },
    [setIsDisabled]
  );

  const toggleBlur = useCallback((e) => {
    const { checked } = e.target;
    setIsBlurEnabled(checked);
  }, []);

  const toggleFromHighlight = useCallback(
    (e) => {
      const { checked } = e.target;
      setIsFromHighlight(checked);
    },
    [setIsFromHighlight]
  );

  return (
    <section className="optionsSection">
      <div className="optionInputBox">
        <input
          className="optionInput"
          type="checkbox"
          id="isPlayfromHighlight"
          checked={isFromHighlight}
          onChange={toggleFromHighlight}
        />
        <label htmlFor="isPlayfromHighlight" className="optionLabel">
          하이라이트부터 재생
        </label>
      </div>
      <div className="optionInputBox">
        <input
          className="optionInput"
          type="checkbox"
          id="isBlurEnabled"
          checked={isBlurEnabled}
          onChange={toggleBlur}
        />
        <label htmlFor="isBlurEnabled" className="optionLabel">
          블러효과
        </label>
      </div>
      <div className="optionInputBox">
        <input
          className="optionInput"
          type="checkbox"
          id="isAutoScrollEnabled"
          checked={!isDisabled}
          onChange={toggleAutoScroll}
        />
        <label htmlFor="isAutoScrollEnabled" className="optionLabel">
          자동스크롤
        </label>
      </div>
    </section>
  );
};

export default OptionsSection;

import { styled } from "styled-components";

const CopyButtonLayout = styled.button`
  height: 100%;
  color: gray;
  &:hover {
    color: darkgray;
  }
  svg {
    height: 100%;
    width: 100%;
  }
`;

const CopyButton = ({ value, name, children }) => {
  const copyValueToClipboard = async (e) => {
    try {
      navigator.clipboard.writeText(value);
      alert(`${name}을/를 복사했습니다.`);
    } catch (err) {
      alert(`${name} 복사에 실패했습니다.`);
    }
  };
  return (
    <CopyButtonLayout
      aria-label={`copy ${name}`}
      onClick={copyValueToClipboard}
    >
      {children}
    </CopyButtonLayout>
  );
};

export default CopyButton;

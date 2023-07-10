import { css, styled } from "styled-components";
import { useState } from "react";

const TabMenuLayout = styled.div`
  height: 100%;
  width: 70%;
  border-top: 1px solid black;
  display: flex;
  flex-direction: column;
  .tabHeadList {
    height: 13%;
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.$isReversed ? "end" : "start")};

    .tabHeadItem {
      height: 100%;
      display: flex;
    }
  }
  .tabBody {
    width: 100%;
    height: 87%;
    padding: 10px 10px;
    font-size: 1rem;
    text-align: ${(props) => (props.$isReversed ? "end" : "start")};
  }
`;

const Button = styled.button`
  padding: 0 10px;
  height: 100%;
  color: gray;
  font-style: italic;
  text-decoration: underline;
  &:hover {
    color: darkgray;
  }
  ${(props) =>
    props.$isSelected &&
    css`
      color: black;
      text-shadow: 1px 0px 0px; // font-weight는 width값이 바뀜
    `}
`;

const TabMenu = ({ menu, isReversed = false }) => {
  const [tabIdx, setTabIdx] = useState(-1);
  return (
    <TabMenuLayout $isReversed={isReversed}>
      <ol className="tabHeadList" aria-label="탭 메뉴 버튼">
        {menu.map(({ name }, idx) => (
          <li key={name} className="tabHeadItem">
            <Button
              onClick={() => (tabIdx === idx ? setTabIdx(-1) : setTabIdx(idx))}
              $isSelected={tabIdx === idx}
            >
              {name}
            </Button>
          </li>
        ))}
      </ol>
      <div className="tabBody">{menu[tabIdx]?.content || ""}</div>
    </TabMenuLayout>
  );
};

export default TabMenu;

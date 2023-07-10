import { css, styled } from "styled-components";
import { AbsoluteMiddle, InnerCircle, ScrollBar } from "../styles/mixins";
import { useCallback } from "react";
import { RiArrowDownDoubleLine, RiArrowUpDoubleLine } from "react-icons/ri";

const AlbumControlsLayout = styled.div`
  ${InnerCircle()}
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  visibility: ${(props) => (props.$isVisible ? "visible" : "hidden")};

  @media (max-width: 768px) {
    ${(props) =>
      !props.$isCdMenuShow &&
      css`
        display: none;
      `}
  }

  .songsNav {
    ${AbsoluteMiddle}
    width: 70%;
    height: 70%;
    .songAnchorList {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow-y: auto;
      scrollbar-gutter: stable both-edges;
      ${ScrollBar(5, 5)}
      .songAnchorItem {
        .songAnchorItemButton {
          color: white;
          opacity: 0.6;
          font-size: 1.5rem;
          padding: 5px 5px;
          &:hover {
            opacity: 1;
            text-shadow: 0.5px 0px 0px;
          }
          @media (max-height: 700px) {
            font-size: 1.3rem;
          }
        }
      }
    }
  }
`;

const Button = styled.button`
  svg {
    height: 100%;
    width: auto;
  }
  height: 15%;
  color: white;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
  ${(props) =>
    props.$isHide &&
    css`
      visibility: hidden;
    `}
`;

const AlbumControls = ({
  isVisible,
  songs,
  selectSong,
  isCdMenuShow,
  setIsCdMenuShow,
}) => {
  const showCdMenu = useCallback(() => {
    setIsCdMenuShow(true);
  }, [setIsCdMenuShow]);
  const hideCdMenu = useCallback(() => {
    setIsCdMenuShow(false);
  }, [setIsCdMenuShow]);

  return (
    <AlbumControlsLayout $isCdMenuShow={isCdMenuShow} $isVisible={isVisible}>
      <Button
        onClick={showCdMenu}
        $isHide={isCdMenuShow}
        aria-label="수록곡 네비게이션 메뉴 펼치기"
        aria-expanded="false"
        aria-controls="cdMenu"
      >
        <RiArrowUpDoubleLine className="icon" />
      </Button>
      <Button
        onClick={hideCdMenu}
        $isHide={!isCdMenuShow}
        aria-label="수록곡 네비게이션 메뉴 숨기기"
        aria-expanded="true"
        aria-controls="cdMenu"
      >
        <RiArrowDownDoubleLine className="icon" />
      </Button>
      {isCdMenuShow && (
        <nav className="songsNav" aria-label="수록곡">
          <ol className="songAnchorList">
            {songs.map((song) => (
              <li
                className="songAnchorItem"
                key={song.id}
                onClick={() => selectSong(song.id)}
              >
                <button className="songAnchorItemButton">
                  {song.idx + 1}. {song.name}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </AlbumControlsLayout>
  );
};

export default AlbumControls;

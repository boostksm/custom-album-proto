import { useCallback, useState } from "react";
import { styled } from "styled-components";
import { AspectRatioPollyfill, InnerCircle } from "../styles/mixins";
import RotatingCd from "./RotatingCd";
import AlbumControls from "./AlbumControls";

const CdMenuLayout = styled.div`
  ${InnerCircle()}
  width: 45%;
  max-width: 500px;
  height: unset;
  aspect-ratio: 1/1;
  @supports not (aspect-ratio: 1/1) {
    ${AspectRatioPollyfill(1 / 1)}
  }
  @media (max-height: 700px) {
    max-width: 300px;
  }

  top: ${(props) => (props.$isCdMenuShow ? "50%" : "105%")};
  transition: all 0.75s ease-in-out;

  @media (max-width: 768px) {
    width: ${(props) => (props.$isCdMenuShow ? "60%" : "10%")};
    top: ${(props) => (props.$isCdMenuShow ? "50%" : "105%")};
    left: ${(props) => (props.$isCdMenuShow ? "50%" : "93%")};
  }

  .showMenuButton {
    ${InnerCircle()}
    display: none;
    @media (max-width: 768px) {
      display: ${(props) => (props.$isCdMenuShow ? "none" : "block")};
    }
  }
`;

const CdMenu = ({ albumData, isScrolling, selectSong }) => {
  const [isAlbumControlsShow, setIsAlbumControlsShow] = useState(false);
  const [isCdMenuShow, setIsCdMenuShow] = useState(true);

  const showAlbumControls = useCallback(() => {
    setIsAlbumControlsShow(true);
  }, []);
  const hideAlbumControls = useCallback(() => {
    setIsAlbumControlsShow(false);
  }, []);

  return (
    <CdMenuLayout
      onMouseOver={showAlbumControls}
      onMouseOut={hideAlbumControls}
      $isCdMenuShow={isCdMenuShow}
      aria-label="수록곡 네비게이션 메뉴"
      role="region"
      id="cdMenu"
    >
      <RotatingCd isFaster={isScrolling} albumArtUrl={albumData.albumArtUrl} />
      <AlbumControls
        isVisible={isAlbumControlsShow && !isScrolling}
        selectSong={selectSong}
        songs={albumData.songs}
        setIsCdMenuShow={setIsCdMenuShow}
        isCdMenuShow={isCdMenuShow}
      />
      <button
        className="showMenuButton"
        aria-label="수록곡 네비게이션 메뉴 펼치기 "
        onClick={() => setIsCdMenuShow(true)}
        aria-expanded="false"
        aria-controls="cdMenu"
      ></button>
    </CdMenuLayout>
  );
};

export default CdMenu;

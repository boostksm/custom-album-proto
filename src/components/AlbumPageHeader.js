import { styled } from "styled-components";
import { ReactComponent as Menu } from "../assets/icons/menu-svgrepo-com.svg";

const AlbumPageHeaderLayout = styled.header`
  flex-shrink: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;

  .albumInfoBox {
    .albumNameHeading,
    .albumArtistHeading {
      font-size: 2.5rem;
      line-height: 2.5rem;
      text-align: start;
    }
  }
`;

const AlbumPageHeader = ({ albumData }) => {
  return (
    <AlbumPageHeaderLayout aria-label="앨범 헤더">
      <div className="albumInfoBox">
        <h1 aria-label="앨범명" className="albumNameHeading">
          {albumData.albumName}
        </h1>
        <h2 aria-label="가수" className="albumArtistHeading">
          {albumData.artistName}
        </h2>
      </div>
      {/* <div>
        <button className="togglePageNavButton">
          <Menu width="30px" height="30px" />
        </button>
      </div> */}
    </AlbumPageHeaderLayout>
  );
};

export default AlbumPageHeader;

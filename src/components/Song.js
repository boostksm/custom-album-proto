import { styled } from "styled-components";
import TabMenu from "./common/TabMenu";
import SongCredits from "./SongCredits";
import SongLyrics from "./SongLyrics";
import IconAnchor from "./common/IconAnchor";
import { LinkIcons } from "../utils/icons";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const SongLayout = styled.div`
  width: 100%;
  height: 100%;
  min-height: 350px;
  padding: 50px 0px;
  padding-right: 10px;
  text-align: start;
  opacity: ${(props) => (props.$isBlur ? "0.4" : "1")};
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => (props.$isReversed ? "row" : "row-reverse")};

  @media (max-width: 768px) {
    padding: 20px 0px;
    flex-direction: column;
    justify-content: start;
  }

  .songImageBox {
    width: 45%;
    height: 100%;
    @media (max-width: 768px) {
      width: 100%;
      height: 50%;
    }

    overflow: hidden;
    .songImageButton {
      width: 100%;
      height: 100%;

      .songImage {
        width: 100%;
        height: 100%;
        visibility: hidden;
        object-fit: cover;
        margin-left: ${(props) => (props.$isReversed ? "15px" : "-15px")};
        transform: scale(1.3);
        transition: margin-left 0.3s ease;
        &:hover {
          margin-left: 0px;
        }
        &.visible {
          visibility: visible;
        }
      }
    }
  }

  .songInfoBox {
    width: 45%;
    height: 70%;
    min-height: 350px;

    @media (max-width: 768px) {
      width: 100%;
      height: 50%;
      min-height: 250px;
    }

    .songInfoItem {
      width: 100%;
      display: flex;
      justify-content: ${(props) => (props.$isReversed ? "flex-end" : "start")};
    }

    .songNameHeading {
      height: 15%;
      padding: 0 10px;

      .songNameButton {
        height: 100%;
        font-size: 2.5rem;
      }
    }
    .songDetailBox {
      height: 75%;
    }
    .songLinkList {
      height: 10%;
      .songLinkItem {
        margin: 0 10px;
      }
    }
  }
`;

const Song = ({ song, isBlur, isReversed, selectSong }) => {
  const tabMenu = [
    { name: "credits", content: <SongCredits credits={song.credits} /> },
    { name: "lyrics", content: <SongLyrics lyrics={song.lyrics} /> },
    { name: "description", content: song.description },
  ];
  const selectCurSong = () => selectSong(song.id);
  return (
    <SongLayout $isBlur={isBlur} $isReversed={isReversed}>
      <div className="songImageBox">
        <button className="songImageButton" onClick={selectCurSong}>
          <img
            className="songImage"
            onLoad={(e) => e.target.classList.add("visible")}
            src={song.imageUrl}
            alt={song.name}
          />
        </button>
      </div>
      <div className="songInfoBox">
        <h3 className="songInfoItem songNameHeading">
          <button className="songNameButton" onClick={selectCurSong}>
            {song.name}
          </button>
        </h3>
        <div className="songInfoItem songDetailBox">
          <TabMenu menu={tabMenu} isReversed={isReversed} />
        </div>
        <ul className="songInfoItem songLinkList" aria-label="관련 링크">
          {song.links.map(({ platform, link }) => (
            <li className="songLinkItem" key={platform}>
              <IconAnchor
                name={platform}
                href={link}
                Icon={
                  LinkIcons[capitalizeFirstLetter(platform)] ||
                  LinkIcons.Unknown
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </SongLayout>
  );
};

export default Song;

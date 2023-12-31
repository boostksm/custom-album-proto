import LinkAnchor from "./common/LinkAnchor";
import CopyButton from "./common/CopyButton";
import { styled } from "styled-components";
import { LinkIcons } from "../utils/icons";
import React from "react";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const AlbumContentFooterLayout = styled.footer`
  height: 30%;
  text-align: end;
  padding: 50px 20px;

  @media (max-width: 768px) {
    padding: 50px 10px;
  }

  .artistContactsBox {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .contactList {
      display: flex;
      .contactItem {
        margin: 0 3px;
      }
    }
  }
`;

const AlbumContentFooter = ({ albumData }) => {
  return (
    <AlbumContentFooterLayout aria-label="앨범 상세 정보">
      <p aria-label="앨범 카피라이트">@{albumData.artistName}</p>
      <p aria-label="앨범 발매일">release : {albumData.releaseDate}</p>
      <p aria-label="앨범 장르">genre : {albumData.genre}</p>
      <div className="artistContactsBox">
        <div className="label">artist contacts : </div>
        <ul className="contactList" aria-label="아티스트 컨택">
          {albumData.artistLinks.map(({ platform, link }) => {
            const LinkIcon =
              LinkIcons[capitalizeFirstLetter(platform)] || LinkIcons.Unknown;
            return (
              <li className="contactItem" key={platform}>
                <LinkAnchor name={platform} href={link}>
                  <LinkIcon size="20px" />
                </LinkAnchor>
              </li>
            );
          })}
          {albumData.artistEmail && (
            <li className="contactItem">
              <CopyButton value={albumData.artistEmail} name="artist email">
                <LinkIcons.Email size="20px" />
              </CopyButton>
            </li>
          )}
        </ul>
      </div>
    </AlbumContentFooterLayout>
  );
};

export default AlbumContentFooter;

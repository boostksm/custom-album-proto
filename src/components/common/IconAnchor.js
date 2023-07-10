import { styled } from "styled-components";

const IconAnchorLayout = styled.a`
  display: inline-block;
  height: 100%;
  color: gray;
  &:hover {
    color: darkgray;
  }
`;

const IconAnchor = ({ children, href, name, isDownload = false }) => {
  return (
    <IconAnchorLayout
      aria-label={name}
      href={href}
      target="_blank"
      rel="noreferrer"
      download={isDownload}
    >
      {children}
    </IconAnchorLayout>
  );
};

export default IconAnchor;

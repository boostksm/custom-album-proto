import { styled } from "styled-components";

const LinkAnchorLayout = styled.a`
  display: inline-block;
  height: 100%;
  color: gray;
  &:hover {
    color: darkgray;
  }
`;

const LinkAnchor = ({ children, href, name, isDownload = false }) => {
  return (
    <LinkAnchorLayout
      aria-label={name}
      href={href}
      target="_blank"
      rel="noreferrer"
      download={isDownload}
    >
      {children}
    </LinkAnchorLayout>
  );
};

export default LinkAnchor;

import { styled } from "styled-components";

const IconAnchorLayout = styled.a`
  color: gray;
  &:hover {
    color: darkgray;
  }
  svg {
    height: 100%;
    width: 100%;
  }
`;

const IconAnchor = ({ href, Icon, name }) => {
  return (
    <IconAnchorLayout
      aria-label={name}
      href={href}
      target="_blank"
      rel="noreferrer"
      download={name === "download"}
    >
      <Icon />
    </IconAnchorLayout>
  );
};

export default IconAnchor;

import {
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineDownload,
  AiOutlineLink,
} from "react-icons/ai";
import { FaRandom } from "react-icons/fa";
import {
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { ImLoop } from "react-icons/im";
import { MdAlternateEmail } from "react-icons/md";

const LinkIcons = {
  Youtube: AiFillYoutube,
  Instagram: AiFillInstagram,
  Email: MdAlternateEmail,
  Download: AiOutlineDownload,
  Unknown: AiOutlineLink,
};

const PlayerIcons = {
  Play: TbPlayerPlayFilled,
  Pause: TbPlayerPauseFilled,
  Next: TbPlayerTrackNextFilled,
  Prev: TbPlayerTrackPrevFilled,
  Random: FaRandom,
  Loop: ImLoop,
};

export { LinkIcons, PlayerIcons };

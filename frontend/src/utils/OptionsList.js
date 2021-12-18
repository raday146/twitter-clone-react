import { faBell } from "@fortawesome/free-regular-svg-icons/faBell";
import { faComments } from "@fortawesome/free-regular-svg-icons/faComments";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons/faEnvelope";
import { faListAlt } from "@fortawesome/free-regular-svg-icons/faListAlt";
import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH";
import { faHashtag } from "@fortawesome/free-solid-svg-icons/faHashtag";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";

export const headerList = [
  {
    name: "Home",
    href: "/",
    icon: faHome,
  },
  {
    name: "Explore",
    href: "/explore",
    icon: faHashtag,
  },
  {
    name: "Profile",
    href: "/user",
    icon: faUser,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: faBell,
    count: true,
  },
  {
    name: "Chat Room",
    href: "/chats",
    icon: faComments,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: faEllipsisH,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: faEnvelope,
  },
  {
    name: "Lists",
    href: "/lists",
    icon: faListAlt,
  },
];

export const bottomList = [
  {
    name: "Home",
    href: "/home",
    icon: faHome,
  },
  {
    name: "Explore",
    href: "/explore",
    icon: faSearch,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: faBell,
    count: "notificationsCount",
  },
  {
    name: "Profile",
    href: "/user",
    icon: faUser,
  },
];

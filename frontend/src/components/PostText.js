import React from "react";
import WithUrls from "./WithUrls";
import { truncateText } from "../utils/truncate";
import { useNavigate } from "react-router-dom";

export default function PostText({ text, to, expanded = false }) {
  const history = useNavigate();
  if (!expanded) {
    text = truncateText(text, 5);
  }
  console.log(text);
  return (
    <div
      {...OnClick((e) => {
        to && history(to);
      })}
    >
      <WithUrls>{text}</WithUrls>
    </div>
  );
}

const OnClick = (() => {
  let clickTime = 0;
  let pos = { x: 0, y: 0 };

  return (onClick) => ({
    onMouseDown: ({ nativeEvent: e }) => {
      clickTime = Date.now();
      pos.x = e.x;
      pos.y = e.y;
    },
    onMouseUp: ({ nativeEvent: e }) => {
      Date.now() - clickTime < 500 &&
        pos.x === e.x &&
        pos.y === e.y &&
        e.which === 1 &&
        onClick();
    },
  });
})();

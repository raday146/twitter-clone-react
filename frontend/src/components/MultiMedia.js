import React from "react";
import { Card, Image } from "react-bootstrap";
import { ReactTinyLink } from "react-tiny-link";
import getUrls from "get-urls";

export default function MultiMedia(props) {
  const { text, media, expanded = false, className } = props;
  console.log(text);
  let photo,
    url = [];
  if (media && media?.photo) {
    photo = <Image fluid rounded src={media?.photo} alt="media preview" />;
  }

  if (media && media?.url) {
    let unparsed_urls = !!text ? Array.from(getUrls(text)) : "";
    console.log(unparsed_urls);
    if (!!unparsed_urls && unparsed_urls?.length) {
      url = {
        expanded_url: unparsed_urls[0],
      };
    }
  }

  if (!!!url) {
    url = (
      <ReactTinyLink
        width="100%"
        cardSize={expanded ? "large" : "small"}
        autoPlay={expanded}
        showGraphic
        maxLine={2}
        minLine={1}
        url={media?.url}
      />
    );
  }

  if (!!photo || !!url) {
    return (
      <Card
        className={`${className} w-100 bg-transparent`}
        style={{
          maxHeight: !expanded ? "350" : "fit-content",
          overflow: "hidden",
        }}
      >
        {photo}
        <div className="mt-1">{url}</div>
      </Card>
    );
  }

  return null;
}

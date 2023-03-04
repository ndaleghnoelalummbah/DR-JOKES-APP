import React from "react";
export default function CommentCard(props) {
  return (
    <div style={{ border: "1px solid #adabab",borderRadius:"6px", margin:"6px",wordBreak:"break-all"}}>
      <blockquote> *** {props.comment}</blockquote>
    </div>
  );
}

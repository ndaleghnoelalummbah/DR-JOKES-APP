import React, { useState, useEffect } from "react";
import styles from "./Joke.module.css";
import CommentCard from "../CommentCard/CommentCard";
import axios from "axios";
import Modal from "react-overlays/Modal";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";

export default function Joke(props) {
  const [commentArray, setCommentArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentData, setCommentData] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [commentButton, setCommentButton] = useState("comment");
  const [commentText, setCommentText] = useState("");
  const [commenting, setCommenting] = useState(false);
  const [dislike, setDislike] = useState(0);
  const [like, setLike] = useState(0);
  function handleCommentData(e) {
    setCommentData(e.target.value);
  }
  function handleAddComment(e) {
    e.preventDefault();
    setCommenting(true);
    const commentInfo = {
      joke_id: props.id,
      comment: commentData,
    };
    axios
      .post("https://api.jokes.digitalrenter.com/api/comments", commentInfo)
      .then((response) => {
        console.log(response.status, response.data);
        alert("comment sucessfully submitted");
        props.onNewComment(response);
        setCommentData("");
      })
      //console.log(props.comments)

      .finally((fin) => setCommenting(false));
    console.log(props.comments);
  }

  function handleComment(id) {
    setShowModal(true);
    // fetch(`https://api.jokes.digitalrenter.com/api/comments?joke_id=${props.id}`)
    //   .then((res) => res.json())
    //   .then((data) => setCommentArray(data));
    //  setCommentList(() => {
    //   return commentArray.map((items) => <blockquote>*** {items.comment}</blockquote>);
    //  });
  }
  // const onAddComment = () => {
  //   if (commenting === true) {
  //     setCommentButton("commenting ...");
  //     //setCommentText(commentData);
  //   }
  // else{
  //   setCommentText("")
  // }
  // };
  // let text = "";
  // if (props) {
  //   text = "so funny";
  // } else if (props.like > 4) {
  //   text = "funny";
  // }
  function hates() {
    setDislike((prev) => prev + 1);
  }
  function likes() {
    setLike((prev) => prev + 1);
  }
  
  // function handleComment() {
  //   setShowModal(true);
  //   commentFunc();
  // }
  function handleClose() {
    setShowModal(false);
  }
  // let handleSaveComments = () => {
  //   alert("comment saved succesfully");
  // };
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div style={{ display: props.like > 4 ? "block" : "none" }} className={styles.likes}></div>
        <h3 style={{ display: props.punchline ? "block" : "none" }}>{props.punchline}</h3>
        <p>{props.setup}</p>
      </div>
      <div className={styles.icons}>
        <div className={styles.reaction}>
          <FontAwesomeIcon onClick={hates} icon={faThumbsDown} style={{ height: "20px", color: "orange" }} />
          <span style={{ marginLeft: "8px", display: dislike !== 0 ? "block" : "none" }}>{dislike}</span>
        </div>
        <div className={styles.reaction}>
          <FontAwesomeIcon onClick={likes} icon={faThumbsUp} style={{ height: "20px", color: "orange" }} /> <span style={{ marginLeft: "6px", display: like !== 0 ? "block" : "none" }}>{like}</span>
        </div>
        <div>
          <FontAwesomeIcon onClick={handleComment} icon={faComment} style={{ height: "20px", opacity: "0.4" }} />
        </div>
        {/* <FontAwesomeIcon icon={faCoffee} /> */}
      </div>
      <div className={styles.modalContainer}>
        <Modal className={styles.modal} show={showModal} onHide={handleClose} renderBackdrop={renderBackdrop}>
          <div>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <FontAwesomeIcon onClick={handleClose} className={styles.close} icon={faTimes} />

                <h3 style={{ margin: " 0px 0px 20px 0px" }}>make your comments here</h3>
              </div>
            </div>
            <div className={styles.modalDesc}>
              <p style={{ display: commenting ? "block" : "none", color: "bue" }}>submiting comment.....</p>
              <form className={styles.comment} onSubmit={handleAddComment}>
                <textarea className={styles.inputContainers} type="text" name="comment" onChange={handleCommentData} value={commentData} placeholder="Write your comment" />
                {/* <div style={{ margin: "14px auto", width: "300px" }}> */}
                {/* <input style={{ height: "50px", borderRadius: "16px",fontSize:"18px" }} type="text" name="joke_id" onChange={handleCommentData} value={commentData.joke_id} placeholder="Enter the joke id" /> */}
                <button type="submit" className={styles.primaryButton}>
                  {commenting ? "commenting" : "comment"}
                </button>
                {/* </div> */}
              </form>
              <div style={{ height: "280px", overflow: "auto", margin: "4px" }}>
                {/* <blockquote style={{ display: commenting ? "block" : "none" }}>*** {commentData}</blockquote> */}
                {props.comments.map((val) => {
                  return <CommentCard {...val} />;
                })}
              </div>
            </div>
          </div>
        </Modal>
      </div>
      {/* <div style={{ display: comments === true ? "block" : "none", height: "250px", backgroundColor: "#E6A4C4", padding: "2px" }}>
        <form onSubmit={handleAddComment}>
          <textarea className={styles.inputContainers} type="text" name="comment" onChange={handleCommentData} value={commentData.comment} placeholder="Write your comment" />
          <input style={{ height: "50px" }} type="text" name="joke_id" onChange={handleCommentData} value={commentData.joke_id} placeholder="Enter the joke id" />
          <button type="submit" style={{ padding: "4px 12px", border: "1px solid #E6A4C4", borderRadius: "12px" }}>
            submit
          </button>
        </form>
        <div style={{ backgroundColor: "white", overflowX: "auto", height: "130px", margin: "4px" }}>{commentList}</div>
      </div> */}
    </div>
  );
}

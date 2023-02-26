import React, { useState, useEffect } from "react";
import styles from "./Joke.module.css";
import axios from "axios";
import Modal from "react-overlays/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
export default function Joke(props) {
  const [commentArray, setCommentArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentData, setCommentData] = useState({
    comment: "",
    joke_id: "",
  });
  const [commentList, setCommentList] = useState([]);
  function handleCommentData(e) {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  }
  function handleAddComment(e) {
    e.preventDefault();
    const commentInfo = {
      joke_id: commentData.joke_id,
      comment: commentData.comment,
    };
    axios
      .post("https://api.jokes.digitalrenter.com/api/comments", commentInfo)
      .then((response) => {
        console.log(response.status, response.data);
        //alert("comment sucessfully submitted");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
  }

  function commentFunc() {
    setCommentList(() => {
      fetch(`https://api.jokes.digitalrenter.com/api/comments?joke_id=${props.id}`)
        .then((res) => res.json())
        .then((data) => setCommentArray(data));
      return commentArray.map((items) => {
        return (
          <p>
            {items.joke_id}: {items.comment}
          </p>
        );
      });
    });
  }

  let text = "";
  if (props.like > 10) {
    text = "so funny";
  } else if (props.like > 4) {
    text = "funny";
  }

  let more = "...see more";
  const [startText, setStartText] = useState(props.setup.slice(0, 40));
  function completeText() {
    setStartText(() => {
      return props.setup;
    });
  }
  let shortText = <span>{startText}</span>;
  let moreText = (
    <span onClick={completeText} style={{ display: props.setup.length < 40 || startText === props.setup ? "none" : "block", color: "#7644ef" }}>
      {more}
    </span>
  );
  function handleComment() {
    setShowModal(true);
    commentFunc();
  }
  function handleClose() {
    setShowModal(false);
  }
  let handleSaveComments = () => {
    alert("comment saved succesfully");
  };
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div style={{ display: props.like > 4 ? "block" : "none" }} className={styles.likes}>
          {/* {text} */}
        </div>
        <h3>id:{props.id}</h3>
        <h3 style={{ display: props.punchline ? "block" : "none" }}>{props.punchline}</h3>
        <>
          {shortText}
          {moreText}
        </>
      </div>
      <div className={styles.icons}>
        <div className={styles.reaction}>
          <FontAwesomeIcon onClick={props.hateJoke} icon={faThumbsDown} style={{ height: "30px", color: "orange" }} />
          <span style={{ marginLeft: "8px" }}>{props.dislike} dislikes</span>
        </div>
        <div className={styles.reaction}>
          <FontAwesomeIcon onClick={props.likeJoke} icon={faThumbsUp} style={{ height: "30px", color: "orange" }} /> <span style={{ marginLeft: "6px" }}>{props.like} likes</span>
        </div>
        <div>
          <FontAwesomeIcon onClick={handleComment} icon={faComment} style={{ height: "30px", opacity: "0.4" }} />
        </div>
        {/* <FontAwesomeIcon icon={faCoffee} /> */}
      </div>
      <div className={styles.modalContainer}>
        <Modal className={styles.modal} show={showModal} onHide={handleClose} renderBackdrop={renderBackdrop}>
          <div>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>make your comments here</div>
            </div>
            <div className={styles.modalDesc}>
              <form onSubmit={handleAddComment}>
                <textarea className={styles.inputContainers} type="text" name="comment" onChange={handleCommentData} value={commentData.comment} placeholder="Write your comment" />
                <div style={{ margin: "14px auto", width: "300px" }}>
                  <input style={{ height: "50px", borderRadius: "16px" }} type="text" name="joke_id" onChange={handleCommentData} value={commentData.joke_id} placeholder="Enter the joke id" />
                  <button type="submit" style={{ padding: "12px 22px", borderRadius: "4px", marginLeft: "34px" }} onClick={handleSaveComments}>
                    submit
                  </button>
                </div>
              </form>
              <div style={{ backgroundColor: "white", overflowX: "auto", height: "130px", margin: "4px" }}>{commentList}</div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.secondaryButton} onClick={handleClose}>
                Close
              </button>
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

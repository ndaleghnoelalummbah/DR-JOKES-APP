import React, { useEffect, useState } from "react";

const CommentsCard = ({ comment }) => {
  return (
    <div>
      <blockquote> *** "{comment.comment}"</blockquote>
      {/* <button className='btn btn-success btn-sm'>Like</button> */}
    </div>
  );
};

const JokeCard = ({ joke, onNewComment }) => {
  const [text, setText] = useState("");
 

  const onSubmit = () => {
    // alert(text + joke.id);
    setLoading(true);
    let url = `https://api.jokes.digitalrenter.com/api/comments`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ joke_id: joke.id, comment: text }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((responseJson) => {
        // console.log(responseJson)
        onNewComment(responseJson);
        setText("");
      })
      .finally((fin) => setLoading(false));
  };

  return (
    <div className="border m-4 p-2 bg-light">
      <p>{joke.punchline}</p>
      <p>{joke.setup}</p>
      {joke.comments.map((comment) => (
        <CommentsCard comment={comment} />
      ))}
      <div className="border border-dark rounded">
        <div>
          <input value={text} className="form-input" onChange={(e) => setText(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={onSubmit}>
          {loading ? "Commenting ..." : "Comment"}
        </button>
      </div>
    </div>
  );
};

function Jokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.jokes.digitalrenter.com/api/jokes")
      .then((res) => res.json())
      .then((responseJson) => {
        setJokes(responseJson);
      })
      .finally((fin) => setLoading(false));
  }, []);

  const onNewCommentReceived = (newComment) => {
    console.log("Data sent is ", newComment);

    const updatedJokes = jokes.map((jk) => {
      if (jk.id === newComment.joke_id) {
        jk.comments = [newComment, ...jk.comments];
      }
      return jk;
    });

    setJokes(updatedJokes);
  };

  return (
    <div>
      <h1>My Jokes</h1>
      {loading && <p>Loading jokes ... </p>}

      {jokes.map((joke) => (
        <JokeCard joke={joke} onNewComment={(newComment) => onNewCommentReceived(newComment)} />
      ))}
    </div>
  );
}

export default Jokes;

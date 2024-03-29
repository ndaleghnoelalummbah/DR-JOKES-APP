import Joke from "./components/Joke/Joke";
import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
//import Footer from "./components/Footer/Footer";
import Category from "./components/Category/Category";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import facebook from "./components/image/facebook.png";
import twitter from "./components/image/twitter.png";
import instagram from "./components/image/instagram.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  //const colors = [<h3>green</h3>, <h3>red</h3>, <h3>yellow</h3>, <h3>blue</h3>, <h3>black</h3>];
  //const [jokeElement, setJokeElement] = useState(jokeData);
  const [jokeElement, setJokeElement] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addingJokes, setAddingJokes] = useState(false);
  const [formData, setFormData] = useState({
    punchline: "",
    setup: "",
    author_name: "",
    author_email: "",
  });

  useEffect(() => {
    setLoading(true);
    fetch("https://api.jokes.digitalrenter.com/api/jokes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return setJokeElement(data);
      })
      .finally((fin) => setLoading(false));
  }, []);

  const onNewCommentReceived = (newComment) => {
    console.log("Data sent is ", newComment);

    const updatedJokes = jokeElement.map((joke) => {
      if (joke.id === newComment.data.joke_id) {
        joke.comments = [newComment.data, ...joke.comments];
      }
      return joke;
    });

    setJokeElement(updatedJokes);
  };

  const [toggleButton, setToggleButton] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 1,
    name: "Family",
  });
  const categoryJokes = jokeElement.filter((val) => {
    return val.category_id === selectedCategory.id;
  });
  const sampleJokes = categoryJokes.slice(0, 6);
  const randomJokes = sampleJokes.map((joke) => {
    return <Joke {...joke} onNewComment={onNewCommentReceived} />;
  });

  const moreJokes = categoryJokes.map((joke) => {
    return <Joke {...joke} onNewComment={onNewCommentReceived} />;
  });

  function seeMore() {
    setToggleButton((prevState) => !prevState);
  }
  let indicator = "";
  toggleButton === true ? (indicator = "Back") : (indicator = "See More");
  function handleFormData(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  function addJokes() {
    setIsAdd((prevState) => !prevState);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddingJokes(true);
    const userData = {
      category_id: selectedCategory.id,
      punchline: formData.punchline,
      setup: formData.setup,
      author_name: formData.author_name,
      author_email: formData.author_email,
    };
    axios
      .post("https://api.jokes.digitalrenter.com/api/jokes", userData)
      .then((response) => {
        console.log(response.status, response.data);
        setJokeElement([...jokeElement, response]);
        console.log(jokeElement);
        setAddingJokes(false);
        setFormData({
          punchline: "",
          setup: "",
          author_name: "",
          author_email: "",
        });
        alert("Joke submitted sucessfully");
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
  };

  return (
    <div>
      <Header />
      <div className="App">
        <div className="text">
          <p>Feel free not to hold back your laughter</p>
        </div>
        <div className="addcat">
          <Category jokeElement={jokeElement} setSelectedCategory={setSelectedCategory} />
        </div>
        <div className="plus">
          <FontAwesomeIcon icon={faPlus} onClick={addJokes} style={{ height: "60px", width: "30px" }} />
        </div>
        {loading && <p style={{ color: "blue" }}>Loading jokes ............</p>}
        <div>
          <section style={{ display: toggleButton === false ? "block" : "none" }}>{randomJokes}</section>
          <section style={{ display: toggleButton === false ? "none" : "block" }}>{moreJokes}</section>
          {/* <div style={{ margin: "0 auto", width: "200px" }}> */}

          <button onClick={seeMore} className="indicator">
            {indicator}
          </button>
        </div>
        <div className="addJoke" style={{ display: isAdd === true ? "block" : "none" }}>
          <form onSubmit={handleSubmit}>
            <div>
              <FontAwesomeIcon onClick={addJokes} className="close" icon={faTimes} />
            </div>
            <h3 style={{ margin: " 0px 0px 20px 0px" }}>Add jokes of your choice</h3>
            <hr />
            <p style={{ display: addingJokes ? "block" : "none", color: "blue" }}>submitting jokes ...</p>
            <Category jokeElement={jokeElement} setSelectedCategory={setSelectedCategory} />
            <textarea className="inputContainers" type="text" name="punchline" onChange={handleFormData} value={formData.punchline} placeholder="enter joke headline" />
            <textarea className="inputContainers" type="text" name="setup" onChange={handleFormData} value={formData.setup} placeholder="enter the joke" />
            {/* <div className="addname"> */}
            <input className="inputContainers" type="text" name="author_name" onChange={handleFormData} value={formData.author_name} placeholder="enter your two names" />
            <input className="inputContainers" type="text" name="author_email" onChange={handleFormData} value={formData.author_email} placeholder="enter your email" />
            <button type="submit" style={{ padding: "8px 26px", borderRadius: "8px" }}>
              ADD
            </button>
            {/* </div> */}
          </form>
        </div>
      </div>

      <footer>
        <div className="row">
          <div className="logo">
            <img src={facebook} alt="facebook logo" height="24px" />
          </div>
          <div className="logo">
            <img src={twitter} alt="twitter logo" height="24px" />
          </div>
          <div className="logo">
            <img src={instagram} alt="instagram logo" height="24px" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

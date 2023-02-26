import Joke from "./components/Joke/Joke";
import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Category from "./components/Category/Category";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  //const colors = [<h3>green</h3>, <h3>red</h3>, <h3>yellow</h3>, <h3>blue</h3>, <h3>black</h3>];
  //const [jokeElement, setJokeElement] = useState(jokeData);
  const [jokeElement, setJokeElement] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [formData, setFormData] = useState({
    punchline: "",
    setup: "",
    author_name: "",
    author_email: "",
  });

  useEffect(() => {
    fetch("https://api.jokes.digitalrenter.com/api/jokes")
      .then((res) => res.json())
      .then((data) => setJokeElement(data));
  }, []);

  console.log(jokeElement);
  const [toggleButton, setToggleButton] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    id: 1,
    name: "Family",
  });
 
    function likes(id) {
    setJokeElement((prevJokeElement) => {
      return prevJokeElement.map((val) => {
        return val.id === id ? { ...val, like: val.like + 1 } : val;
      });
    });
  }
  function hates(id) {
    setJokeElement((prevJokeElement) => {
      return prevJokeElement.map((val) => {
        //alert(val.id === id ? val.dislike + 1  : "same");
        return val.id === id ? { ...val, dislike: val.dislike + 1 } : val;
      });
    });
  }
 
  const categoryJokes = jokeElement.filter((val) => {
    return val.category_id === selectedCategory.id;
  });

  const sampleJokes = categoryJokes.slice(0, 3);
  const randomJokes = sampleJokes.map((joke) => {
    return (
      <Joke
       {...joke}
        likeJoke={() => likes(joke.id)}
        hateJoke={() => hates(joke.id)}
      />
    );
  });

  const moreJokes = categoryJokes.map((joke) => {
    return (
      <Joke
        {...joke}
        likeJoke={() => likes(joke.id)}
        hateJoke={() => hates(joke.id)}
      />
    );
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
      <div className="App">
        {/* {colors}
      <br />
      <hr /> */}

        <Header />
        <div className="text">
          <p>Feel free not to hold back your laughter</p>
        </div>
        <div style={{ width: "300px", margin: "0 auto" }}>
          <Category jokeElement={jokeElement} setSelectedCategory={setSelectedCategory} />
        </div>
        <div>
          <section style={{ display: toggleButton === false ? "block" : "none" }}>{randomJokes}</section>
          <section style={{ display: toggleButton === false ? "none" : "block" }}>{moreJokes}</section>
          <div style={{ margin: "0 auto", width: "200px" }}>
            <div className="addmore">
              <div className="plus">
                <FontAwesomeIcon icon={faPlus} onClick={addJokes} style={{ height: "80px", width: "80px", color: "#f9fcd6" }} />
              </div>
              <button onClick={seeMore} style={{ padding: "10px 26px", borderRadius: "8px" }}>
                {indicator}
              </button>
            </div>
          </div>
          <div style={{ display: isAdd === true ? "block" : "none", margin: "14px auto", padding: "18px", width: "600px", boxShadow: "2px 2px 2px 4px #79377a" }}>
            <form onSubmit={handleSubmit}>
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
      </div>
      <footer>
        <div></div>
      </footer>
    </div>
  );
}

export default App;

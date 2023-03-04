import React, { useState, useEffect } from "react";
import Select from "react-select";
import redheart from "../image/redheart.png";
import family from "../image/family.jpg";
import book from "../image/book.jpg";
import western from "../image/western.jpeg";
import africa from "../image/africa.png";
import jokeData from "../../jokeData";
export default function Category(props) {
  const [categoryArray, setCategoryArray] = useState([]);

  useEffect(() => {
    fetch("https://api.jokes.digitalrenter.com/api/categories")
      .then((res) => res.json())
      .then((data) => setCategoryArray(data));
  }, []);

  // const [data, setData] = useState([
  //   {
  //     img: <img src={africa} height="30" width="40px" />,
  //     ...categoryArray[0],
  //   },
  //   {
  //     img: <img src={africa} height="30" width="40px" />,
  //     ...categoryArray[1],
  //   },
  //   {
  //     img: <img src={book} height="30" width="40px" />,
  //     ...categoryArray[2],
  //   },
  //   {
  //     img: <img src={book} height="30" width="40px" />,
  //     ...categoryArray[3],
  //   },
  //   {
  //     img: <img src={redheart} height="30" width="40px" />,
  //     ...categoryArray[4],
  //   },
  // ]);

  // const data =[
  //   {
  //     id: 1,
  //     value: "Family",
  //     text: "family joke",
  //     img: <img src={family} height="30" width="40px" />,
  //   },
  //   {
  //     id: 2,
  //     value: "Political",
  //     text: "political joke",
  //     img: <img src={africa} height="30" width="40px" />,
  //   },
  //   {
  //     id: 3,
  //     value: "Religions",
  //     text: "relegions joke",
  //     img: <img src={book} height="30" width="40px" />,
  //   },
  //   {
  //     id: 4,
  //     value: "Education",
  //     text: "educational joke",
  //     img: <img src={book} height="30" width="40px" />,
  //   },
  //   {
  //     id: 5,

  //     value: "Emotional",
  //     text: "emotional joke",
  //     img: <img src={redheart} height="30" width="40px" />,
  //   },
  // ];
  // const [selectedOption, setSelectedOption] = useState(props.selectedCategory);
  const [selected, setSelected] = useState("");
  const handleChange = (e) => {
    setSelected(e);  
    props.setSelectedCategory({ id: e.id, name: e.value });
  };
  return (
    <div style={{width:"80%",backgroundColor:"ActiveBorder", margin: "20px auto" }}>
      <Select
        placeholder="Select a Joke Category"
        value={selected}
        options={categoryArray}
        onChange={handleChange}
        getOptionLabel={(e) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* {e.img} */}
            <span style={{ marginLeft: "10px" }}>{e.code} joke</span>
          </div>
        )}
      />
    </div>
  );
}

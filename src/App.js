import React, { useEffect, useState } from "react";
import "./App.css";
//Model class for Capitals custom array
class CapitalItem {
  constructor(index, name) {
    this.index = index;
    this.name = name;
  }
}
const App = () => {
  //Initializing posts array
  const [posts, setPost] = useState(null);
  //Initializing capitals array
  const capitals = [];

  //API call to fetch all posts
  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/independent?status=true&fields=languages,capital,region"
    )
      .then((data) => data.json())
      .then((data) => {
        //save api response to posts array
        setPost(data);
      });
      
  }, []);



  //Extract capitals from posts array using nested loop
  if (posts !== null ) {
    posts.map((post, index) => {
      post.capital.map((capital) => {
        //Use model class to bind index and capital
        const capitalItem = new CapitalItem(index, capital);
        //Save capitalItem(model) to capitals array
        capitals.push(capitalItem);
      });
    })
  
  }
  

//Initialze selected capital item varialble(To show selected capital name in a button)
  const [selectedItem, setSelectedItem] = useState("");

  //Initalise selected capital index(To show languages/area)
  const [selectedIndex, setSelectedIndex] = useState(null);
  //Initialize selected posts varialble(To show languages/area)
  const [selectedObject, setSelectedObject] = useState(null);

  //Item click variable to show selected capital in a button
  const handleItemClick = (text, index) => {
    const selectedPost = posts[index];  
    
    //set selected text in button
    setSelectedItem(text);
    //set selected index
    setSelectedIndex(index);
    //set selected post
    setSelectedObject(selectedPost);
    
  };

  return (
    <div className="container">
      
        <div className="section1">
          <div className="container_test">
          
            <div>
              <h1 className="bor-c">Capitals</h1>
              {capitals.map((capital) => {
                return (
                  <h3 onClick={
                    () => handleItemClick(`${capital.name}`, capital.index)
                    
            
                  }>
                    {capital.name}
                  </h3>
                );
              })}
            </div>
            <div>
              <button className="butt">{selectedItem ? selectedItem : "No Selection"}</button>
            </div>
          </div>
        </div>
        <div className="section2">   
         <div>
         <h2 className="border">{selectedItem ? `${selectedItem} Languages` : "No Selection"}</h2>
      <ul>{
      selectedObject !== null ? (
  <div>
  {Object.entries(selectedObject.languages).map(([code, name]) => (
          <li key={code}>
             {name}
          </li>
        ))}
  </div>
) : (
  <p>Data is null</p>
)
}
      
      </ul>
    </div>
    </div>
        <div className="section3">{selectedIndex !== null ? (
  <div>
                  <h1 className="reg-bar">Region</h1>
  <p> {selectedObject.region}</p>
  </div>
) : (
  <p>Data is null</p>
)}</div>
      </div>
  );
};

export default App;

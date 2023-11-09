import React, { useEffect, useState } from "react";
import "./App.css";
class CapitalItem {
  constructor(index, name) {
    this.index = index;
    this.name = name;
  }
}
const App = () => {
  const [posts, setPost] = useState(null);
  const capitals = [];

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/independent?status=true&fields=languages,capital,region"
    )
      .then((data) => data.json())
      .then((data) => {
        setPost(data);
      });
      
  }, []);



  if (posts !== null ) {
    posts.map((post, index) => {
      post.capital.map((capital) => {
        const capitalItem = new CapitalItem(index, capital);
        capitals.push(capitalItem);
      });
    })
  
  }
  


  const [selectedItem, setSelectedItem] = useState("");

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);

  const handleItemClick = (text, index) => {
    const selectedPost = posts[index];  
    
    setSelectedItem(text);
    setSelectedIndex(index);
    setSelectedObject(selectedPost);
    
  };

  return (
    <div className="container">
      
        <div className="section1">
          <div className="container_test">
          
            <div>
              <h1>Capitals</h1>
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
                  <h1>Region</h1>
  <p> {selectedObject.region}</p>
  </div>
) : (
  <p>Data is null</p>
)}</div>
      </div>
  );
};

export default App;

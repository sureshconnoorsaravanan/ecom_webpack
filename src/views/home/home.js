import React, { useEffect, useState } from "react";
import AltText from "@utils/altText.txt"

const Home = () => {
  const [product, setProduct] = useState([]);
  const fetchData = async() =>{
    const response = await fetch(process.env.API_URL);
    const data = await response.json();
    setProduct(data.products.slice(0,10));
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (<>
    <h3>Product list</h3>
    <div className="ProductContainer">
      {product.map((curr, index)=>{
        return (
          <div className={"productDiv"}>
            <img alt={curr.title || AltText} src={curr.images[0]} />
            <span>{curr.title} - {curr.category.toUpperCase()}</span>
          </div>
        )
      })}
    </div></>
  );
};

export default Home;
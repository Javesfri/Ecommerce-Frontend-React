import"./ProductPageStyles.css"
import { ProductDetail } from "../../components/ProductDetail/ProductDetail"; 
import { useEffect, useContext, useState } from "react";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { useParams } from "react-router";
import { AppContext } from "../../context/AppContext";

export const ProductPage = () => {
  const { loading, setLoading } = useContext(AppContext);
  const [item, setItem] = useState({})
  const {id} = useParams()
  useEffect(() => { 

    async function fetchProduct(id) {
      try {
        setLoading(true)
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (!response.ok) {
          const error = await response.json();
          console.log(await error);
        } else {
          const content = await response.json();

          setItem(content.payload);
        }
      } catch (error) {
        console.log(error);
      }finally{
        setTimeout(()=>{setLoading(false)},900)
      }
    }

    fetchProduct(id);
  }, [id]);
  return (
    <>{loading ? <LoadingSpinner/> : <div className="containerProductDetail">
    <ProductDetail product={item}></ProductDetail>
  </div>}</>
    
  );
};


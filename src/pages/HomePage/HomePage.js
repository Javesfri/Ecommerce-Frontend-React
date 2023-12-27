import React, { useEffect,useState } from "react";
import './HomePageStyles.css'
import { CarouselDestacados } from "../../components/CarouselDestacados/CarouselDestacados";
import { CarouselOfertas } from "../../components/CarouselOfertas/CarouselOfertas";
import Container from 'react-bootstrap/Container';



export const HomePage =() =>{
  const [items,setItems]=useState([])  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:8080/api/products/offers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
          const data = await response.json(); // Espera a que se resuelva la promesa
          console.log(data.payload)
          setItems(data.payload); // Ahora puedes ver los datos en la consola
          // Procesa los datos recibidos aquí
        
      } catch (error) {
        console.log(error); // Maneja errores aquí
      }
    }

    fetchProducts();
  }, []);
  
  return (
    <>
    
   <div className="containerPrincipal" >
      <CarouselDestacados/>
       <h2>Ofertas</h2>
       {items.length==0?<div>Cargando...</div>:<CarouselOfertas products={items} />}
    </div>
    </>
  )
}

import Carousel from 'react-bootstrap/Carousel';
import './CarouselDestacadosStyles.css'
 export const CarouselDestacados = ()=>{


    return (
      <Carousel className="CarouselContainer">
      <Carousel.Item>
        <img src='1.gif' className="carouselGif"/>
      </Carousel.Item>
      <Carousel.Item>
      <img src='2.gif' className="carouselGif"/>
      </Carousel.Item>
      <Carousel.Item>
      <img src='3.gif' className="carouselGif" />
      </Carousel.Item>
    </Carousel>
      );
}


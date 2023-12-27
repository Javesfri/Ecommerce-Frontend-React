import React from 'react';
import './CarouselOfertasStyles.css'
import { Card, Button } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules'

const productos = [
  {
    id: 1,
    nombre: 'Producto 1',
    descripcion: 'Descripción del producto 1',
    imagen: 'pcoficinaintel.png',
    precio: '$10.00',
  },
  {
    id: 2,
    nombre: 'Producto 2',
    descripcion: 'Descripción del producto 2',
    imagen: 'perifericoredragon2.png',
    precio: '$15.00',
  },
  {
    id: 1,
    nombre: 'Producto 1',
    descripcion: 'Descripción del producto 1',
    imagen: 'pcoficinaintel.png',
    precio: '$10.00',
  },
  {
    id: 3,
    nombre: 'Producto 2',
    descripcion: 'Descripción del producto 2',
    imagen: 'perifericoredragon2.png',
    precio: '$15.00',
  },
  {
    id: 4,
    nombre: 'Producto 1',
    descripcion: 'Descripción del producto 1',
    imagen: 'pcoficinaintel.png',
    precio: '$10.00',
  },
  {
    id: 5,
    nombre: 'Producto 2',
    descripcion: 'Descripción del producto 2',
    imagen: 'perifericoredragon2.png',
    precio: '$15.00',
  },
  // Agrega más productos según sea necesario
];


export const CarouselOfertas = ({products}) => {
  (<></>
  );
};

/* <Card key={producto.id} >
              <Card.Img className={styles.cardImage} variant="top" src={producto.imagen} />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Card.Text>Precio: {producto.precio}</Card.Text>
                <Button variant="primary">Comprar</Button>
              </Card.Body>
            </Card>*/
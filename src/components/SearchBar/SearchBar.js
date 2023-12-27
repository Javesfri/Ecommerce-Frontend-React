import "./SearchBarStyles.css"
import {React, useRef} from "react";
import { useNavigate } from "react-router-dom"; 
import Form from 'react-bootstrap/Form';
import { BiSearchAlt } from "react-icons/bi";

export const SearchBar = () => {
  const navigate = useNavigate()
  const datForm=useRef()
  const consultarForm = async (e) => {
    e.preventDefault();
    
    const datosFormulario = new FormData(datForm.current)
    const data =(Object.fromEntries(datosFormulario));
    const search=data.search
    console.log(search)
    navigate(`/products?search=${search}`)
  }
  return (
    <Form className="formContenedor" onSubmit={consultarForm} ref={datForm}>
      <input  name="search"type="text" placeholder="Buscar.." />
      <button type="submit">
        <BiSearchAlt className="searchIcon" />
      </button>
    </Form>
  );
};


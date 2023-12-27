import "./ProductsPageStyles.css";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useLocation } from "react-router-dom";
import { ProductFilter } from "../../components/ProductsFilter/ProductsFilter";
import { ProductList } from "../../components/ProductsList/ProductsList";
import { ProductsPagination } from "../../components/ProductsPagination/ProductsPagination";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
export const ProductsPage = () => {
  const [items, setItems] = useState(null);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [brandsArray, setBrandsArray] = useState([]);
  const { loading, setLoading } = useContext(AppContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); //Convierto las query en pare
  const queryParamsObject = Object.fromEntries(searchParams.entries());
  
 
  useEffect(() => {
    // Definir la función fetchProducts dentro del useEffect
    async function fetchProducts(query) {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/products?${query}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          const data = await response.json();
          console.log(data)
          // Manejar el caso en el que la respuesta no es "ok"
        } else {
          const content = await response.json();
          // Procesar los datos recibidos aquí
          console.log(content)
          setItems(content);
          if (!queryParamsObject.category) {
            const uniqueCategories = new Set();
            content?.payload.data.docs.forEach((item) => {
              uniqueCategories.add(item.category);
            });
            setCategoriesArray(Array.from(uniqueCategories));
          }
          if (!queryParamsObject.brand) {
            const uniqueBrands = new Set();
            content?.payload.data.docs.forEach((item) => {
              uniqueBrands.add(item.brand);
            });
            setBrandsArray(Array.from(uniqueBrands));
          }
        }
      } catch (error) {
        console.error(error);
        // Manejar errores aquí
      } finally {
        setTimeout(() =>{setLoading(false);},1000)
        
      }
    }

    // Lógica para construir el queryString basado en tus props o estado actual
    const { all, search, sort, category, brand, limit, page } =
      queryParamsObject;
    const queryParams = {};
    if (all !== undefined) {
      queryParams.all = all;
    } else {
      if (search !== undefined) {
        queryParams.search = search;
      }
    }
    if (category !== undefined) {
      queryParams.category = category;
    }
    if (brand !== undefined) {
      queryParams.brand = brand;
    }
    if (sort !== undefined) {
      queryParams.sort = sort;
    }
    if (limit !== undefined) {
      queryParams.limit = limit;
    }
    if (page !== undefined) {
      queryParams.page = page;
    }
    const queryString = new URLSearchParams(queryParams).toString();

    // Llamar a la función fetchProducts con el queryString construido
    if (search || sort || category || brand || limit || page || all) {
      fetchProducts(queryString);
    } else {
      // Manejar el caso en el que no haya criterios de búsqueda
      console.log("No hay criterios de búsqueda");
    }

    //configuro los filter
  
  }, [location, ]); // Dependencia del useEffect, ajusta según sea necesario*/

  return (
    <>
    {console.log(loading)}
      {loading ? 
        <LoadingSpinner/>
       : 
        <div className="containerPage">
          <div className="containerProductParams">
            <div className="containerParams">
              <h3 className="title">Productos</h3>
              {!categoriesArray ? null : (
                <ProductFilter
                  filterTitle={"Categorias"}
                  filterArray={categoriesArray}
                  pathname={"/products"}
                  query={queryParamsObject}
                  filterBy={"category"}
                ></ProductFilter>
              )}
              {!brandsArray ? null : (
                <ProductFilter
                  filterTitle={"Marcas"}
                  filterArray={brandsArray}
                  pathname={"/products"}
                  query={queryParamsObject}
                  filterBy={"brand"}
                ></ProductFilter>
              )}
            </div>
            {items ? (
              <>
                <div className="containerProducts">
                  {items?.length === 0 ? (
                    <p>Cargando</p>
                  ) : (
                    <>
                      <ProductList items={items.payload.data.docs} />
                    </>
                  )}
                  <div className="containerPagination">
                    <ProductsPagination
                      currentPage={items?.payload.data.page}
                      prevPage={items?.payload.data.prevPage}
                      nextPage={items?.payload.data.nextPage}
                      totalPages={items?.payload.data.totalPages}
                      query={queryParamsObject}
                    ></ProductsPagination>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      }
    </>
  );
};

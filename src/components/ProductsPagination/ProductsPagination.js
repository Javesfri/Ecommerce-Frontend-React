import "./ProductPaginationStyles.css"
import { Link } from "react-router-dom"
export const ProductsPagination =({currentPage,prevPage,nextPage,totalPages,query})=>{
    console.log(prevPage,currentPage,nextPage,totalPages,query)
    return(<div className="paginationContainer">
        {prevPage !== null ? <Link className="buttonPrevNext" to={{pathname:"/products",query:{...query,page:prevPage}}}>Anterior</Link>:null}
        <div className="buttonCurrentPage">{currentPage}</div>
        <div className="buttonTotalPages"> De {totalPages}</div>
        {nextPage !== null ? <Link className="buttonPrevNext" to={{pathname:"/products",query:{...query,page:nextPage}}}>Siguiente</Link>:null}

        </div>)

}


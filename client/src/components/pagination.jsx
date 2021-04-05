import React from 'react';
const Pagination = ({productsperpage,totalproducts,paginate}) => {
    
      const pageNumbers = [];
      for( let i=1; i<=Math.ceil(totalproducts/productsperpage);i++)
      {
          pageNumbers.push(i);
      }
    
    
    
    return (  
        <React.Fragment>
        <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    {pageNumbers.map((i)=>(
          <li className="page-item"><a onClick={()=>paginate(i)} className="page-link" href="#">{i}</a></li>
    ))}
             
    
   
    
  
   
  </ul>
</nav>
</React.Fragment>
    );
}
 
export default Pagination;
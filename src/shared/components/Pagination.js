import React from 'react';
import {useLocation, Link} from 'react-router-dom';

const Pagination = ({pages}) => {
    const {pathname, search} = useLocation();
    const querry = new URLSearchParams(search);
    const {total, limit, hasPrev, hasNext, currentPage, prev, next } = pages;
    const totalPages = Math.ceil(total/limit);

    const formatURL = (page) => {
        querry.set('page', page)
        return `${pathname}?${querry.toString()}`
    }

    const renderPagesHTMl = (delta = 2) => {
        const pagesHTML = [];
        const left = currentPage - delta;
        const right = currentPage + delta;
        for (let i = 1; i<=totalPages; i++){
            if(i ===1|| i === currentPage || i === totalPages ||(i >= left && i <= right)){
                pagesHTML.push(i)
            }
        }
        return pagesHTML
    }

    return (
        <ul className ='pagination'>
           {
              hasPrev ? (
                   <li className='page-item' >
                       <Link to ={formatURL(prev)} className="page-link" >Trang trước</Link>
                   </li>
               ):null
           }
           {
               renderPagesHTMl().map((page) => {
                   return (
                    <li className={`page-item ${currentPage===page?'active':''}`}>
                        <Link to ={formatURL(page)} className='page-link' >{page}</Link>
                    </li>
                   )
               })
           }
           {
              hasNext ? (
                <li className='page-item'>
                    <Link to ={formatURL(next)} className={`page-link` } >Trang sau</Link>
                </li>
            ):null  
           }
        </ul>
    )
}

export default Pagination;
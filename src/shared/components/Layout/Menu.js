import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { getCategories } from '../../../services/Api'

function Menu() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
     getCategories().then(res => {
       setCategories(res?.data?.data?.docs)
     }).catch(err => console.log(err))
    },[])
    
    return (
        <nav>
            <div id="menu" className="collapse navbar-collapse">
                <ul>
                     {
                        categories && categories.map((category) =>  {
                           return  <li key={category._id} className="menu-item"><Link to={`/categories/${category._id}`}>{category.name}</Link></li>
                        })
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Menu

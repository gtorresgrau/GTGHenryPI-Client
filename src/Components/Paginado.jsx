import React from "react";
import Style from './Styles/Paginado.module.css'

export default function Paginado (prop){

const { allPages, countriesPage, setPage, page } = prop

function handlerNext(){
    if(page <= (pageNumber.length-1))setPage(page + 1)
};

function handlerPrev(){
    if(page>1)setPage(page - 1);
};

let pageNumber = [];

let pages = Math.ceil(allPages/countriesPage)

if(allPages - 9 > 0) pages += 1;
for(let i=1; i<= pages ; i++){
        pageNumber.push(i)
    }
    
if(pageNumber.length !== 26 && pageNumber.length !== 1) pageNumber.pop();

    return(
            <div className={Style.pages}>
                <div><button onClick={handlerPrev} disabled={false} id='prev' className={Style.btn}>{"<<<"} </button></div>
                <div className={Style.numbers}>
                    {pageNumber?.map(page => ( 
                            <li key={page} id={page}>
                                <button onClick ={()=>setPage(page)} className={Style.btnN}>{page}</button>
                            </li>
                        ))
                    }
                </div>
                <div><button onClick={handlerNext} disabled={false} id='next' className={Style.btn}> {">>>"} </button></div>
            </div>
    )

};
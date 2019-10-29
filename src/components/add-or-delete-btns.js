import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

const AddOrDeleteBtns = (props)=>{
    const plusIcon = <FontAwesomeIcon icon={faPlus}/>
    const deleteIcon = <FontAwesomeIcon icon={faTrashAlt}/>
    const addBtn = props.active.add?<button onClick={()=>props.func.addNewBanner()} className='btns' disabled><span>{plusIcon}</span>Add</button>
    :<button onClick={()=>props.func.addNewBanner()} className='btns'><span>{plusIcon}</span>Add</button>;

    const deleteBtn = props.active.delet?<button onClick={()=>props.func.deleteBanner()} className='btns disactive'><span>{deleteIcon}</span>Delete</button>
    :<button onClick={()=>props.func.deleteBanner()} className='btns'><span>{deleteIcon}</span>Delete</button>
    return(
        <ButtonsSection>
            <div className='btns-container'>
            {addBtn}
            {deleteBtn}
            </div>
        </ButtonsSection>
        
    )
}

const ButtonsSection = styled.div`
 width:90vw;
 height:30vh;
 margin:0 auto;
 display:flex;
 flex-direction:column;
 align-items:flex-end;
`

export {AddOrDeleteBtns};
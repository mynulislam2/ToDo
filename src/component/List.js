import React from 'react';
import { Button } from 'react-bootstrap';

const List = ({list,index,completed,DeleteList}) => {
    return (
        <div className='d-flex justify-content-center'>
               <div className='border p-4 w-50 mt-4' key={list._id} >
            <p className={`${completed ? 'line_through' : ""}`}>{index + 1} . TaskName : {list.TaskName} , TaskDescription : {list.TaskDescription}</p> <Button className='ms-4' onClick={() => DeleteList(list?._id)}>Delete</Button>
        </div> 
        </div>

    );
};

export default List;
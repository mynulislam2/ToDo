import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import swal from 'sweetalert';
import '../App.css';
import List from '../component/List';
const Home = () => {
    const [Todo, setTodo] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [engineStart, setEngineStart] = useState(false);
  useEffect(() => {
    axios.get('https://enigmatic-harbor-97729.herokuapp.com/Todo'
    ).then(data => { setTodo(data.data) })
  }, [engineStart]);


  const DeleteList = (id) => {
    const url = `https://enigmatic-harbor-97729.herokuapp.com/Todo/${id}`
    axios.delete(url)
      .then(data => {
        if (data.data.acknowledged) {
          setEngineStart(!engineStart)

        }
      })

  }

  const HandleTodo = (event) => {
    event.preventDefault()
    const TaskName = event.target.TaskName.value
    const TaskDescription = event.target.TaskDescription.value

    axios.put('https://enigmatic-harbor-97729.herokuapp.com/Todo', {
      'TaskName': TaskName,
      'TaskDescription': TaskDescription

    }
    )
      .then(data => {
        if (data.data.acknowledged) {
          setEngineStart(!engineStart)
        }
      })

  }
  const complete = () => {
    swal({
      title: "Successfully completed!",
      icon: "success",
    });
    setCompleted(!completed)
  }

    return (
        <div >
        <div className="d-flex w-100 justify-content-center">
          <Form onSubmit={HandleTodo} >
            <FormControl
            width={200}
              name="TaskName"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <textarea
            cols={60}
            rows={5}
            className="mt-3"
              name="TaskDescription"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <FormControl
                        width={200}

              type="submit"
              placeholder="Description"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </Form>
  
        </div>
  
        <div>
          {
            Todo.map((list, index) => <List completed={completed} list={list} index={index} DeleteList={DeleteList}></List>)
          }
        </div>
        <div className='d-flex justify-content-center'><Button className='w-25 mt-5 mb-2' onClick={complete}>complete</Button></div>
      </div>
    );
};

export default Home;
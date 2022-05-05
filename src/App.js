import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'; 
import Axios from 'axios'; 


function App() {
    const [name, setName] = useState(''); 
    const [age, setAge] = useState(0); 
    const [listOfFriends, setListOfFriends] = useState([]); 

    function updateFriend(id) {
        //alert('update friend')
        //console.log(id)
        const newAge = prompt("Enter new age:");
        Axios.put('http://localhost:3001/update', {
            newAge: newAge,
            id: id
        }).then(() => {
            setListOfFriends(listOfFriends.map((val) => {
                return val._id == id ? { _id: id, name: val.name, age: newAge } : val
            }))
        })
    }

    function deleteFriend(id) {
        //alert('delete friend')
        //console.log(id)
        Axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => {
                setListOfFriends(listOfFriends.filter((val) => {
                    return val._id != id;
                }))
            })
    }

    function addFriend() {
        //alert(name + age)
        Axios.post('http://localhost:3001/add', {
            name: name, 
            age:age
        }).then((response) => {
            console.log('sucess')
            setListOfFriends([...listOfFriends, { name: name, age: age, id: response.data._id }]);
        }).catch((error) => {
            console.log('error')
        })
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/read')
            .then((response) => {
                //console.log(response.data.friends);
                setListOfFriends(response.data.friends);
                console.log(listOfFriends)
            }).catch((error) => {
                console.log(error)
            })
    }, [])


    return (
        <div className="form">
            <input type="text" className="name" placeholder="Enter Name" onChange={(e) => { setName(e.target.value) }} />
            <input type="number" className="age" placeholder="Enter Age" onChange={(e) => { setAge(e.target.value) }} />
            <button type="button" onClick={addFriend}>Add</button>

            <div className="listOfFriends">

            {listOfFriends.map((item) => {
                return (
                    <div className="friend">
                        <div className="friend_details">
                        <h3>{item.name}</h3>
                        <h3>{item.age}</h3>
                         </div>
                        <button onClick={() => {updateFriend(item._id)}}>Update</button>
                        <button onClick={() => {deleteFriend(item._id)}}>X</button>
                    </div>
                )
            })}

            </div>
        </div>
  );
}

export default App;

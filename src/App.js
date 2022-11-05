import React, { useState, useEffect } from "react";
import "./App.css";
import { useGetUsersQuery } from "./services/users";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendar,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

function App() {
  const [person, setPerson] = useState(null);
  const [value, setValue] = useState("random Person");
  const [title, setTitle] = useState("name");

  const { data, isLoading, refetch } = useGetUsersQuery();

  useEffect(() => {
    if(data){
      const randomPerson = data.results[0];
      const {
        phone,
        email,
        dob: { age },
      } = randomPerson;
      const { large: image } = randomPerson.picture;
      const { password } = randomPerson.login;
      const { first, last } = randomPerson.name;
      const {
        street: { number, name },
      } = randomPerson.location;


      const newPerson = {
        image,
        phone,
        email,
        password,
        age,
        street:`${number} ${name}`,
        name:`${first} ${last}`
      };
  
      setPerson(newPerson);
      setTitle("name"); 
      setValue(newPerson.name);
    }
   
  }, [data]);

 const handelValue=(event)=>{

  if(event.target.classList.contains("icon")){
    const newValue=event.target.dataset.label;
    setTitle(newValue);
    setValue(person[newValue]);
  }
 }

  return (
    <main>
      <div className="block bcg-black"></div>
        <div className="block">
          <div className="container">
            <img
              src={person && person.image}
              alt={person && person.name}
              className="user-img"
            />
            <p className="user-title">My {title}</p>
            <p className="user-value">{value}</p>
            <div className="values-list">
              <button
                data-label="name"
                onMouseOver={handelValue}
                className="icon"
              >
                <FaUser />
              </button>
              <button
                data-label="email"
                onMouseOver={handelValue}
                className="icon"
              >
                <FaEnvelopeOpen />
              </button>
              <button
                data-label="age"
                onMouseOver={handelValue}
                className="icon"
              >
                <FaCalendar />
              </button>
              <button
                data-label="street"
                onMouseOver={handelValue}
                className="icon"
              >
                <FaMap />
              </button>
              <button
                data-label="phone"
                onMouseOver={handelValue}
                className="icon"
              >
                <FaPhone />
              </button>
              <button
                data-label="password"
                onMouseOver={handelValue}
                className="icon"
              >
                <FaLock />
              </button>
            </div>

            <button className="btn" type="button" onClick={()=>refetch()}>
              {isLoading ? "Loading. . ." : "Random User"}
            </button>
          </div>
        </div>
    </main>
  );
}

export default App;

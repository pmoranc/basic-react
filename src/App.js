import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

/*
  1. Make a counter
  2. Fetch an API (https://randomuser.me/api)
  3. Display the API data in UI Components
  4. Add a button to load more results
*/

export default function App() {
  const [counter, setCounter] = useState(0);
  const [apiResponse, setApiResponse] = useState("");
  const [userData, setUserData] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const UserCard = ({ user }) => {
    const getFirstLastName = (data) => {
      const {
        name: { first, last }
      } = data;
      return `${first} ${last}`;
    };

    return (
      <div>
        <p>{getFirstLastName(user)}</p>
        <img alt="user-thumbnail" src={user.picture.thumbnail} />
      </div>
    );
  };

  useEffect(() => {
    axios
      .get(`https://randomuser.me/api?page=${pageNumber}`)
      .then(function (response) {
        const data = response.data.results;
        setApiResponse(JSON.stringify(data));
        setUserData(data);
      });
  }, [pageNumber]);

  return (
    <div className="App">
      <h3>Counter</h3>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increment counter</button>
      <button onClick={() => setPageNumber(pageNumber + 1)}>Load More</button>
      {userData.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
      <h3>Fetch and print API</h3>
      {apiResponse}
    </div>
  );
}

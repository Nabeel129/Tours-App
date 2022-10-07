import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project';

function App() {
  const [loading, setLoading] = useState(true);
  const [tour, setTour] = useState({});

  const removeTour = (id) => {
    const newTours = tour.filter((tour) => tour.id !== id);
    setLoading(true);
    setTour(newTours);
    setLoading(false);
  }

  const getTours = async () => {
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    setLoading(true);
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setTour(json);
    setLoading(false);
  }

  useEffect(() => {
    getTours()
  }, [])


  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }

  if (tour.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No More Tours Left</h2>
          <button className='btn' onClick={getTours}>refresh tours</button>
        </div>
      </main>
    )
  }

  return (
    <>
      <main>
        <Tours tours={tour} removeTour={removeTour} />
      </main>
    </>
  )
}

export default App

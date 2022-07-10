import React, { useState, useEffect } from 'react'

import './App.css';

import Pagination from './components/Pagination'

const url = 'https://jsonplaceholder.typicode.com/posts'

function Post(props) {
  const { id, title, body } = props.data
  return (
    <div className="post">
      <small>{id}</small>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  )
}

function App() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) return response.json()
        throw new Error('something went wrong while requesting posts')
      })
      .then((posts) => setPosts(posts))
      .catch((error) => setError(error.message))
  }, [])

  if (error) return <h1>{error}</h1>

  return (
    <div>
      {posts.length > 0 ? (
        <>
          <Pagination
            data={posts}
            RenderComponent={Post}
            title="Posts"
            pageLimit={5}
            dataLimit={10}
          />
        </>
      ) : (
       <h1>No Posts to display</h1>
      )}
    </div>
  );
}

export default App;

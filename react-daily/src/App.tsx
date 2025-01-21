import { getPost } from "./api-integrate/api-index";
import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";
import "./App.css"
//import "./components/PostCard.css"

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const [data, setData] = useState<Post[] | null>(null); // Specify the type of data

  useEffect(() => {
    getPost().then((posts) => setData(posts));
  }, []);

  return (
    <div>
      <h3> ~ Post Cards UI ~ </h3>
      <h5>with API integration</h5>
      {data ? (
        <ul>
          {data.map((Post) => (
            <PostCard key={Post.id} post={Post} />
          ))}
        </ul>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
}

export default App;

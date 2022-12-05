import { useState, useEffect } from 'react';

const PostsCom = () => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    await fetch('https://codebuddy.review/posts')
      .then(response => response.json())
      .then(data => setPosts(data.data.posts));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <h5 className="text-center mt-4 mb-4 purple-text big-text">List Of Posts</h5>
          {posts.map(element => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={element.id}>
              <div className="card m-2">
                <img src={element.image} alt="client-img" />
                <div className="p-3 purple-bg card-text">
                  <h5 className="white-text big-text">{`${element.firstName} ${element.lastName}`}</h5>
                  <p className="white-text">{element.writeup}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostsCom;

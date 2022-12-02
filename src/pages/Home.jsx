import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const gotoForms = () => navigate('/forms');

  return (
    <main>
      <div className="bg-light d-flex flex-column align-items-center body-container">
        <p className='text-center'>Fillup the form to see the posts</p>
        <p>
          <Button onClick={()=>gotoForms()}>Go to the form</Button>
        </p>
      </div>
    </main>
  );
};

export default Home;

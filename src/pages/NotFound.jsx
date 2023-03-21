import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Error from '../assets/images/error.png';
import Navigation from '../component/Navigation';

const NotFound = () => {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      history.push('/login');
    }
  }, []);

  return (
    <div>
      <Navigation />
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center justify-content-center full_height">
            <div className="col-lg-4 col-md-5 col-12 text-center">
              <img src={Error} alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;

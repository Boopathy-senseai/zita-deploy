import { Component } from 'react';
import { Spinner } from 'react-bootstrap';

export class NotFound extends Component {
  render() {
    return (
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center justify-content-center full_height">
            <div className="col-lg-4 col-md-5 col-12 text-center">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default NotFound;

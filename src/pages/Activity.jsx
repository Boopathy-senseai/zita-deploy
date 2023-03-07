import { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Envelope, House, TelephoneFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import ActivityTabData from '../shortcodes/ActivityTabData';
import HistoryTabData from '../shortcodes/HistoryTabData';
export class Activity extends Component {
  render() {
    return (
      <>
        <section className="section-padding">
          <div className="container">
            <div className="row align-items-center justify-content-center full-height">
              <div className="col-12">
                <h5 className="mb-4">Activity Log</h5>
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <h5 className="mb-1">Anjali sharma</h5>
                      </div>
                      <div className="col-auto">
                        <button className="btn btn-success btn-sm min-btn-width">
                          Admin
                        </button>
                        <button className="btn btn-warning btn-sm min-btn-width mx-2">
                          Active
                        </button>
                      </div>
                      <div className="col text-md-right">
                        <Link
                          to="/"
                          className="text-primary font-weight-bold text-underline"
                        >
                          Back to manage users
                        </Link>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12 mb-1">
                        <Envelope className="mr-2" /> carol@gradvali.com
                      </div>
                      <div className="col-12 mb-1">
                        <TelephoneFill className="mr-2" /> +1 254 254 1254
                      </div>
                      <div className="col-12">
                        <House className="mr-2" /> Human Resource
                      </div>
                    </div>
                  </div>
                </div>
                <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example">
                  <Tab eventKey="overview" title="Overview">
                    <ActivityTabData />
                  </Tab>
                  <Tab eventKey="history" title="History">
                    <HistoryTabData />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Activity;

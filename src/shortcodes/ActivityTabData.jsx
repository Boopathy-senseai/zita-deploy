import { Component } from 'react';

export class ActivityTabData extends Component {
  render() {
    return (
      <>
        <div className="card">
          <div className="card-body">
            <h5>Jobs Creation and Posting</h5>
            <div className="row mt-3 mb-5">
              <div className="col-12 col-md-2_5">
                <div className="card">
                  <div className="card-body">
                    <h6>Jobs Created</h6>
                    <div className="text-center py-2">
                      <h4 className="font-weight-bold">5</h4>
                    </div>
                    <small>Last Updated: 4 Hours ago</small>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2_5">
                <div className="card">
                  <div className="card-body">
                    <h6>Jobs Posted</h6>
                    <div className="text-center py-2">
                      <h4 className="font-weight-bold">5</h4>
                    </div>
                    <small>Last Updated: 4 Hours ago</small>
                  </div>
                </div>
              </div>
            </div>
            <h5>Candidates Sourcing</h5>
            <div className="row mt-3">
              <div className="col-12 col-md-2_5">
                <div className="card">
                  <div className="card-body">
                    <h6>Candidates Uploded</h6>
                    <div className="text-center py-2">
                      <h4 className="font-weight-bold">5</h4>
                    </div>
                    <small>Last Updated: 4 Hours ago</small>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2_5">
                <div className="card">
                  <div className="card-body">
                    <h6>Candidates Unckload</h6>
                    <div className="text-center py-2">
                      <h4 className="font-weight-bold">5</h4>
                    </div>
                    <small>Last Updated: 4 Hours ago</small>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2_5">
                <div className="card">
                  <div className="card-body">
                    <h6>Candidates Shortlisted</h6>
                    <div className="text-center py-2">
                      <h4 className="font-weight-bold">5</h4>
                    </div>
                    <small>Last Updated: 4 Hours ago</small>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2_5">
                <div className="card">
                  <div className="card-body">
                    <h6>Candidates Hired</h6>
                    <div className="text-center py-2">
                      <h4 className="font-weight-bold">5</h4>
                    </div>
                    <small>Last Updated: 4 Hours ago</small>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2_5">
                <div className="card">
                  <div className="card-body">
                    <h6>Candidates Rejected</h6>
                    <div className="text-center py-2">
                      <h4 className="font-weight-bold">5</h4>
                    </div>
                    <small>Last Updated: 4 Hours ago</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ActivityTabData;

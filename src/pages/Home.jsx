import { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import ManageUsersTableData from '../shortcodes/ManageUsersTableData';
export class Home extends Component {
  render() {
    return (
      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="mb-4">Page Name</h4>
              <Tabs
                defaultActiveKey="manageusers"
                id="uncontrolled-tab-example"
              >
                <Tab eventKey="manageusers" title="Manage Users">
                  <ManageUsersTableData />
                </Tab>
                <Tab eventKey="tab2" title="tab 2">
                  NO Data
                </Tab>
                <Tab eventKey="tab3" title="tab 3">
                  NO Data
                </Tab>
                <Tab eventKey="tab4" title="tab 4">
                  NO Data
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;

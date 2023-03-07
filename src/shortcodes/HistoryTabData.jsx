import { Component } from 'react';

export class HistoryTabData extends Component {
  render() {
    return (
      <>
        <div className="card">
          <div className="card-body">
            <h6 className="mb-4">List Of Actions taken by the user</h6>
            <div className="table-responsive table_min_height">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Actions Taken</th>
                    <th scope="col">Pages</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>20 May 21</td>
                    <td>Anjali Sharma Created a Job Title Sinior Developer</td>
                    <td>Create & Post Job</td>
                  </tr>
                  <tr>
                    <td>20 May 21</td>
                    <td>Anjali Sharma Created a Job Title Sinior Developer</td>
                    <td>Create & Post Job</td>
                  </tr>
                  <tr>
                    <td>20 May 21</td>
                    <td>Anjali Sharma Created a Job Title Sinior Developer</td>
                    <td>Create & Post Job</td>
                  </tr>
                  <tr>
                    <td>20 May 21</td>
                    <td>Anjali Sharma Created a Job Title Sinior Developer</td>
                    <td>Create & Post Job</td>
                  </tr>
                  <tr>
                    <td>20 May 21</td>
                    <td>Anjali Sharma Created a Job Title Sinior Developer</td>
                    <td>Create & Post Job</td>
                  </tr>
                  <tr>
                    <td>20 May 21</td>
                    <td>Anjali Sharma Created a Job Title Sinior Developer</td>
                    <td>Create & Post Job</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HistoryTabData;

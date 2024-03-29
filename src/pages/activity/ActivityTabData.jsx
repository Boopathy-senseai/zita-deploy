import axios from 'axios';
import { useEffect, useState } from 'react';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';

const ActivityTabData = (props) => {
  const [activities, setactivities] = useState({});

  useEffect(() => {
    axios
      .get('user-activity-count/' + props.userId + '/')
      .then((res) => {
        setactivities(res.data.data.activities);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.userId]);
  
  return (
    activities && (
      <div className="card1" style={{ marginBottom: 20, marginTop: 10}}>
      {/* <div className="card1" style={{ marginBottom: 20 }}> */}
        <div className="card-body" style={{paddingLeft:"5px"}}>
          {Object.keys(activities).map((item, index) => {
            return (
              <div className="row " key={index}>
                <div className="col-12 mb-3">
                  <Text bold size={14}>
                    {item === '1'
                      ? 'Job Creation and Postings'
                      : 'Candidates Sourcing'}
                  </Text>
                </div>
                {activities[item].map((data) => {
                  return (
                    <div key={data.name} className="col-12 col-md-2 mb-4 pb-1">
                      <div className="card cardHo">
                        <div className="card-body px-1 text-center"
                             style={{ paddingTop: 8, paddingBottom: 8 }}>
                          <Flex columnFlex>
                            <Text color="theme">{data.name}</Text>
                            <Text style={{ paddingTop: 4 }} bold>
                              {data.count}
                            </Text>
                          </Flex>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default ActivityTabData;

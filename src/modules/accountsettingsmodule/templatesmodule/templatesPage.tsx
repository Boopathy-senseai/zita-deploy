import React, { useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text';
import SvgJobPipeline from '../../../icons/SvgJobPipeline';
import SvgMessages from '../../../icons/SvgMessages';
import SvgMessage from '../../../icons/SvgMessage';
import { Button, LinkWrapper } from '../../../uikit';
import SvgAdd from '../../../icons/SvgAdd';
import SvgDotMenu from '../../../icons/SvgDotMenu';
import SvgBack from '../../../icons/SvgBack';
import JobPipelinePage from './jobPipelinePage';

import styles from './templates.module.css';

const TemplatesPage = () => {
  const [template, setTemplate] = useState(0);
  const [pipeline, setPipeline] = useState(0);
  const [pipelineData, setPipelineData] = useState([
    {
      id: 1,
      name: 'Zita',
      default: true,
    },
    {
      id: 2,
      name: 'Front end dev',
      default: false,
    },
    {
      id: '3',
      name: 'Back end dev',
      default: false,
    },
  ]);
  const selectTemplate = () => {
    setTemplate(1);
  };
  const selectPipeline = () => {
    setPipeline(1);
  };
  const backFunction = () =>{
    setPipeline(0);
  }

  if (template === 0) {
    return (
      <Flex row marginTop={'20px'}>
        <Flex flex={2}>
          <Card className={styles.cardStructure}>
            <Flex row start className={styles.cardHeader}>
              <SvgJobPipeline height={16} width={16} />
              <Text color="theme" bold size={16} style={{ marginLeft: '10px' }}>
                Job Pipeline
              </Text>
            </Flex>

            <Text style={{ marginTop: '10px' }}>
              Create, modify, reorder, and delete job pipeline stages
            </Text>

            <Button className={styles.btn} onClick={() => selectTemplate()}>
              <Text color="theme">Manage Pipeline</Text>
            </Button>
          </Card>
        </Flex>
        <Flex flex={2}>
          <Card className={styles.cardStructure}>
            <Flex row start className={styles.cardHeader}>
              <SvgMessages height={16} width={16} />
              <Text color="theme" bold size={16} style={{ marginLeft: '10px' }}>
                Message Templates
              </Text>
            </Flex>
            <Text style={{ marginTop: '10px' }}>
              Design and send the custom message{' '}
            </Text>
            <Button className={styles.btn} onClick={() => selectTemplate()}>
              <Text color="theme">Manage Templates</Text>
            </Button>
          </Card>
        </Flex>
        <Flex flex={2}>
          <Card className={styles.cardStructure}>
            <Flex row start className={styles.cardHeader}>
              <SvgMessage height={16} width={16} fill="#581845" />
              <Text color="theme" bold size={16} style={{ marginLeft: '10px' }}>
                Email Templates
              </Text>
            </Flex>
            <Text style={{ marginTop: '10px' }}>
              Easily Create, Analyse and send your Emails{' '}
            </Text>
            <Button className={styles.btn} onClick={() => selectTemplate()}>
              <Text color="theme">Manage Templates</Text>
            </Button>
          </Card>
        </Flex>
        <Flex flex={4}></Flex>
      </Flex>
    );
  }

  return (
    <>
      {pipeline === 0 ? (
        <Flex column>
          
          <Flex row between className={styles.titleBar}>
            <Flex
              row
              start
              className={styles.title}
              onClick={() => setTemplate(0)}
            >
              <SvgBack height={16} width={16} />
              <Text color="theme" bold size={16} style={{ marginLeft: '10px' }}>
                Job Pipeline
              </Text>
            </Flex>
            <LinkWrapper>
              <Button onClick={() => {}}>
                <Flex row center className={styles.pointer}>
                  <SvgAdd height={10} width={10} fill="#FFFFFF" />
                  <Text color="white" size={16} style={{ marginLeft: '10px' }}>
                    Add Pipeline
                  </Text>
                </Flex>
              </Button>
            </LinkWrapper>
          </Flex>
          <Flex row marginTop={'10px'}>
            {pipelineData.map((list) => (
              <Card key={list.id} className={styles.pipelineStructure}>
                <Flex row start between className={styles.rowGroup}>
                  <Flex row className={styles.cardHeader}>
                    <Text
                      color="theme"
                      bold
                      size={16}
                      style={{ marginLeft: '10px' }}
                    >
                      {list.name}
                    </Text>
                    {list.default === true ? (
                      <Text color="yellow" className={styles.default}>
                        Default
                      </Text>
                    ) : (
                      ''
                    )}
                  </Flex>
                  <Text>
                    <ActionsButton
                      onDefault={() => undefined}
                      onDelete={() => undefined}
                      onRename={() => undefined}
                    />
                  </Text>
                </Flex>

                <Button
                  className={styles.btn2}
                  onClick={() => selectPipeline()}
                >
                  <Text color="theme">Configure Pipeline</Text>
                </Button>
              </Card>
            ))}
          </Flex>
        </Flex>
      ) : (
        <JobPipelinePage  handleBack = {backFunction}/>
      )}
    </>
  );
};

const ActionsButton = ({ onRename, onDefault, onDelete }) => {
  return (
    <>
      <Dropdown className="dropdownButton dropleft">
        <Dropdown.Toggle
          style={{
            borderColor: 'unset',
            backgroundColor: 'unset',
            boxShadow: 'none',
          }}
          id="dropdown-basic"
        >
          <SvgDotMenu height={10} width={10} fill="#581845" />
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ minWidth: '5rem' }}>
          <Dropdown.Item onClick={onRename}>
            <Flex row center className={styles.dropDownListStyle}>
              <Text>Rename</Text>
            </Flex>
          </Dropdown.Item>
          <Dropdown.Item onClick={onDefault}>
            <Flex row center className={styles.dropDownListStyle}>
              <Text>Set as Default</Text>
            </Flex>
          </Dropdown.Item>
          <Dropdown.Item onClick={onDelete}>
            <Flex row center className={styles.dropDownListStyle}>
              <Text>Delete</Text>
            </Flex>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default TemplatesPage;

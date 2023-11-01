import React, { useState } from 'react'
import Modal from '../../../../uikit/Modal/Modal'
import { Button, Flex, InputText } from '../../../../uikit'
import RichText from '../../../common/RichText'
import { Text } from '../../../../uikit'
import styles from '../jdtemplate/jdopenmodal.module.css'


type Props = {
  open: boolean;
  handleJdModal: () => void
}

const JDopenModal = ({
  open,
  handleJdModal
}: Props) => {


  const [isTitle, setTitle] = useState("")
  const [isDescription, setDescription] = useState("")
  const [errordiscription, seterrordiscription] = useState(false)
  const [errortitle, seterrortitle] = useState(false)
  const handletitle = (e: any) => {
    setTitle(e.target.value)
    const title = e.target.value;
    if (title.length > 25) {
      seterrortitle(true)
    }
    else {
      seterrortitle(false)
    }
  }

  const handleDescription = (e: any) => {
    setDescription(e.target.value)
    const description = e.target.value;
    if (description.length > 2000) {
      seterrordiscription(true)
    } else {
      seterrordiscription(false)
    }
  }
  return (
    <div>
      <Modal open={open}>
        <Flex className={styles.addtemplatePopup}>
          <Text bold size={14} className={styles.titletext}>
            Add Template
          </Text>

          <Flex>
            <Flex>
              <InputText
                label="Template Title"
                labelBold
                className={styles.templatetitleInput}
                maxLength={26}
                onChange={handletitle}
                value={isTitle}
              />
            </Flex>
            {errortitle && (
              <Text color='error'>Maximum limit of title is 25</Text>
            )
            }
            <Flex>
              <Text bold color="theme" size={13}>
                Job Description
              </Text>
              <RichText

                height={200}
                onChange={handleDescription}
                value={isDescription}
              />
            </Flex>
            {errordiscription && (
              <Text color='error'>Maximum limit of description is 2000</Text>
            )
            }
          </Flex>

          <Flex className={styles.btnContainer}>
            <Flex row style={{ width: "130px", justifyContent: "space-between" }}>
              <Button types='close' onClick={handleJdModal}>
                Cancel
              </Button>
              <Button>
                Add
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </div>
  )
}

export default JDopenModal

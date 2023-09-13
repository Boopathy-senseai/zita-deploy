import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SvgCloseSmall from '../../../icons/SvgCloseSmall';
import SvgUpload from '../../../icons/SvgUpload';
import { AppDispatch, RootState } from '../../../store';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import Loader from '../../../uikit/Loader/Loader';
import Text from '../../../uikit/Text/Text';
import Toast from '../../../uikit/Toast/Toast';
import { userProfilePostMiddleWare } from '../../accountsettingsmodule/userprofilemodule/store/middleware/userprofilemiddleware';
import { imageFileAccept, mediaPath } from '../../constValue';
import { dashBoardMiddleWare } from './store/middleware/dashboardmiddleware';
import styles from './uploadprofile.module.css'; 

type Props = {
  profile: string;
  setMb: (arg: boolean) => void;
  circle?:boolean;
};

const UploadProfile = ({ profile, setMb,circle }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isShow, setShow] = useState(false);
  const [isLoader, setLoader] = useState(false);
  // image upload function
  const handleChangeImag = (e: any) => {
    e.preventDefault();
    var fileExt = e.target.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));

    if (imageFileAccept.indexOf(fileExt) < 0) {
      if (!isEmpty(fileExt)) {
        alert(
          'Invalid file selected, valid files are of ' +
            imageFileAccept.toString() +
            ' types.',
        );
      }
    } else if (e.target.files && e.target.files[0].size / 1024 / 1024 > 2) {
      setMb(true);
    } else {
      setLoader(true);
      const formData = new FormData();
      if (e.target.files[0] !== undefined) {
        formData.append('image', e.target.files[0]);
      } else {
        formData.append('image_null', '');
      }

      dispatch(
        userProfilePostMiddleWare({
          formData,
        }),
      ).then((res: any) => {
        if (res.payload.data.success) {
          dispatch(dashBoardMiddleWare()).then(() => {
            setLoader(false);
            Toast('Profile saved successfully', 'LONG', 'success');
          });
          setShow(false);
        }
      });
      setMb(false);
    }
  }; 
  useEffect(()=>{
    dispatch(dashBoardMiddleWare())
  },[])
  const { 
    profiles,
  } = useSelector(
    ({ dashboardReducers }: RootState) => {
      return { 
        profiles:dashboardReducers.profile,
      };
    },
  );

  // image remove function
  const handleRemoveProfile = () => {
    setLoader(true);
    const formData = new FormData();
    formData.append('image_null', '');
    dispatch(
      userProfilePostMiddleWare({
        formData,
      }),
    ).then((res: any) => {
      if (res.payload.data.success) {
        dispatch(dashBoardMiddleWare()).then(() => {
          setLoader(false);
          Toast('Profile Removed successfully', 'LONG', 'success');
        });
        setShow(false);
      }
    });
  };

  return (
    <Flex className={styles.overAll}>
      <label
        htmlFor="upload_profile___bannersetip__img"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{ margin: 0 }}
      >
        <input
          id="upload_profile___bannersetip__img"
          type="file"
          onChange={handleChangeImag}
          accept="image/*"
          className={styles.fileStyle}
        />
        {console.log(profiles,'llllllllllll')}
        <Flex className={circle?(styles.imgContainers):(styles.imgContainer)}>
          {isEmpty(profiles) || profiles === 'default.jpg' ? (
            <>
              {isLoader ? (
                <Flex center middle>
                  <Loader withOutOverlay size="medium" />
                </Flex>
              ) : (
                <Flex columnFlex center middle>
                  <SvgUpload />
                  <Text
                    color="black"
                    align="center"
                    style={{ paddingLeft: 4, paddingRight: 4 }}
                  >
                    Upload Your Profile Picture
                  </Text>
                </Flex>
              )}
            </>
          ) : (
            <>
              {isLoader ? (
                <Flex center middle>
                  <Loader withOutOverlay size="medium" />
                </Flex>
              ) : (
                <img
                style={{objectFit: 'cover'}}
                  className={circle?(styles.imgStyles):(styles.imgStyle)}
                  src={mediaPath + profiles}
                  alt="profile"
                //  key={Math.random().toString()}
                />
              )}
            </>
          )}

          {isShow && (
            <Flex columnFlex center middle className={circle?styles.changeStyles:styles.changeStyle} 
           
            >
              <SvgUpload />
              <Text
                color="black"
                align="center"
                style={{ paddingLeft: 4, paddingRight: 4 }}
              >
                {isEmpty(profiles) || profiles === 'default.jpg'
                  ? 'Upload Your Profile Picture'
                  : 'Change Profile Picture'}
              </Text>
            </Flex>
          )}
        </Flex>
      </label>
      {isShow && !isEmpty(profile) && profile !== 'default.jpg' && circle!==true && (
        <div
          title="Remove Profile Picture"
          className={styles.svgClose}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          onClick={handleRemoveProfile}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <SvgCloseSmall />
        </div>
      )}
    </Flex>
  );
};

export default UploadProfile;

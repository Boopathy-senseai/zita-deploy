import { useState } from 'react';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import SvgUpload from '../../icons/SvgUpload';
import { FILE_2MB, imageFileAccept } from '../../modules/constValue';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import styles from './imageupload.module.css';

type Props = {
  imgUrl: string | undefined;
  setFile: (a: any) => void;
  isClose?: boolean;
  borderRadius?: boolean;
  text?: string;
};
const ImageUpload = ({
  imgUrl,
  setFile,
  isClose,
  borderRadius,
  text,
}: Props) => {
  const [isShow, setShow] = useState(false);
  const [isMb, setMb] = useState(false);

  const handleChangeImag = (e: any) => {
    e.preventDefault();
    var fileExt = e.target.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (imageFileAccept.indexOf(fileExt) < 0) {
      alert(
        'Invalid file selected, valid files are of ' +
          imageFileAccept.toString() +
          ' types.',
      );
    } else if (e.target.files && e.target.files[0].size / 1024 / 1024 > 2) {
      setMb(true);
    } else {
      let reader = new FileReader();
      reader.onloadend = () => {
        setFile({
          file: e.target.files[0],
          imagePreviewUrl: reader.result,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
      setMb(false);
    }
  };

  return (
    <Flex columnFlex>
      <label
        htmlFor="bannersetip__img"
        className={styles.btnStyle}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Flex className={styles.imgContainer}>
          <img
            src={imgUrl}
            alt="Banner Img"
            className={borderRadius ? styles.imgStyle : styles.imgStyleNoRadius}
          />
          {isShow && (
            <Flex
              columnFlex
              center
              middle
              className={
                borderRadius ? styles.changeStyle : styles.changeStyleNoreadius
              }
            >
              {isClose && (
                <div
                  className={styles.svgCloseStyle}
                  tabIndex={-1}
                  role="button"
                  onKeyDown={() => {}}
                  onClick={() => {
                    setFile({});
                  }}
                >
                  <SvgCloseSmall />
                </div>
              )}
              <SvgUpload />
              <Text color="black" className={styles.text}>
                {text}
              </Text>
            </Flex>
          )}
        </Flex>
      </label>
      {isMb && (
        <Text size={12} color="error">
          {FILE_2MB}
        </Text>
      )}
      <input
        id="bannersetip__img"
        type="file"
        onChange={handleChangeImag}
        accept="image/*"
        className={styles.fileStyle}
      />
    </Flex>
  );
};

ImageUpload.defaultProps = {
  height: 100,
  width: 160,
  text: 'Change Banner',
};

export default ImageUpload;

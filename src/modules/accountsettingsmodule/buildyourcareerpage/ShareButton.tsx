import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  EmailShareButton,
  EmailIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import styles from './sharebutton.module.css';

type Props = {
  url: string;
  quote: string;
};
const ShareButton = ({ url, quote }: Props) => {
  return (
    <div className={styles.overAll}>
      <FacebookShareButton
        url={url}
        quote={quote}
        // hashtag={'#hashtag'}
      >
        <FacebookIcon size={32} />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} />
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} />
      </LinkedinShareButton>
      <EmailShareButton url={url}>
        <EmailIcon size={32} />
      </EmailShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={32} />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButton;

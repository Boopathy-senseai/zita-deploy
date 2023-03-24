import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

import SvgGmail from '../../../icons/SvgGmail';
import { JdForm } from './buildCareerPageTypes';
import styles from './sharebutton.module.css';

type Props = {
  url: string;
  jd_form?: JdForm;
};
const SocialShareButton = ({ url, jd_form }: Props) => {



 
  return (
    <div className={styles.overAll}>
      <FacebookShareButton url={`${url}#.facebook`} quote={jd_form?.job_title}>
        <FacebookIcon size={32} />
      </FacebookShareButton>
      <TwitterShareButton url={`${url}#.twitter`}>
        <TwitterIcon size={32} />
      </TwitterShareButton>
      <LinkedinShareButton url={`${url}#.linkedin`}>
        <LinkedinIcon size={32} />
      </LinkedinShareButton>
      <a
        rel="noreferrer"
        target={'_blank'}
        href={`https://mail.google.com/mail/u/0/?fs=1&to&su=${jd_form?.job_title}&body=${url}.gmailView&ui=2&tf=cm`}
      >
        <SvgGmail height={32} width={31} />
      </a>
      
      <WhatsappShareButton url={`${url}#.whatsapp`}>
        <WhatsappIcon size={32} />
      </WhatsappShareButton>
    </div>
  );
};

export default SocialShareButton;
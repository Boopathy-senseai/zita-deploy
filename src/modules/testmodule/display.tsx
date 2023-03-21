import { useSelector} from 'react-redux';
import styles from './display.module.css';
const Display = () => {
    const v = useSelector((state:{date:0,showDate:false}) => state.date)
    console.log(v);
    return (
        <div>
            You have selected
            <br></br>
            <span className={styles.display}>{v}</span>
        </div>
    )
}
export default Display;
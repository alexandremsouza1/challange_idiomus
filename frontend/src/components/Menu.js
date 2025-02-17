import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

function Menu() {
  return (
    <nav className={styles.navigation}>
      <div>
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/Images/logo.svg`} alt="Logo" className={styles.logo} />
        </Link>
      </div>
      <div>
        <Link to="/schedule" className={styles.menulink}>
          <img src={`${process.env.PUBLIC_URL}/Images/schedule.png`} alt="Icon 1" className={styles.menuimg} />
          Schedule
        </Link>
        <Link to="/leaderboard" className={styles.menulink}>
          <img src={`${process.env.PUBLIC_URL}/Images/leaderboard.png`} alt="Icon 1" className={styles.menuimg} />
          Leaderboard
        </Link>
      </div>
    </nav>
  );
}

export default Menu;
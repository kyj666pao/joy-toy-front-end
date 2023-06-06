// npm modules
import { NavLink } from 'react-router-dom'

// types
import { User } from '../../types/models'

//css
import styles from './NavBar.module.css'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props
  
  return (
    <nav className={styles.nav}>
      {user ?
        <ul>
          <li className={styles.title}>Joy Toy</li>
          {/* <li>Welcome, {user.name}</li> */}
          <li><NavLink to="/collections">Collections</NavLink></li>
          <li><NavLink to="/collections/new">Add Collections</NavLink></li>
          <li><NavLink to="/profiles">Profiles</NavLink></li>
          <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
          <li><NavLink to="/auth/change-password">Change Password</NavLink></li>
        </ul>
      :
        <ul>
          <li className={styles.title}>Joy Toy</li>
          <li><NavLink to="/auth/login">Log In</NavLink></li>
          <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar

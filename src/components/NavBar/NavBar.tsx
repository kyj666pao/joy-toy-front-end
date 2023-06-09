// npm modules
import { NavLink } from 'react-router-dom'

// types
import { User } from '../../types/models'

//css
import styles from './NavBar.module.css'

//logo image
import logo1 from '../../../public/assets/Strike_Freedom.svg'
import logo2 from '../../../public/assets/Joy_Toy.svg'

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
          <li><img src={logo1} alt="" /><img src={logo2} alt="" /></li>
          <li><NavLink to="/collections">Collections</NavLink></li>
          <li><NavLink to="/collections/new">Add Collections</NavLink></li>
          <li><NavLink to="/profiles">Profiles</NavLink></li>
          <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
        </ul>
      :
        <ul>
          <li><img src={logo1} alt="" /><img src={logo2} alt="" /></li>
          <li><NavLink to="/auth/login">Log In</NavLink></li>
          <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar

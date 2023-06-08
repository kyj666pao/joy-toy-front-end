// css
import styles from './Landing.module.css'

// types
import { User } from '../../types/models'

//logo image
const logo1: string = '../../../public/assets/Strike_Freedom.svg'
const logo2: string = '../../../public/assets/Joy_Toy.svg'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <main className={styles.container}>
      <h1>hello, {user ? user.name : 'friend'}</h1>
      <div className={styles.imgContainer}>
        <img className={styles.logo1} src={logo1} alt="" />
        <img className={styles.logo2} src={logo2} alt="" />
      </div>
      



    </main>
  )
}

export default Landing

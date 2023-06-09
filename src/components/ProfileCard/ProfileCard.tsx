//css
import styles from './ProfileCard.module.css'

// types
import { Profile } from '../../types/models'

//replace photo
import haroImg from '../../../public/assets/gundam_Haro.webp'


interface ProfileCardProps {
    profile: Profile
}

const ProfileCard = (props: ProfileCardProps) => {
    const { profile } = props

  return (
    <main className={styles.container} >
        
            <div className={styles.imgContainer}>
                <img src={profile.photo || haroImg} alt={`${profile.name}'s photo`} />
                { profile.collectionCount>0 && 
                  <div className={styles.collectionCount}>
                    <p>{profile.collectionCount}</p>
                  </div>}
            </div>
        
        <p>{profile.name}</p>
        {/* <p>{profile.collectionCount}</p> */}
    </main>
  )
}

export default ProfileCard
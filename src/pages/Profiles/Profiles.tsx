// npm modules
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// services
import * as profileService from '../../services/profileService'

// css
import styles from './Profiles.module.css'

// types
import { Profile, Collection } from '../../types/models'

// component
import ProfileCard from '../../components/ProfileCard/ProfileCard'

interface ProfilesProps {
  collectionList: Collection[]
}

const Profiles = (props: ProfilesProps): JSX.Element => {
  const { collectionList } = props
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect((): void => {
    const fetchProfiles = async (): Promise<void> => {
      try {
        const profileData: Profile[] = await profileService.getAllProfiles()
        for (let i = 0; i < profileData.length; i++ ) {
          profileData[i]["collectionCount"] = 0
          for (let j = 0; j < collectionList.length; j++) {
            if (collectionList[j]["profileId"] == profileData[i]["id"]) {
              profileData[i]["collectionCount"] += 1
            }
          }
        }
        setProfiles(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfiles()
  }, [])

  if (!profiles.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>
  }

  return (
    <main className={styles.container}>
      <h1>Collector List</h1>
      
      <div className={styles.cardContainer}>
        {profiles.map((profile: Profile) => (
          <Link to={`/profiles/${profile.id}`} state={profile}>
            <ProfileCard key={profile.id} profile={profile} />
          </Link>
          
        ))}
      </div>
      
    </main>
  )
}
 
export default Profiles

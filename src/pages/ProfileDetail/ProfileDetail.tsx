import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation, Link } from "react-router-dom"

//css
import styles from './ProfileDetail.module.css'

// services
import * as profileService from '../../services/profileService'
import * as collectionService from '../../services/collectionService'

// types
import { User, Profile, Collection } from '../../types/models'

//components
import CollectionCard from '../../components/CollectionCard/CollectionCard'

//replace photo
const haroImg: string = '../../../public/assets/gundam_Haro.webp'

interface ProfileDetailProps {
    user: User | null,
    updated: number,
    setUpdated: (value: number) => void
}

const ProfileDetail = (props: ProfileDetailProps) => {
    const { user, updated, setUpdated } = props
    const navigate = useNavigate()
    const { state } = useLocation()
    const { id } = useParams<{id?: string}>()
    const [onesCollectionList, setOnesCollectionList] = useState<Collection[] | null>(null);
    const profile: Profile | null = state

    const handleDeleteCollection = async(evt: React.MouseEvent, collectionId: number): Promise<void> => {
        evt.preventDefault()
        try {
            await collectionService.delete(collectionId)
            setUpdated(updated + 1)
            navigate(`/profiles/${id}` )
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!profile) navigate('/profiles')
    }, []);

    useEffect((): void => {
        const fetchOnesCollection = async (): Promise<void> => {
            const data: Collection[] = await profileService.show(id)
            setOnesCollectionList(data)
        }
        fetchOnesCollection()
    }, [id, updated]);

  return (
    <main className={styles.container}>
        <div className={styles.profileContainer}>
            <img src={profile?.photo || haroImg} alt={profile?.name} />
            <p>{profile?.name}</p>
            { user?.profile.id == profile?.id && 
            <Link to="/auth/change-password">Change Password</Link>}
            
        </div>
        <section className={styles.collectionContainer}>
            {onesCollectionList?.map((collection: Collection) => (
            <CollectionCard 
                key={collection.id}
                collection={collection}
                user={user}
                handleDeleteCollection={handleDeleteCollection}
            />
        ))}
        </section>
        
    </main>
  )
}

export default ProfileDetail
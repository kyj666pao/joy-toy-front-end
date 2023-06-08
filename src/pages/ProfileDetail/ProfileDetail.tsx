import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from "react-router-dom"

//css
import styles from './ProfileDetail.module.css'

// services
import * as profileService from '../../services/profileService'
import * as collectionService from '../../services/collectionService'

// types
import { User, Profile, Collection } from '../../types/models'

//components
import CollectionCard from '../../components/CollectionCard/CollectionCard'

interface ProfileDetailProps {
    user: User | null,
    updated: number,
    setUpdated: (value: number) => void
}

const ProfileDetail = (props: ProfileDetailProps) => {
    const { user, updated, setUpdated } = props
    const navigate = useNavigate()
    const { state } = useLocation()
    console.log("state", state)
    const { id } = useParams<{id?: string}>()
    const [onesCollectionList, setOnesCollectionList] = useState<Collection[] | null>(null);
    const profile: Profile | null = state
    console.log("profile",profile)

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
        {onesCollectionList?.map((collection: Collection) => (
            <CollectionCard 
                key={collection.id}
                collection={collection}
                user={user}
                handleDeleteCollection={handleDeleteCollection}
            />
        ))}
    </main>
  )
}

export default ProfileDetail
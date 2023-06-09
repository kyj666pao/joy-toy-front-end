import { useNavigate } from 'react-router-dom'

//css
import styles from './CollectionList.module.css'

//types
import { Collection, User } from '../../types/models'

//components
import CollectionCard from '../../components/CollectionCard/CollectionCard'

// services
import * as collectionService from '../../services/collectionService'

import logo1 from '../../../public/assets/Strike_Freedom.svg'


interface CollectionsProps {
    collections: Collection[]
    user: User | null
    updated: number,
    setUpdated: (value: number) => void
}

const CollectionList = (props: CollectionsProps) => {
    const { collections, user, updated, setUpdated } = props
    const navigate = useNavigate()


    const handleDeleteCollection = async(evt: React.MouseEvent, collectionId: number): Promise<void> => {
        evt.preventDefault()
        try {
            await collectionService.delete(collectionId)
            setUpdated(updated + 1)
            navigate('/collections' )
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <main className={styles.container}>
        <img className={styles.background} src={logo1} alt="" />
        {collections.map((collection: Collection) => (
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

export default CollectionList


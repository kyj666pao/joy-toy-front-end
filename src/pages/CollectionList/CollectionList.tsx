//css
import styles from './CollectionList.module.css'

//types
import { Collection, User } from '../../types/models'

//components
import CollectionCard from '../../components/CollectionCard/CollectionCard'

interface CollectionsProps {
    collections: Collection[]
    user: User | null;
}


const CollectionList = (props: CollectionsProps) => {
    const { collections, user } = props

  return (
    <main className={styles.container}>
        <h2>Collection List</h2>
        {collections.map((collection: Collection) => (
            <CollectionCard 
                key={collection.id}
                collection={collection}
                user={user}
            />
        ))}
    </main>
  )
}

export default CollectionList


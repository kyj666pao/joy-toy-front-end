//css
import styles from './CollectionList.module.css'

//types
import { Collection } from '../../types/models'

//components
import CollectionCard from '../../components/CollectionCard/CollectionCard'

interface CollectionsProps {
    collections: Collection[]
}


const CollectionList = (props: CollectionsProps) => {
    const { collections } = props

  return (
    <main className={styles.container}>
        <h2>Collection List</h2>
        {collections.map((collection: Collection) => (
            <CollectionCard 
                key={collection.id}
                collection={collection}
            />
        ))}
    </main>
  )
}

export default CollectionList


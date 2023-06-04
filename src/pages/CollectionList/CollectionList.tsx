//css
import styles from './CollectionList.module.css'

//types
import { Collection } from '../../types/models'

interface CollectionsProps {
    collections: Collection[]
}


const CollectionList = (props: CollectionsProps) => {
    const { collections } = props

  return (
    <main className={styles.container}>
        <h2>Collection List</h2>
        {collections.map((collection: Collection) => (
            <div key={collection.id}>
                {collection.title}
            </div>
        ))}
    </main>
  )
}

export default CollectionList


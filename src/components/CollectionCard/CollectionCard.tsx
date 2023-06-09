// npm modules
import { Link } from 'react-router-dom'

//css
import styles from './CollectionCard.module.css'

//types
import { Collection, User } from '../../types/models'

interface CollectionProps {
    collection: Collection
    user: User | null
    handleDeleteCollection: (evt: React.MouseEvent, collectionId: number)=> void
}


const CollectionCard = (props: CollectionProps) => {
    const { collection, user, handleDeleteCollection } = props

  return (
    
      <div className={styles.container}>
        <div className={styles.card}>
          <Link to={`/collections/${collection.id}`}>
            <h2>{collection.title}</h2>
          </Link>
          { collection.img && <img className={styles.img} src={collection.img} alt="" /> }
          <p>{collection.description}</p>
          <div className={styles.content}>
            <ul>
              {collection.type && 
                <li>Type: {collection.type}</li> }
              {collection.category && 
                <li>Category: {collection.category}</li>}
              {collection.series && 
                <li>Series: {collection.series}</li>}
              {collection.brand && <li>Brand: {collection.brand}</li>}
            </ul>
            
          </div>
        
        </div>
        { user?.profile.id == collection.profileId && 
          <div className={styles.userThings}>
            <div>
              <Link to={`/collections/${collection.id}/edit`} state={collection}>
              Edit
              </Link>
            </div>
            <button onClick={(evt) => handleDeleteCollection(evt, collection.id)}
              >Delete</button>
          </div>
        }
        
      </div>
    
    
  )
}

export default CollectionCard
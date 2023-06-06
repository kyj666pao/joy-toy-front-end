// npm modules
import { Link } from 'react-router-dom'

//css
import styles from './CollectionCard.module.css'

//types
import { Collection, User } from '../../types/models'

interface CollectionProps {
    collection: Collection
    user: User | null
}


const CollectionCard = (props: CollectionProps) => {
    const { collection, user } = props

    // console.log("id:",user?.profile.id, typeof user?.profile.id)
  return (
    
      <div className={styles.container}>
        <div className="card">
          <Link to={`/collections/${collection.id}`}>
            <h2>{collection.title}</h2>
          </Link>
          <img src={collection.img} alt="" />
        </div>
        { user?.profile.id == collection.profileId && 
          <div className="userThings">
            <div className="edit">
              <Link to={`/collections/${collection.id}/edit`} state={collection}>
              Edit
              </Link>
            </div>
            <button>delete</button>
          </div>
        }
        
      </div>
    
    
  )
}

export default CollectionCard
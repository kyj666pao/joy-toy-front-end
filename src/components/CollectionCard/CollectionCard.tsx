// npm modules
import { Link } from 'react-router-dom'

//css
import styles from './CollectionCard.module.css'

//types
import { Collection } from '../../types/models'

interface CollectionProps {
    collection: Collection
}


const CollectionCard = (props: CollectionProps) => {
    const { collection } = props
  return (
    <Link to={`/collection/${collection.id}`}>
      <div className={styles.container}>
          <h2>{collection.title}</h2>
          <img src={collection.img} alt="" />
      </div>
    </Link>
    
  )
}

export default CollectionCard
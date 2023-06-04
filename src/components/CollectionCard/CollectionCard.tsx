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
    <div className={styles.container}>
        <h2>{collection.title}</h2>
        <img src={collection.img} alt="" />
    </div>
  )
}

export default CollectionCard
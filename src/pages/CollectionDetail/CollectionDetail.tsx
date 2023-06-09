import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

//css
import styles from './CollectionDetail.module.css'

//types
import { Collection } from '../../types/models'

//service
import * as collectionService from '../../services/collectionService'

const CollectionDetail = () => {
    const { collectionId } = useParams<{collectionId?: string}>()
    const [collection, setCollection] = useState<Collection | null>(null);
    

    useEffect((): void => {
        const fetchCollection = async (): Promise<void> => {
            const data: Collection = await collectionService.show(collectionId)
            setCollection(data)
        }
        fetchCollection()
    }, [collectionId]);
    

  return (
    <main className={styles.container}>
        {collection && 
        <div>
            <h2>{ collection.title }</h2>
            <img src={collection.img} alt="" />
            <p>{collection.description}</p>
            <div className={styles.content}>
                <ul className={styles.contentList}>
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
        
        }
        
    </main>
  )
}

export default CollectionDetail
import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"

//css
import styles from './CollectionDetail.module.css'

//types
import { User, Collection } from '../../types/models'

//service
import * as collectionService from '../../services/collectionService'

interface CollectionProps {
    user: User | null
}

const CollectionDetail = (props: CollectionProps) => {
    const { user } = props
    const { collectionId } = useParams<{collectionId?: string}>()
    const [collection, setCollection] = useState<Collection | null>(null);
    

    useEffect((): void => {
        console.log(collectionId)
        const fetchCollection = async (): Promise<void> => {
            const Data: Collection = await collectionService.show(collectionId)
            setCollection(Data)
        }
        fetchCollection()
        console.log(collection)
    }, [collectionId]);
    

  return (
    <main className={styles.container}>
        {collection && 
        <div>
            <h2>{ collection.title }</h2>
            <img src={collection.img} alt="" />
            <h4>{ collection.description }</h4>
        </div>
        
        }
        
    </main>
  )
}

export default CollectionDetail
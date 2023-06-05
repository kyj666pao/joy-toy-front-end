import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"

//css
import styles from './CollectionDetail.module.css'

//types
import { User, Collection } from '../../types/models'

//service
import * as collectionService from '../../services/collectionService'



const CollectionDetail = () => {
    const { collectionId } = useParams<{collectionId?: string}>()
    const [collection, setCollection] = useState<Collection | null>(null);

    useEffect((): void => {
        const fetchCollection = async (): Promise<void> => {
            const Data: Collection = await collectionService.show(collectionId)
            setCollection(Data)
        }
        fetchCollection()
    }, [collectionId]);

  return (
    <main className={styles.container}>
        CollectionDetail
    </main>
  )
}

export default CollectionDetail
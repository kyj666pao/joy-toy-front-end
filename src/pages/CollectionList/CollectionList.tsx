import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//css
import styles from './CollectionList.module.css'

//types
import { Collection, User } from '../../types/models'

//components
import CollectionCard from '../../components/CollectionCard/CollectionCard'

// services
import * as collectionService from '../../services/collectionService'


interface CollectionsProps {
    collections: Collection[]
    user: User | null;
}

const CollectionList = (props: CollectionsProps) => {
    const navigate = useNavigate()
    const { collections, user } = props

    const handleDeleteCollection = async(evt: React.MouseEvent, collectionId: number): Promise<void> => {
        evt.preventDefault()
        try {
            await collectionService.delete(collectionId)
            navigate('/collections', {state: collections} )
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(collections)
    }, [collections]);

  return (
    <main className={styles.container}>
        <h2>Collection List</h2>
        {collections.map((collection: Collection) => (
            <CollectionCard 
                key={collection.id}
                collection={collection}
                user={user}
                handleDeleteCollection={handleDeleteCollection}
            />
        ))}
    </main>
  )
}

export default CollectionList


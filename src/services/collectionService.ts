// services
import * as tokenService from './tokenService'

//types
import { Collection } from '../types/models'
import { CollectionFormData, PhotoFormData } from '../types/forms'


const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/collections`

const addCollectionPhoto = async (
    collectionId: number , 
    photoData: PhotoFormData
    ): Promise<string> => {
        if (!photoData.photo) throw new Error("No photo found.")
        const imgData = new FormData()
        imgData.append('img', photoData.photo)
        try {
            const res = await fetch(`${BASE_URL}/${collectionId}/add-photo`, {
                method: 'PUT',
                headers: {
                'Authorization': `Bearer ${tokenService.getToken()}`
                },
                body: imgData
            })
            return await res.json() as string
        } catch (error) {
            throw error
        }
}

const create = async( 
    collectionFormData: CollectionFormData, 
    photoData?: PhotoFormData
    ): Promise<void> => {
        try {
            const res = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${tokenService.getToken()}`,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(collectionFormData)
            })
            const collection = await res.json()
            if (photoData?.photo) {
                await addCollectionPhoto(collection.id , photoData)
            }
        } catch (error) {
            throw error
        }
}

const index = async(): Promise<Collection[]> => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
        });
        return await res.json() as Collection[]
    } catch (error) {
        throw error
    }
}

const show = async(collectionId: string | undefined): Promise<Collection> => {
    try {
        const res = await fetch(`${BASE_URL}/${collectionId}`, {
            headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
        })
        return await res.json() as Collection
    } catch (error) {
        throw error
    }
}

const update = async( 
    collectionId: number,
    collectionFormData: CollectionFormData, 
    photoData?: PhotoFormData,
    ): Promise<void> => {
        try {
            const res = await fetch(`${BASE_URL}/${collectionId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${tokenService.getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(collectionFormData),
            })
            const collection = await res.json()
            if (photoData?.photo) {
                await addCollectionPhoto(collection.id , photoData)
            }
        } catch (error) {
            throw error
        }
}

const deleteCollection = async(collectionId: number): Promise<void> => {
    try {
        const res = await fetch(`${BASE_URL}/${collectionId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${tokenService.getToken()}`
            }
        })
        console.log(res.json())
    } catch (error) {
        throw error
    }
}

export {
    addCollectionPhoto,
    create,
    index,
    show,
    update,
    deleteCollection as delete
}
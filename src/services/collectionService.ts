// services
import * as tokenService from './tokenService'

//types
import { Collection } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/collections`

async function index(): Promise<Collection[]> {
    try {
        const res = await fetch(BASE_URL, {
            headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
        });
        return await res.json() as Collection[]
    } catch (error) {
        throw error
    }
}

export {
    index,
}
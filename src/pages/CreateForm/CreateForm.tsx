import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// css
import styles from './CreateForm.module.css'

// services
import * as authService from '../../services/authService'
import * as collectionService from '../../services/collectionService'

//types
import { Collection } from '../../types/models'
import { CollectionFormData, PhotoFormData } from '../../types/forms'

import React from 'react'

const CreateForm = () => {
    const navigate = useNavigate()
    const imgInputRef = useRef<HTMLInputElement | null>(null)

    const [formData, setFormData] = useState<CollectionFormData>({
      title: "",
      description: "",
      type: "",
      category: "",
      series: "",
      brand: "",
    })
    const [photoData, setPhotoData] = useState<PhotoFormData>({ photo: null })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [message, setMessage] = useState('')

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    
    const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (!evt.target.files) return
      const file = evt.target.files[0]
      let isFileInvalid = false
      let errMsg = ""
      const validFormats = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']
      const photoFormat = file.name.split('.').at(-1)
      if (file.size >= 10485760) {
        errMsg = "Image must be smaller than 10.4MB"
        isFileInvalid = true
      }
      if (photoFormat && !validFormats.includes(photoFormat)) {
        errMsg = "Image must be in gif, jpeg/jpg, png, svg, or webp format"
        isFileInvalid = true
      }
      
      setMessage(errMsg)
      
      if (isFileInvalid && imgInputRef.current) {
        imgInputRef.current.value = ""
        return
      }
  
      setPhotoData({ photo: evt.target.files[0] })
    }

    const {
      title,
      description,
      type,
      category,
      series,
      brand,
    } = formData

    const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
        evt.preventDefault()
        if (isSubmitted) return
        try {
          setIsSubmitted(true)
          await collectionService.create(formData, photoData)
          navigate('/collections')
        } catch (error) {
          console.log(error)
          setIsSubmitted(false)
        }
    }

    const isFormInvalid = () => {
      return !(title)
    }

  return (
    <main className={styles.container}>
        <h2>Add Collection</h2>
        <p>{message}</p>
        <form autoComplete='off' onSubmit={handleSubmit} className={styles.form} >
            <label htmlFor="title">Title
                <input type="text" name="title" value={title} onChange={handleChange} required/>
            </label>

            <label className={styles.label}>
              Upload Photo
              <input type="file" name="photo" onChange={handleChangePhoto} ref={imgInputRef}
              />
            </label>

            <label htmlFor="description">Description
                <input type="text" value={description} name='description' onChange={handleChange}  />
            </label>

            <label htmlFor="type">Type
                <input type="text" value={type} name='type' onChange={handleChange}  />
            </label>

            <label htmlFor="category">Category
                <input type="text" value={category} name='category' onChange={handleChange}  />
            </label>

            <label htmlFor="series">Series
                <input type="text" value={series} name='series' onChange={handleChange}  />
            </label>

            <label htmlFor="brand">Brand
                <input type="text" value={brand} name='brand' onChange={handleChange}  />
            </label>

            <button
              className={styles.button}
              disabled={ isFormInvalid() || isSubmitted }
            >
              {!isSubmitted ? 'Submit' : '🚀 Sending...'}
            </button>
        </form>

    </main>
  )
}

export default CreateForm
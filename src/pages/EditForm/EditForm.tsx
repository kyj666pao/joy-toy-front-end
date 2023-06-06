import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// css
import styles from './EditForm.module.css'

// services
import * as authService from '../../services/authService'
import * as collectionService from '../../services/collectionService'

//types
import { Collection } from '../../types/models'
import { CollectionFormData, PhotoFormData } from '../../types/forms'

import React from 'react'

const EditForm = () => {
  return (
    <main className={styles.container}>EditForm</main>
  )
}

export default EditForm
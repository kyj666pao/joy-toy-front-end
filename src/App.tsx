// npm modules 
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import CollectionList from './pages/CollectionList/CollectionList'
import CollectionDetail from './pages/CollectionDetail/CollectionDetail'
import CreateForm from './pages/CreateForm/CreateForm'
import EditForm from './pages/EditForm/EditForm'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as collectionService from './services/collectionService'

// styles
import './App.css'

// types
import { User, Profile, Collection } from './types/models'

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [collectionList, setCollectionList] = useState<Collection[]>([]);
  // const [collectionListLength, setCollectionListLength] = useState(collectionList.length);
  const navigate = useNavigate()
  
  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  // const handleAddCollection = async (
  //   collectionFormData: collectionFormData
  //   ): Promise<void> => {
  //     const newCollection = await collectionService.create(collectionFormData)
  // }

  useEffect((): void => {
    const fetchAllCollection = async (): Promise<void> => {
      const collectionData: Collection[] = await collectionService.index()
      console.log(collectionData)
      setCollectionList(collectionData)
    }
    fetchAllCollection()
  }, []);

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route 
          path="/collections/new"
          element={
            <ProtectedRoute user={user}>
              <CreateForm />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/collections"
          element={
            <ProtectedRoute user={user}>
              <CollectionList collections={collectionList} user={user}/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/collections/:collectionId"
          element={
            <ProtectedRoute user={user}>
              <CollectionDetail user={user} />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/collections/:collectionId/edit"
          element={
            <ProtectedRoute user={user}>
              <EditForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App

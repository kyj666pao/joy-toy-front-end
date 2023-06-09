// npm modules 
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ProfileDetail from './pages/ProfileDetail/ProfileDetail'
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
import { User, Collection } from './types/models'

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [collectionList, setCollectionList] = useState<Collection[]>([]);
  const navigate = useNavigate()
  const [updated, setUpdated] = useState<number>(0);
  
  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  useEffect((): void => {
    const fetchAllCollection = async (): Promise<void> => {
      const collectionData: Collection[] = await collectionService.index()
      setCollectionList(collectionData)
    }
    fetchAllCollection()
  }, [updated, user]);

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route 
          path="/collections/new"
          element={
            <ProtectedRoute user={user}>
              <CreateForm
                updated={updated}
                setUpdated={setUpdated}
              />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/collections"
          element={
            <ProtectedRoute user={user}>
              <CollectionList 
                collections={collectionList} 
                user={user}
                updated={updated}
                setUpdated={setUpdated}
              />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/collections/:collectionId"
          element={
            <ProtectedRoute user={user}>
              <CollectionDetail />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/collections/:collectionId/edit"
          element={
            <ProtectedRoute user={user}>
              <EditForm 
                updated={updated}
                setUpdated={setUpdated} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles collectionList={collectionList} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles/:id"
          element={
            <ProtectedRoute user={user}>
              <ProfileDetail
                user={user}
                updated={updated}
                setUpdated={setUpdated} />
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

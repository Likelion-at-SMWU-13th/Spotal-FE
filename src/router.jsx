import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Mypage from './pages/Mypage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import OnBoarding from './pages/OnBoardingPage.jsx'
import WritePage from './pages/WritePage.jsx'
import EditPage from './pages/EditPage.jsx'
import CommunityMyPostList from './pages/CommunityMyPostList'
import CommunityPostList from './pages/CommunityPostList'
import HomePage from './pages/HomePage.jsx'
import MapPage from './pages/MapPage'
import RecommendedPage from './pages/RecommendedPage'
import MemorySearchPage from './pages/MemorySearchPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <OnBoarding /> },
      { path: 'login', element: <Login /> },
      { path: 'mypage', element: <Mypage /> },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'writepage',
        element: <WritePage />,
      },
      {
        path: 'editpage/:memory_id',
        element: <EditPage />,
      },
      {
        path: 'mypost',
        element: <CommunityMyPostList />,
      },
      {
        path: 'post',
        element: <CommunityPostList />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'map',
        element: <MapPage />,
      },

      {
        path: 'recommended',
        element: <RecommendedPage />,
      },
      {
        path: 'memory',
        element: <MemorySearchPage />,
      },
    ],
  },
])

export default router

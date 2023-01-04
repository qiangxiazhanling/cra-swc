import {createBrowserRouter} from 'react-router-dom'
import BaseLayout from '@layout/Base'
import SignLayout from '@layout/Sign'
import Home from '@pages/Home'
import SignIn from '@pages/SignIn'
import SignUp from '@pages/SignUp'
import Test from '@pages/Test'

export default createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { path: '/', element: <Home /> },
    ]
  },
  {
    path: '/sign-in',
    element: <SignLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
    ]
  },
  {
    path: '/sign-up',
    element: <SignLayout />,
    children: [
      { path: '/sign-up', element: <SignUp /> },
    ]
  },
  {
    path: '/test',
    element: <Test />
  }
])

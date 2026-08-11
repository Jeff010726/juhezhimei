import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'

const Home = lazy(() => import('./pages/Home').then(({ Home }) => ({ default: Home })))
const Services = lazy(() => import('./pages/Services').then(({ Services }) => ({ default: Services })))
const Cases = lazy(() => import('./pages/Cases').then(({ Cases }) => ({ default: Cases })))
const About = lazy(() => import('./pages/About').then(({ About }) => ({ default: About })))
const Contact = lazy(() => import('./pages/Contact').then(({ Contact }) => ({ default: Contact })))

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Suspense fallback={<div className="route-loading" aria-label="页面加载中" />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="cases" element={<Cases />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

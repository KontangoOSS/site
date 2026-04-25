import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Guide } from './pages/Guide'
import { Article } from './pages/Article'
import { Hardware } from './pages/Hardware'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Docs } from './pages/Docs'
import { Concepts } from './pages/Concepts'
import { ConceptArticle } from './pages/ConceptArticle'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/guide/:slug" element={<Article />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/concepts" element={<Concepts />} />
        <Route path="/concepts/:slug" element={<ConceptArticle />} />
      </Routes>
    </Layout>
  )
}

export default App

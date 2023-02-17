import '../styles/App.css'
import '../styles/404.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { NavLink } from 'react-router-dom'

function Page404() {
  return (
    <div className="App">
      <Header/>
      <main id="main-404">
        <h1 id="h404">404</h1>
        <p id="p404">Oups! La page que vous demandez n'existe pas.</p>
        <p id="back"><NavLink to="/">Retourner sur la page d’accueil</NavLink></p>
      </main>
      <Footer/>
    </div>
  );
}

export default Page404
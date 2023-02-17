import '../styles/App.css'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'
import { useFetch } from '../hooks/FetchHook'

function App() {

  // using customhook + logements.json dans public directory ie root = window.location.origin
  const [isLoading, fetchedData, isfetchError] = useFetch(window.location.origin+'/logements.json')

  return (
    <div className="App">
      <Header/>
        <main className='main-home'>
          <Banner key="standard" type="standard"/>
          <Gallery dataset={fetchedData} error={isfetchError} loadingState={isLoading} />
        </main>
      <Footer/>
    </div>
  );
}

export default App
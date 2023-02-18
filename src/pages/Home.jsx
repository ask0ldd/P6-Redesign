import '../styles/App.css'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'
import Filters from '../components/Filters'
import { useFetch } from '../hooks/FetchHook'
import { useState } from 'react'

function App() {

  // using customhook + logements.json dans public directory ie root = window.location.origin
  let subDir = window.location.origin === "https://ask0ldd.github.io" ? "/P6-Redesign" : ""

  const [ filterValue, setFilterValue ] = useState(["any", "any"])
  const [ nResults, setnResults ] = useState(0)

  const [isLoading, fetchedData, isfetchError] = useFetch(window.location.origin + subDir + '/logements.json', filterValue, setnResults)

  return (
    <div className="App">
      <Header/>
        <main className='main-home'>
          <Banner key="standard" type="standard"/>
          <Filters nResults={nResults} setfv={setFilterValue}/>
          <Gallery dataset={fetchedData} error={isfetchError} loadingState={isLoading} />
        </main>
      <Footer/>
    </div>
  );
}

export default App
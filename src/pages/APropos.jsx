import '../styles/App.css'
import '../styles/APropos.css'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Collapse from '../components/Collapse'
import Footer from '../components/Footer'
import collapses from '../datasets/collapseContent' // importing the datas to fill the collapses

function APropos() {
  return (
    <div className="App">
      <Header/>
      <main className='main-apropos'>
        <Banner key="apropos" type="apropos"/>
        <section id="collapses-section">
        {collapses.map((collapse) => (<Collapse key={collapse.heading} heading={collapse.heading} body={collapse.body} headnbodystyle={['apropos-heading', 'apropos-body']}/>))}
        </section>
      </main>
      <Footer/>
    </div>
  );
}

export default APropos
import { useCallback } from 'react'
import logo from './logo.svg';
import './App.css';



const IMAGE_URL = '/testshare.jpg'

const downloadImageToFile = async () => {
  const download = await fetch(IMAGE_URL)

  const imageBlob = await download.blob()
  const file = new File([imageBlob], 'testshare.jpg', { type: imageBlob.type })
  console.log(imageBlob.type)

  return file

}


function App() {





  const onShare = useCallback(async () =>{
    const blob = await downloadImageToFile()

    const files = Object.freeze([blob])
    if(navigator.canShare && navigator.canShare({ files })) {
      console.log('share?')
      navigator.share({
        files,
        title: 'picture'
      })
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onShare}>Share</button>
      </header>
    </div>
  );
}

export default App;

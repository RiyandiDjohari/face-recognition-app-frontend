import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navbar from './components/Navbar/Navbar';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import MouseParticles from 'react-mouse-particles';
import Footer from './components/Footer/Footer';
import { useEffect, useState } from 'react';
import Clarifai from "clarifai";
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


const App = () => {
  const app = new Clarifai.App({
    apiKey: 'c2e0af16544d4867aedf007f9f192685'
   });
  
  const initialUserState = {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: "",
  }
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(initialUserState);

  useEffect(() => {
    fetch("http://localhost:3000")
      .then(res => res.json())
      .then(data => console.log(data))
    
  }, [])
  
  const onInputChange = (e) => {
    const {value} = e.target
    setInput(value);
  };

  const onPictureSubmit = () => {
    setImageUrl(input);
    app.models.predict({
      id: 'face-detection',
      name: 'face-detection',
      version: '6dc7e46bc9124c5c8824be4822abe105',
      type: 'visual-detector',
    }, input)
    .then(res => {
      if (res) {
        fetch("http://localhost:3000/image", {
          method: "put",
          headers: {'Content-Type': "application/json"},
          body: JSON.stringify({
            id: user.id,
          }),
        })
        .then(res => res.json())
        .then(data => setUser({
          ...user,
          entries: data.entries
        }))
      }
      displayFaceBox(calculateFaceLocation(res))
    })
    .catch(err => console.log(err))
  };

  const displayFaceBox = (box) => {
    setBox(box);
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  const onRouteChange = ( route ) => {
    route === "home" ? setIsSignedIn(true) : setIsSignedIn(false);
    setRoute(route);
  }

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
    })
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} color="#FFFFFF" num={100}/>
      <MouseParticles g={1} number={6} color="random" cull="col,image-wrapper"/>
      <Navbar onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
      { 
        route === "home" 
        ? 
        <>
          <Rank user={user}/>
          <ImageLinkForm onInputChange={onInputChange} onPictureSubmit={onPictureSubmit} /> 
          <FaceRecognition imageUrl={imageUrl} box={box}/> 
          <Footer />
        </>
        : (
          route === "signin" ? 
          <>
            <SignIn onRouteChange={onRouteChange} loadUser={loadUser}/> 
            <Footer />
          </>
          : 
          <>
            <Register onRouteChange={onRouteChange} loadUser={loadUser}/>
            <Footer />
          </>
        ) 
        
      }
    </div>
  );
}

export default App;

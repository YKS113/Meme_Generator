import React from "react";
import Header from "./Header.js";

export default function App(){
  
  const [meme, setMeme]= React.useState({
    Toptext: "",
    Bottomtext:"",
    randomImage: "http://i.imgflip.com/lbij.jpg"
  })
  const [allMemes , setallMemes] = React.useState([])
  React.useEffect(()=> {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setallMemes(data.data.memes))
  },[])
  let url
  function memeGenerator(){
    const randomNumber= Math.floor(Math.random() * allMemes.length)
    url = allMemes[randomNumber].url
    setMeme(prevMeme => ({
      ...prevMeme, 
      randomImage :url
    }))
  }
  const [memeData, setmemeData]= React.useState(
    {Toptext:"", Bottomtext:""}
  )
  function eventHandler(event){
    setmemeData(prevFormData=>{
                return {...prevFormData , [event.target.name] : event.target.value}}
                )
  }
  return(
    <>
    <Header/>
   <div className="mainDiv">
   <div className="firstDiv">
   <div className="text">Make memes for <br /> free in minutes.</div>
   <div className="text2">Design eye-catching memes with this online meme maker.</div>
    <div className="inputBoxes">
      <input className="inputBox" type="text" placeholder="Toptext" onChange={eventHandler} name="Toptext" value={memeData.Toptext}/>
      <input className="inputBox" type="text" placeholder="Bottomtext" onChange={eventHandler} name="Bottomtext" value={memeData.Bottomtext}/>
    </div>
    <div className="btnDiv"><button onClick={memeGenerator}>Get a new meme image</button></div>
    </div>
    <div className="imgContainer">
    <div className="imgContainer2">
    <p className="Toptext">{memeData.Toptext}</p>
    <img className="memeImg" src={meme.randomImage} alt="Click on Get a new meme image..!" />
    <p className="Bottomtext">{memeData.Bottomtext}</p>
    </div>
    </div>
    </div> 
    </>
  )
}
















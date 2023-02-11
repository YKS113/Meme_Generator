import React from "react";
import logo from "./images/meme.jpg"

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
    <div className="nav">
      <img src={logo} alt="" />
      <p>MemeGenerator</p> 
    </div>
    <div className="inputBoxes">
      <input className="inputBox" type="text" placeholder="Toptext" onChange={eventHandler} name="Toptext" value={memeData.Toptext}/>
      <input className="inputBox" type="text" placeholder="Bottomtext" onChange={eventHandler} name="Bottomtext" value={memeData.Bottomtext}/>
    </div>
    <div className="btnDiv">
    <button onClick={memeGenerator}>Get a new meme image</button>
    </div>
    <div className="imgContainer">
    <p className="Toptext">{memeData.Toptext}</p>
    <img className="memeImg" src={meme.randomImage} alt="" />
    <p className="Bottomtext">{memeData.Bottomtext}</p>
    </div>
    </>
  )
}








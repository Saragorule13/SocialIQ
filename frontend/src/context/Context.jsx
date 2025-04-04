//this file is used to store all the logics which are required to make chat possible

//We are using a context hook so that we can use these logics anywhere in the project

import { createContext, useState } from "react";
// import run from "../config/gemini";

//first we will create context hook and export it
export const Context = createContext();

//Now we will make a context provider function so we can store our logic in the function
const ContextProvider = (props) => {

    //creating some state variables so that we can get the response from the user and we can display it on screen
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompts, setPrevPrompt] = useState("")
    const [showResult, setShowResult] = useState(false); //to hide the main page and show result
    const [loading, setLoading] = useState(false); //loading animation
    const [resultData, setResultData] = useState(""); //display result on page


    //typing effect
    const delayPara = (index,nextWord)=>{
      setTimeout(function(){
        setResultData(prev=>prev+nextWord)
      }, 75*index)
    }

    const newChat = ()=>{
      setLoading(false)
      setShowResult(false)
    }

    //Creating an OnSent function which will be async so that it does that run synchronously 
    const OnSent = async (prompt) => {

      //displaying result on the screen
      setResultData("") //--> after running the fn result will be reset
      setLoading(true)
      setShowResult(true)
      setRecentPrompt(input)
      setPrevPrompt(prev=>[...prev,input])
      const response = await run(input)
      let responseArray = response.split("**");
      let newArray = "";

      for(let i=0; i<responseArray.length; i++){
        if(i===0 || i%2 !== 1){
          newArray += responseArray[i];
      } else{
        newArray += "<i>"+responseArray[i]+"</i>";
      }
      let newArray2 = newArray.split("*").join("</br>");
      setResultData(newArray2)
      // let newResponseArray = newArray2.split(" ");
      // for(let i=0; i<newResponseArray.length; i++){
      //   const nextWord = newResponseArray[i];
      //   delayPara(i,nextWord)
      // }
      setLoading(false)
      setInput("")
    }
  }

    // OnSent("What is full form of HTML")





  const contextValue = {
    //here we will store all the logics which are required to make chat possible
    prevPrompts,
    setPrevPrompt,
    recentPrompt,
    setRecentPrompt,
    input,
    setInput,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    OnSent,
    newChat
};

  return (
    //Sure! Imagine you have a big box with toys inside it. You want to share these toys with your friends who are playing with you. The <Context.Provider> is like a magical box that lets you share those toys (which are contextValue) with all your friends at once. The props.children are your friends who get to play with the toys you shared inside the box. So, this code is like opening the box and letting everyone play with the toys inside!
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
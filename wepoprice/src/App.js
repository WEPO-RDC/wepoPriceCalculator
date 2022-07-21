import React from 'react'
import logo from './weposvg.svg';
import {useState, useEffect} from 'react'
import './App.css';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';

let curr = 0

const url =""
const navUrl = "https://openapi.naver.com/v1/search/shop.json?query=아이폰x&display=10&start=1&sort=asc"


var myHeaders = new Headers();
myHeaders.append("apikey", "g24hgGCGe0R7JeBYZg8Exa4jYxfJqo9j");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};



const options ={
  method:'GET',
  headers:{
    'HOST':'openapi.naver.com',
    'Content-Type': 'plain/text',
    'X-Naver-Client-Id':'48kv9EUazWt_Cx52Wlf0',
    'X-Naver-Client-Secret': 'sx8P7Xrt6d'
  },
  mode: 'cors'
}
const prices = {
  input:'',
  usd: "",
  dhl: "",
  fedex: ""
}

const headersI ={
  'X-Naver-Client-Id': '48kv9EUazWt_Cx52Wlf0',
  'X-Naver-Client-Secret': 'sx8P7Xrt6d'
}

function Page() {
  const [price, setPrice] = useState(prices)
  const [input, setInput] = useState("")
  const [forex, setForex] = useState({})
  
  useEffect(function(){
    fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=USD%2CCDF&base=KRW", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result.rates)
    setForex(() => result.rates)
  })
  .catch(error => console.log('error', error));

  },[])


 


 

 
 

  useEffect(()=>{
    setPrice(prev => {
      let wonToUsd = Number(input) * forex.USD
      return{
        ...prev,
        input:Number(input),
        usd: (Number(input) * forex.USD).toFixed(1),
        dhl: ((wonToUsd + 45) / .7).toFixed(1),
        fedex: ((wonToUsd + 33) / .7).toFixed(1),
      }
  }
    )
  }, [input])

  function handleChange(event) {
    setInput(prev =>
       event.target.value.replace(/\D+/g, '')
        /*noNumber.test(event.target.value)===true 
        ? event.target.value.match(check).join('').length>0 ? event.target.value.match(check).join(''):0
        : event.target.value) */
    )

    

  }
  function updateObject(event){
    event.preventDefault()
    
  }
  /*function handleSubmit(event){
    setPrice( prev =>{
      event.preventDefault()
      return{
        ...prev,
        dhl: prev.input * 10,
        fedex: prev.input + 10
      }
    })
  }*/
  
    
    return (
      <div className='Main'>
        <div className="title-container">
        <img  alt="wepo-logo" id="wepo-logo"src={logo}></img>
        <h3>Price Calculator</h3>
        </div>
        <div className='calculator'>
            {forex.USD!==0 &&<p>Exchange rate: <span>1$ = {forex.USD} ₩</span></p>}
          
            <form onSubmit={updateObject} className="form">
              <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">PRICE</InputLabel>
              <OutlinedInput
              style={{background:'white', color:'black'}}
                id="outlined-adornment-amount"
                placeholder="Input the Buying price here"
                value={input}
                onChange={handleChange}
                startAdornment={<InputAdornment  position="start">₩</InputAdornment>}
                label="Amount"
              />
            </FormControl>
            {/*<button onClick={handleSubmit} id="submit" type='submit'>Calculate!</button>*/}
          </form>
          
            {(input.length>0||input !=="") && 
            <div style={{display:"flex", flexDirection:'column', justifyContent:'center', alignItems:'center', }}>
              <div className="priceUsd">
                <p>Buying price in dollar</p>
                <h3>${price.usd}</h3>
              </div>
              <hr/>
              <div className='result-container'>
                <div id="dhl" className='result'>
                  <h1>DHL</h1>
                  <h1>$ {price.dhl}</h1>
                </div>
                
                <div id="fedex" className='result'>
                  <h1>Fedex</h1>
                  <h1>$ {price.fedex}</h1>
                </div>
              </div>
            </div>
            }

            
        </div>
        <footer style={{margin:'auto', width: '300px', display:'flex', justifyContent:'center'}}>
          <p style={{padding:'4rem 0rem 2rem', position:'relative', bottom:'0px',fontSize:'10px'}}>© WEPO 2022</p>
        </footer>
      </div>
    );
}



export default Page;

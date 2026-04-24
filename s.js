const API_KEY='31297021fb41ce810b26854ba76fe5e4';
async function getWeather(){
 const city=document.getElementById('city').value.trim();
 const status=document.getElementById('status');
 const result=document.getElementById('result');
 if(!city) return;
 status.innerHTML='<div class="loading">Loading...</div>';
 result.innerHTML='';
 try{
   const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
   if(!res.ok) throw new Error('City not found');
   const data=await res.json();
   status.innerHTML='';
   result.innerHTML=`
   <div class="center">
     <h2>${data.name}, ${data.sys.country}</h2>
     <div class="temp">${Math.round(data.main.temp)}°C</div>
     <div class="desc">${data.weather[0].description}</div>
   </div>
   <div class="grid">
     <div class="card"><div class="small">Feels Like</div><strong>${Math.round(data.main.feels_like)}°C</strong></div>
     <div class="card"><div class="small">Humidity</div><strong>${data.main.humidity}%</strong></div>
     <div class="card"><div class="small">Wind</div><strong>${data.wind.speed} m/s</strong></div>
   </div>`;
 }catch(err){
   status.innerHTML=`<div class="error">${err.message}</div>`;
 }
}
window.onload=getWeather;


// -----------------------------------nav bar----------------------

const ActivePage = window.location.pathname;
console.log(ActivePage);

const activeNav = document.querySelectorAll('nav a').forEach(
    MyLinks => {
        if (MyLinks.href.includes(`${ActivePage}`)) {
            MyLinks.classList.add('Active');
        }

    }
)


// -----------------------------------Match Password Function----------------------
var check1 = function(){
    
    if (document.getElementById('pass').value ==
    document.getElementById('Cpass').value && document.getElementById('pass').value!=='') {
    document.querySelector('#CreateBuntton').disabled = false;
    document.getElementById('matched').innerHTML= 'Match';
    document.getElementById('matched').style.color="#0A7508";
  
  } 
  else if (document.getElementById('pass').value ==''||
  document.getElementById('Cpass').value==''){
    document.querySelector('#CreateBuntton').disabled = true;
    document.getElementById('matched').innerHTML= '';
  }
      else {
     document.querySelector('#CreateBuntton').disabled = true;
     document.getElementById('matched').innerHTML= 'Not Match';
     document.getElementById('matched').style.color="#CB0505";

  }
}
// -----------------------------------Show Password Function----------------------
function myfunction(){
    var show = document.getElementById('psw');
    if (show.type== 'password'){
        show.type='text';
    }
    else{
        show.type='password';
    }
}
// -----------------------------------GetLocation Function----------------------
function GetLocation() {
    // document.getElementById('check').innerHTML= navigator.geolocation.getCurrentPosition;
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
        console.log("in get location");
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("p").innerHTML = "Geolocation is not supported";
    }
}

// -----------------------------------showPosition Function----------------------
var x = document.getElementById("cityy");

function showPosition(position) {
   
      
      z3= calcCrow(position.coords.latitude, position.coords.longitude, 31.23926535269584,34.7909099763604 ); //distance to beersheba
      z4= calcCrow(position.coords.latitude, position.coords.longitude,32.072410,34.774327504 ); //distance to tlv
      z5= calcCrow(position.coords.latitude, position.coords.longitude,32.7965,35.015 ); //distamce to Haifa
      z6= calcCrow(position.coords.latitude, position.coords.longitude,29.56,34.95 );//distamce to Eilat
      z7= calcCrow(position.coords.latitude, position.coords.longitude, 32.091076, 34.878773 );//distamce to petach- tikva
      z8= calcCrow(position.coords.latitude, position.coords.longitude, 31.771712, 35.206815 );//distamce to Jerusalem
    
    if(z8<z3&& z8<z4 && z8<z5 && z8<z6 &&z8<z7){
        x.setAttribute('value' , "Jerusalem");
    }  
    else if(z6<z3&& z6<z4 && z6<z5 && z6<z7 && z6<z8){
 
        x.setAttribute('value' , "Eilat");
    }
    else if(z5<z3&& z5<z4 && z5<z6 && z5<z7 && z5<z8){
        
        x.setAttribute('value' , "Haifa");
    }
    else if(z4<z3&& z4<z6 && z4<z5 && z4<z7 && z4<z8){
     
        x.setAttribute('value' , "Tel aviv");
    }
    else if(z3<z6&& z3<z4 && z3<z5 && z3<z7 && z3<z8){

        x.setAttribute('value' , "Beer sheva");
    }
    else if(z7<z3&& z7<z4 && z7<z5 && z7<z6 &&z7<z8){
        x.setAttribute('value' , "Petach tikva");
    }
    

}



//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2)
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value)
{
    return Value * Math.PI / 180;
}

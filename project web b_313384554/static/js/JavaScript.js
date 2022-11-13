
// -----------------------------------nav bar----------------------
var ActivePage = window.location.pathname;
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
    if (document.getElementById('password').value ==
    document.getElementById('confirm_password').value) {
    document.querySelector('#SignUpButton').disabled = false;
    document.getElementById('matched').textContent= 'Match';
    document.getElementById('matched').style.color="0A7508";
  
  } 
  else if (document.getElementById('password').value ==''||
  document.getElementById('confirm_password').value==''){
    document.querySelector('#SignUpButton').disabled = true;
    document.getElementById('matched').textContent= '';
  }

      else {
     document.querySelector('#SignUpButton').disabled = true;
     document.getElementById('matched').textContent= 'Not Match';
     document.getElementById('matched').style.color="CB0505";

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
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
        console.log("in get location");
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("p").innerHTML = "Geolocation is not supported";
    }
}
// -----------------------------------showPosition Function----------------------

function showPosition(position) {
    var x = document.getElementById('p');
    var y = document.getElementById("BTN");
    x.innerHTML = "Latitude: " + position.coords.latitude 
    + "longtitide: " + position.coords.longitude;
}
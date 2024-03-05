function meuRelogio() {
    setTimeout(function() {
            var x = new Date().toLocaleTimeString();
          document.getElementById('rel').innerHTML = x;
    }, 3000);
  }


function setFontSize () {
  var desW = window.innerWidth;
  var demoW = 1082;
  if (desW > 640) {
    desW = 640;
    document.documentElement.style.width = desW + 'px';
  }else if (desW < 320) {
    desW = 320;
    document.documentElement.style.width = desW + 'px';
  }
  var rate = desW / demoW;
  document.documentElement.style.fontSize = 100 * rate + 'px';
  document.documentElement.style.width = desW + 'px';
  document.documentElement.style.margin = '0px auto  ';
}

function init () {
  window.addEventListener('resize',() => {
    setFontSize()
  })
  setFontSize()
}

export default init

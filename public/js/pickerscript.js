function renderColorCard(color){
  const colorObj = {};
  colorObj.color = color.toHex();
  colorObj.names = [colorObj.color];
  if (color.getHSL()[2] > .5) {
    colorObj.textColor = '#1c1c1c';
  }
  else {
    colorObj.textColor = '#f4f4f4';
  }
  return colorObj;
}

function handleForm(form) {

  const FD = new FormData(form);

  const colors = [];
  const firstColor = new Color(+FD.get('red'), +FD.get('green'), +FD.get('blue'));
  let offset;
  if (FD.get('complementary') === 'true'){
    offset = 1 / (+FD.get('shades'));
  }
  else {//then it is monochromatic
    offset = .05;
  }
  const firstColorCard = renderColorCard(firstColor);
  firstColorCard.names.unshift('Your Color:');
  colors.push(firstColorCard);
  for(let i = offset; i < offset * (+FD.get('shades')) - 0.0000000000000001; i += offset){
    colors.push(renderColorCard(firstColor.getHueShift(i)));
  }

  const cardHolder = document.querySelector('#colorCards');
  while (cardHolder.firstChild) { //clear all previous color cards
    cardHolder.removeChild(cardHolder.firstChild);
  }

  let newCard, pName;
  for ( colorCard of colors ) {
    newCard = document.createElement('li');
    newCard.style = 'background-color:' + colorCard.color + '; color:' + colorCard.textColor;
    for ( name of colorCard.names ) {
      pName = document.createElement('p');
      pName.textContent = name;
      newCard.appendChild(pName);
    }
    cardHolder.appendChild(newCard);
  }

  return false;
}

function decorate() {
  document.querySelector('#picker').addEventListener('submit', (event) => {event.preventDefault();});
  //console.log(document.querySelector('#picker'));
}

document.addEventListener('DOMContentLoaded', decorate);

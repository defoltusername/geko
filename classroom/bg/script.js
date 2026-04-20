const input = document.getElementById('colorInput');
const generateBtn = document.getElementById('generateBtn');
const changeBtn = document.getElementById('changeBtn');
generateBtn.addEventListener('click', () => {
  const hexChars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * 16)];
  }
  input.value = color;
});
changeBtn.addEventListener('click', () => {
  document.body.style.backgroundColor = input.value;
});
input.addEventListener('input', () => {
  if (!input.value.startsWith('#')) {

    input.value = '#' + input.value;
  }
});

console.log('index.js loaded...');

document.getElementById('testForm').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('testFormMessage').value = '';
  console.log(document.getElementById('testForm').elements['message'].value);
});

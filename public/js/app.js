console.log('Hi Yo, Im Javascript');



const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const weatherBoard = document.querySelector('textarea');

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();

    const search = searchInput.value;

    // removed 'http://localhost:3000' from Fetch link cause of Heroku
    fetch(`/weather?address=${search}`)
    .then((res) => {
    res.json().then((data) => {
        weatherBoard.textContent = 'loading...'
        if(data.error){
            weatherBoard.textContent = data.error;
        }else{
            weatherBoard.textContent =  `Location:${data.location}\ Temperature:${data.tempo} \ Weather:${data.weather}`;
        }
        

    })
    .catch(error => weatherBoard.textContent = error)
})

})
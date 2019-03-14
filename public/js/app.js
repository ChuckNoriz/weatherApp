console.log('Hi Yo, Im Javascript');



const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const weatherBoard = document.querySelector('textarea');

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();

    const search = searchInput.value;
    weatherBoard.textContent = 'loading...'
    // removed 'http://localhost:3000' from Fetch link cause of Heroku
    fetch(`/weather?address=${search}`)
    .then((res) => {
    res.json().then((data) => {
        
        if(data.error){
            weatherBoard.textContent = data.error;
        }else{
            weatherBoard.textContent =  `Location:${data.location}\ Temperature:${data.tempo} \ Weather:${data.weather} \ Time:${data.time}`;
        }
        

    })
    .catch(error => weatherBoard.textContent = error)
})

})
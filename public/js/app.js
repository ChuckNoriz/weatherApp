console.log('Hi Yo, Im Javascript');



const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const weatherBoard = document.querySelector('textarea');

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();

    const search = searchInput.value;

    fetch(`http://localhost:3000/weather?address=${search}`)
    .then((res) => {
    res.json().then((data) => {
        console.log(data)
        if(data.error){
            weatherBoard.textContent = data.error;
        }else{
            weatherBoard.textContent =  `Location:${data.location}\ Temperature:${data.tempo} \ Weather:${data.weather}`;
        }
        

    })
    .catch(error => weatherBoard.textContent = error)
})

})
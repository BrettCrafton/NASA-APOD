//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

//global variables to hold data
let nasaData
let todaysDate

//event listener for button
document.querySelector('button').addEventListener('click', getDate)
document.querySelector('#todayButton').addEventListener('click', todaysData)


//get and display todays NASA data
function todaysData(){
    fetch(`https://api.nasa.gov/planetary/apod?api_key=eeqtZzPhnt6pu3N1vSwXEEsCICMz3E2iiC5KPmps`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            nasaData = data
            todaysDate = data.date
            document.querySelector('#name').innerText = data.title
            document.querySelector('img').src = data.url
            document.querySelector('h3').innerText = data.explanation
            document.querySelector('span').innerText = "Today's Picture : " + nasaData.date
            console.log(todaysDate)
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}

//call above function
// todaysData()

//get data based on input parameters
function getDate(){
    //joke if date input is date from BTTF
    let searchDate = document.querySelector('input').value
    console.log(searchDate)
    if(Number(String(searchDate.split("-").join(""))) == 19551105){
        alert("Sorry Marty McFly, any altering of this timeline could create a paradox!")
          }
    //error for date before NASA started data
    else if(Number(String(searchDate.split("-").join(""))) < 19950616){
      alert("Nasa does not have data before 06/16/1995")
        }
    //error for date in the future    
    else if(Number(String(searchDate.split("-").join(""))) > Number(todaysDate.split("-").join(""))){
        alert("Sorry time traveler. NASA has not yet discovered time travel.")
            }
    //default if date parameters met
    else{
        console.log(searchDate)
        fetch(`https://api.nasa.gov/planetary/apod?api_key=eeqtZzPhnt6pu3N1vSwXEEsCICMz3E2iiC5KPmps&date=${searchDate}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                //error if there is no data for date listed (also catches inproper format)
                if(data.title == undefined){
                    alert("There is no data for this date. Please try a different date, or check that you entered a real date/proper format.")
                }
                //how to display video
                else if(data.media_type == "video"){
                    nasaData = data
                    document.querySelector('#mediaInput').innerHTML = `<iframe width="960" height="540" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>`
                    document.querySelector('#name').innerText = data.title
                    document.querySelector('iframe').src = data.url
                    document.querySelector('h3').innerText = data.explanation
                    document.querySelector('span').innerText = "Date : " + nasaData.date
                }
                //how to display everything else, is there anything else besides images?
                else{
                    nasaData = data
                    document.querySelector('#mediaInput').innerHTML = `<img src="" alt="">`
                    document.querySelector('#name').innerText = data.title
                    document.querySelector('img').src = data.url
                    document.querySelector('h3').innerText = data.explanation
                    document.querySelector('span').innerText = "Date : " + nasaData.date
                }
            })
            //error for fetching API
            .catch(err => {
                console.log(`error ${err}`)
            })
        }
}

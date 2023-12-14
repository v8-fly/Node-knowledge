console.log("This is amazing Hardik")

// button block
const buttonold = document.getElementById("getData")
const buttonNew = document.getElementById("getDatanew")

const myDiv = document.getElementById("new")
buttonold.addEventListener("click", () => {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", "/getdataold", true)

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Handle a successful response
        const newHTML = xhr.responseText

        // Update the current page's HTML with the new content
        document.documentElement.innerHTML = newHTML
      } else {
        // Handle other responses or errors
        console.error("Error:", xhr.statusText)
      }
    }
  }

  xhr.send()
})

buttonNew.addEventListener("click", () => {
  // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest()

  // Configure it with the request type (POST) and the URL
  xhr.open("POST", "http://localhost:9000/getdatanew", true)

  // Set the content type for the request (application/json in this case)
  xhr.setRequestHeader("Content-Type", "application/json")

  // Define a callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 3) {
      if (xhr.status == 200) {
        // Process the received data
        var responseData = JSON.parse(xhr.responseText)
        myDiv.innerHTML = responseData?.message
        console.log(responseData)
      } else {
        // Handle errors
        console.error("POST request failed with status:", xhr.status)
      }
    }
  }

  // Create the data to be sent in the request body (assuming JSON data)
  var postData = {
    key1: "value1",
    key2: "value2",
  }

  // Convert the data to JSON format
  var jsonData = JSON.stringify(postData)

  // Send the POST request with the data in the request body
  xhr.send(jsonData)
})

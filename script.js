// Get the modal
const modal = document.getElementById("myModal");
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    // Validate if the click have the the modal we expect
    if (event.target === modal) {
        // Don't display the modal
        modal.style.display = "none";
    }
}

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
// Add an event click for the span
span?.addEventListener('click', () => {
    // Don't display the modal
    modal.style.display = "none";
});

// Get the loginForm and add an event for the submit click
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get values from the email and password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Clear previous error messages
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';
    document.getElementById('wrongCredentials').innerText = '';

    // Validate if the email and password have value
    if (email && password) {
        checkAccount(email, password);
    }


});

// Get the registerForm and add an event for submit click
document.getElementById('registerForm')?.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Clear the error
    document.getElementById('email-error-register').innerText = '';

    // Get the values from the form
    const name = document.getElementById('name-register').value;
    const email = document.getElementById('email-register').value;
    const password = document.getElementById('password-register').value;

    /*
    * Create an object with the data field on form
    * the object should have key: value, but if the variables have the same name
    * as the the field we want, we can just add the name of it
    */
    const obj = { email, name, password };

    // Call the function with the created object
    createAccount(obj);
});

// Here we have a ternary condition, almost the same as an normal if, but with true or false
document.getElementById('account-name')
    ? document.getElementById('account-name').innerHTML = localStorage.getItem('name')
    : '';

// Function that redirects to the index
function _goToLogin() {
    window.location.href = 'index.html';
}

// Function that redirects to the index and clear the sessionValid from sessionStorage
function _logout() {
    sessionStorage.removeItem('sessionValid');
    window.location.href = 'index.html';
}
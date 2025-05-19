const DB_NAME = "MyDB";
const STORE_NAME = "Login";
let db;
// Start's the DB
const request = indexedDB.open(DB_NAME, 1);

/*
* When the DB start's we create the table with the data we want,
* In this case I used the email to be my key for searching,
* That means every time I want to search for a user I'll use the email
*/
request.onupgradeneeded = function (event) {
    let db = event.target.result;
    if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {keyPath: 'email', autoIncrement: true});
    }
};

request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Database created successfully!");
};

request.onerror = function (event) {
    console.error("Error when trying to open the database:", event.target.error);
};


/**
 * Create a new account
 * @param {object} account 
 */
function createAccount(account) {
    let transaction = db.transaction(STORE_NAME, "readwrite");
    let storeAccount = transaction.objectStore(STORE_NAME);

    // Verify if the account already exists
    let checkRequest = storeAccount.get(account.email);

    checkRequest.onsuccess = function () {
        if (checkRequest.result) {
            // Account already exists
            document.getElementById('email-error-register').innerText = 'Account already exists!';
            console.log("Error: Account already exists.");
        } else {
            // Create a new object with auto-incrementing ID
            let newAccount = {
                email: account.email,
                name: account.name,
                password: account.password
            };

            // Add the newAccount object to the DB
            let request = storeAccount.add(newAccount);

            // Create promise to wait until we have the data from DB
            Promise.all([request])
                .then(() => {
                    // Remove all the data inside the form and shows the message of success in console
                    document.getElementById('registerForm').reset();
                    modal.style.display = "flex";
                    console.log("Account added successfully!")
                })
                .catch((error) => console.error("Error adding account:", error));
        }
    };
    // Check's if an error occur when trying to request data from DB
    checkRequest.onerror = (event) => console.error("Error checking account:", event.target.error);
}

/**
 * Checks if the account is valid and if exist's
 * @param {string} email 
 * @param {string} password 
 */
function checkAccount(email, password) {

    let transaction = db.transaction(STORE_NAME, "readwrite");
    let storeAccount = transaction.objectStore(STORE_NAME);

    // Verify if the account already exists
    let checkRequest = storeAccount.get(email);

    checkRequest.onsuccess = function () {
        Promise.all([request])
            .then(() => {
                // Check if the email and the password match
                if(checkRequest.result.email === email && checkRequest.result.password === password) {
                    localStorage.setItem('name', checkRequest.result.name);
                    sessionStorage.setItem('sessionValid', 'true');
                    console.log("Account founded successfully!")
                    window.location.href = 'home.html';
                } else { // If doesn't match we sent and error to the HTML
                    document.getElementById('wrongCredentials').innerText = 'Wrong credentials!';
                }
            })
            .catch((error) => { // In case of an error from the DB, the account doesn't exist and send an error to the HTML
                document.getElementById('wrongCredentials').innerText = 'Account don\'t exist';
                console.error("Error retrieving account:", error);
            });
    };

    checkRequest.onerror = (event) => console.error("Error checking account:", event.target.error);
}



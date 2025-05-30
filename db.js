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
        db.createObjectStore(STORE_NAME, { keyPath: 'email', autoIncrement: true });
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
    const adminEmail = 'dinisjorge37@gmail.com';
    const adminPassword = 'admin123';

    // Verificar se é admin diretamente
    if (email === adminEmail && password === adminPassword) {
        sessionStorage.setItem('sessionValid', 'true');
        localStorage.setItem('name', 'Admin');
        window.location.href = 'stock.html';
        return;
    }

    // Se não for admin, procurar no IndexedDB
    let transaction = db.transaction(STORE_NAME, "readwrite");
    let storeAccount = transaction.objectStore(STORE_NAME);
    let checkRequest = storeAccount.get(email);

    checkRequest.onsuccess = function () {
        const user = checkRequest.result;

        if (user && user.email === email && user.password === password) {
            localStorage.setItem('name', user.name);
            sessionStorage.setItem('sessionValid', 'true');
            console.log("Conta encontrada com sucesso!");
            window.location.href = 'Inicio.html';
        } else {
            document.getElementById('wrongCredentials').innerText = 'Credenciais erradas!';
        }
    };

    checkRequest.onerror = function (event) {
        console.error("Erro ao verificar conta:", event.target.error);
        document.getElementById('wrongCredentials').innerText = 'Erro ao aceder à conta.';
    };
}



const form = document.querySelector('.login-form');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio normal do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Credenciais predefinidas
    const userEmail = 'dinisserra2015@gmail.com';
    const userPassword = '12345';
    const adminEmail = 'dinisjorge37@gmail.com';
    const adminPassword = 'admin123';

    if (email === userEmail && password === userPassword) {
        window.location.href = 'stock.html'; // Redireciona para a página principal
    } else if (email === adminEmail && password === adminPassword) {
        localStorage.setItem('isAdminLoggedIn', 'true'); // Indica que o admin está logado
        window.location.href = 'admin.html'; // Redireciona para a página de administração
    }
});
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const promiseForm = document.querySelector('.form');

promiseForm.addEventListener("submit", processSubmit);

function processSubmit(event) { 
    event.preventDefault();
    const userPromise = new Promise(executorFunction);
    userPromise.then(promiseSucceeded)
        .catch(promiseFailed);

}


function executorFunction(pass, fail) { 
    const fulfillmentState = document.querySelector('input[name="state"]:checked');
    const fulfillmentTime = Number(document.querySelector('input[name=delay]').value);
    if (fulfillmentState.value === "fulfilled") { 
        setTimeout(()=> pass(fulfillmentTime), fulfillmentTime);
    }
    else
        setTimeout(() => fail(fulfillmentTime), fulfillmentTime);
}

function promiseSucceeded(delay) { 
    iziToast.success({
          title: 'Success',
          message: `Fulfilled promise in ${delay}ms`,
          position: 'topRight'
                });
    }

function promiseFailed(delay) { 
    iziToast.warning({
          title: 'Failure!',
          message: `Rejected promise in ${delay}ms`,
          position: 'topRight'
                });
    }
window.onload = function () {
    let form = document.getElementsByTagName("form")[0];

    form.onsubmit = () => {
        alert("Payment done!!");
    };
};
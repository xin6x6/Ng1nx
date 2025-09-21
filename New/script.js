document.addEventListener('DOMContentLoaded', function(){

});

const confirmNotification = document.getElementById('confirmNotification');
const notification = document.querySelector('.notification-container');
confirmNotification.addEventListener('click', function(){
    notification.style.display = 'none';
})
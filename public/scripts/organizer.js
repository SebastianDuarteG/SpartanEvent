document.addEventListener("DOMContentLoaded", function () {
    let newEventBtn = id("newEventBtn");
    let newEventForm = id("newEventForm");

    newEventBtn.addEventListener("click", function () {
        newEventForm.style.display = "block";
    });

    let saveEventBtn = id("saveEventBtn");
    saveEventBtn.addEventListener("click", function (e) {
        e.preventDefault();
        submitForm();
    });

    let cancelBtn = id("cancelBtn");
    cancelBtn.addEventListener("click", function (e) {
        newEventForm.reset();
        newEventForm.style.display = "none";
    });

    let deleteButtons = document.querySelectorAll(".delete-event-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            let eventId = button.dataset.eventId;
            deleteEvent(eventId);
        });
    });

});

function submitForm() {
    let formData = new FormData(id("newEventForm"));
    let jsonBody = JSON.stringify(Object.fromEntries(formData));
    let orgId = window.location.pathname.split('/').pop();
    fetch("/SpartanEvent/OrganizerEvents/" + orgId + "/newEvent", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: jsonBody
    })
        .then(reload)
        .catch(alert);
}

function reload() {
    location.reload();
}

function id(idName) {
    return document.getElementById(idName);
}

function deleteEvent(eventId) {
    fetch("/SpartanEvent/OrganizerEvents/deleteEvent/" + eventId, {
        method: "DELETE",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })
        .then(reload)
        .catch(alert);
}

document.addEventListener('DOMContentLoaded', function(){
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('eventid');
    getEvent(eventId);
    getComments(eventId);

    function getEvent(eventId){
        const eventAPI = `http://localhost:8000/event/search`;
        fetch (eventAPI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'eventid': eventId,
            },
        })
        .then (response => {
            if (!response.ok){
                throw new Error ('Response not ok');
            }
            return response.json();
        })
        .then (data => {
            displayEvent (data);
            attachEventsEventListeners();
        })
        .catch (error => console.error('Could not get event', error));
    }

    function displayEvent (event){
        const eventContainer = document.getElementById('eventContainer');
        eventContainer.innerHTML = '';

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('eventTitle');
        const title = document.createElement('h2');
        title.textContent = `Title: ${event.title}`;
        titleDiv.appendChild (title);
        eventContainer.appendChild(titleDiv);

        const displayContainer = document.createElement('div');
        displayContainer.classList.add ('generalDisplay');
        
        const imageContainer = document.createElement('div');
        imageContainer.classList.add ('eventImg');
        const image= document.createElement('img');
        image.src= event.imgPath;
        image.alt="Event Image";
        imageContainer.appendChild(image);

        displayContainer.appendChild(imageContainer);

        const info = document.createElement('div');
        info.classList.add('dateTimeLocation');

        const date = document.createElement('p');
        date.classList.add('date');
        date.textContent = `Date: ${event.eventDate}`;
        info.appendChild(date);

        const time = document.createElement('p');
        time.classList.add('time');
        time.textContent = `Time: ${event.eventTime}`;
        info.appendChild(time);

        const location = document.createElement('p');
        location.classList.add('location');
        location.textContent = `Location: ${event.location}`;
        info.appendChild(location);

        displayContainer.appendChild(info);
        eventContainer.appendChild(displayContainer);

        const descContainer = document.createElement('div');
        descContainer.classList.add('eventDescription');

        const descTitle = document.createElement('p');
        descTitle.innerHTML = '<strong>Description:</strong>';
        descContainer.appendChild(descTitle);

        const descContent = document.createElement('p');
        descContent.textContent = event.description;
        descContainer.appendChild(descContent);
        eventContainer.appendChild(descContainer);

        const breakLine = document.createElement('br');
        eventContainer.appendChild(breakLine);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add ('btnDeleteEvent');
        deleteButton.eventid= event.eventId;
        deleteButton.textContent='DELETE';
        eventContainer.appendChild(deleteButton);

        const flagButton = document.createElement('button');
        flagButton.classList.add ('btnFlagEvent');
        flagButton.eventid= event.eventId;
        flagButton.textContent='FLAG';
        eventContainer.appendChild(flagButton);
        
    }


    function getComments(eventId){
        const commentAPI = `http://localhost:8000/comment/search`;
        fetch (commentAPI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'eventid': eventId,
            },
        })
        .then (response => {
            if (!response.ok){
                throw new Error ('Response not ok');
            }
            return response.json();
        })
        .then (data => {
            displayComment (data);
            attachCommentsEventListeners();
        })
        .catch (error => console.error('Could not get event', error));
    }

    function displayComment (comments){

        const commentsContainer= document.getElementById('commentContainer');
        commentsContainer.innerHTML='';

        const titleContainer= document.createElement('div');
        titleContainer.classList.add('eventTitle');

        const title= document.createElement('h2');
        title.textContent = 'Comments: ';
        titleContainer.appendChild(title);
        commentsContainer.appendChild(titleContainer);

        comments.forEach(comment => {
            const commentContainer= document.createElement('div');
            commentContainer.classList.add('eventDescription');

            const from= document.createElement('p');
            from.innerHTML= `<strong>From: ${comment.userName} </strong>`;
            commentContainer.appendChild(from);

            const commentContent = document.createElement('p');
            commentContent.textContent= comment.content;
            commentContainer.appendChild(commentContent);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add ('btnDeleteComment');
            deleteButton.userid= comment.userId;
            deleteButton.eventid= comment.eventId;
            deleteButton.textContent='DELETE';
            commentContainer.appendChild(deleteButton);

            const flagButton = document.createElement('button');
            flagButton.classList.add ('btnFlagComment');
            flagButton.userid= comment.userId;
            flagButton.textContent='FLAG';
            commentContainer.appendChild(flagButton);

            const breakLine = document.createElement('br');
            commentContainer.appendChild(breakLine);
            commentContainer.appendChild(breakLine);
            commentsContainer.appendChild(commentContainer);
        });

    }

    function attachEventsEventListeners (){
        const deleteEventButtons = document.querySelectorAll('.btnDeleteEvent');
        deleteEventButtons.forEach(deleteEventButton => {
            deleteEventButton.addEventListener('click', function (){
                const eventId = this.eventid;
                deleteEvent(eventId);
            });
        });

        const flagEventButtons = document.querySelectorAll('.btnFlagEvent');
        flagEventButtons.forEach(flagEventButton => {
            flagEventButton.addEventListener('click', function (){
                const eventId = this.eventid;
                flagEvent(eventId);
            });
        });
    }

    function attachCommentsEventListeners (){
        const deleteCommentButtons = document.querySelectorAll('.btnDeleteComment');
        deleteCommentButtons.forEach(deleteCommentButton => {
            deleteCommentButton.addEventListener('click', function (){
                const userId = this.userid;
                const eventId = this.eventid;
                deleteComment(userId, eventId);
            });
        });

        const flagCommentButtons = document.querySelectorAll('.btnFlagComment');
        flagCommentButtons.forEach(flagCommentButton => {
            flagCommentButton.addEventListener('click', function (){
                const userId = this.userid;
                flagComment(userId);
            });
        });
    }

    function deleteEvent(eventId) {
        if (!eventId){
            return;
        }

        const eventAPI = 'http://localhost:8000/event/delete';
        const reqBody = {
            eventId: eventId,
        }

        fetch (eventAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })
            .then(response=> {
                if (!response.ok){
                    throw new Error ('Response not ok');
                }
                return response.json();
            })
            .then (data =>{
            })
            .catch (error => console.error('Couldnt delete event',error));
        
    }

    function flagEvent(eventId) {
        if (!eventId){
            return;
        }

        const eventAPI = 'http://localhost:8000/event/flag';
        const reqBody = {
            eventId: eventId,
        }

        fetch (eventAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })
            .then(response=> {
                if (!response.ok){
                    throw new Error ('Response not ok');
                }
                return response.json();
            })
            .then (data =>{
            })
            .catch (error => console.error('Couldnt flag event',error));
        
    }

    function deleteComment(userId, eventId) {
        if (!userId|| !eventId){
            return;
        }

        const commentAPI = 'http://localhost:8000/comment/delete';
        const reqBody = {
            userId: userId,
            eventId: eventId,
        }

        fetch (commentAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })
            .then(response=> {
                if (!response.ok){
                    throw new Error ('Response not ok');
                }
                return response.json();
            })
            .then (data =>{
            })
            .catch (error => console.error('Couldnt delete comment',error));
        location.reload();
    }

    function flagComment(userId){
        if (!userId){
            return;
        }

        const commentAPI = 'http://localhost:8000/comment/flag';
        const reqBody = {
            userId: userId,
        }

        fetch (commentAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })
            .then(response=> {
                if (!response.ok){
                    throw new Error ('Response not ok');
                }
                return response.json();
            })
            .then (data =>{
            })
            .catch (error => console.error('Couldnt flag comment',error));
        
    }
});
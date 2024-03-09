document.addEventListener('DOMContentLoaded', function() {
    // Обработчик события выбора агентства
    document.getElementById('agencySelect').addEventListener('change', function() {
        var selectedAgency = this.value;
        var apiUrl = 'https://api.spacexdata.com/v4/crew';

        // Выполнение запроса к API SpaceX
        fetch(apiUrl)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(data) {
                // Отображение информации о космонавтах для выбранного агентства
                displayCrewMembers(data, selectedAgency);
            })
            .catch(function(error) {
                console.error('There was a problem with the fetch operation:', error);
            });
    });
});


function displayCrewMembers(crewData, selectedAgency) {
    var crewListContainer = document.getElementById('crewList');
    crewListContainer.innerHTML = ''; 

    crewData.forEach(function(crewMember) {
        if (crewMember.agency === selectedAgency) {
            var cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'mb-3');
            cardDiv.style.width = '16rem';

            var image = document.createElement('img');
            image.classList.add('card-img-center');
            image.src = crewMember.image;
            image.style.width = '100%'; 
            cardDiv.appendChild(image);

            var cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body');

            var nameElement = document.createElement('h5');
            nameElement.classList.add('card-title');
            nameElement.textContent = crewMember.name;
            cardBodyDiv.appendChild(nameElement);

            var agencyElement = document.createElement('p');
            agencyElement.classList.add('card-text');
            agencyElement.textContent = 'Agency: ' + crewMember.agency;
            cardBodyDiv.appendChild(agencyElement);

            var link = document.createElement('a');
            link.classList.add('btn', 'btn-primary');
            link.href = crewMember.wikipedia;
            link.textContent = 'More Info';
            link.target = '_blank';
            cardBodyDiv.appendChild(link);

            cardDiv.appendChild(cardBodyDiv);

            crewListContainer.appendChild(cardDiv);
        }
    });
}
    


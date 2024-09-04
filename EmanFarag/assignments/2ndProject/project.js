// script.js

/**
 * Function to create a new card element.
 * @returns {HTMLElement} The new card element.
 */
function createCard() {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;

    // Add unique content and ID to each card
    card.innerHTML = `
        <button class="remove-btn">X</button>
        <button class="rename-btn">Rename</button>
        <p class="card-name">New Card</p>
    `;

    // Add event listeners for drag events
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragover', handleDragOver);
    card.addEventListener('drop', handleDrop);
    card.addEventListener('dragend', handleDragEnd);

    // Add event listener for remove button
    card.querySelector('.remove-btn').addEventListener('click', function() {
        card.remove();
    });

    // Add event listener for rename button
    card.querySelector('.rename-btn').addEventListener('click', function() {
        const newName = prompt('Enter new name for the card:', card.querySelector('.card-name').textContent);
        if (newName) {
            card.querySelector('.card-name').textContent = newName;
        }
    });

    return card;
}

/**
 * Function to handle the drag start event.
 * @param {Event} e - The drag event.
 */
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-id'));
    e.target.style.opacity = '0.4';
}

/**
 * Function to handle the drag over event.
 * @param {Event} e - The drag event.
 */
function handleDragOver(e) {
    e.preventDefault(); // Necessary to allow dropping
}

/**
 * Function to handle the drop event.
 * @param {Event} e - The drop event.
 */
function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggedElement = document.querySelector(`[data-id='${id}']`);
    const dropTarget = e.target.closest('.card-container');

    if (dropTarget) {
        dropTarget.appendChild(draggedElement);
    }
}

/**
 * Function to handle the drag end event.
 * @param {Event} e - The drag event.
 */
function handleDragEnd(e) {
    e.target.style.opacity = '1';
}

/**
 * Function to add a new card to the dashboard.
 */
function addCard() {
    const cardContainer = document.getElementById('cardContainer');
    const newCard = createCard();
    cardContainer.appendChild(newCard);
}

// Event listener for the 'Add Card' button
document.getElementById('addCardBtn').addEventListener('click', addCard);

// Adding drag-and-drop support for the card container
const cardContainer = document.getElementById('cardContainer');
cardContainer.addEventListener('dragover', handleDragOver);
cardContainer.addEventListener('drop', handleDrop);
document.addEventListener('DOMContentLoaded', () => {
    const widgetContainer = document.getElementById('widgetContainer');
    const addWidgetBtn = document.getElementById('addWidgetBtn');

    let draggedWidget = null;

    // Load saved widgets from localStorage
    loadWidgets();

    // Function to create a new weather widget
    function createWeatherWidget(id, content = "Sunny, 25°C") {
        const widget = document.createElement('div');
        widget.classList.add('widget');
        widget.setAttribute('draggable', 'true');
        widget.setAttribute('id', `widget-${id}`);

        widget.innerHTML = `
            <div class="widget-header">
                <button class="remove-widget">X</button>
            </div>
            <div class="widget-content">
                <h3>Weather</h3>
                <p>${content}</p>
            </div>
        `;

        addWidgetEvents(widget);
        widgetContainer.appendChild(widget);
    }

    // Function to create a new clock widget
    function createClockWidget(id) {
        const widget = document.createElement('div');
        widget.classList.add('widget');
        widget.setAttribute('draggable', 'true');
        widget.setAttribute('id', `widget-${id}`);

        widget.innerHTML = `
            <div class="widget-header">
                <button class="remove-widget">X</button>
            </div>
            <div class="widget-content">
                <h3>Clock</h3>
                <p id="clock-${id}"></p>
            </div>
        `;

        addWidgetEvents(widget);
        widgetContainer.appendChild(widget);

        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            document.getElementById(`clock-${id}`).innerText = timeString;
        }

        setInterval(updateClock, 1000);
        updateClock(); // Initial call to display time immediately
    }

    // Function to create a new notes widget
    function createNotesWidget(id, savedNote = "") {
        const widget = document.createElement('div');
        widget.classList.add('widget');
        widget.setAttribute('draggable', 'true');
        widget.setAttribute('id', `widget-${id}`);

        widget.innerHTML = `
            <div class="widget-header">
                <button class="remove-widget">X</button>
            </div>
            <div class="widget-content">
                <h3>Notes</h3>
                <textarea id="note-${id}" rows="5" style="width: 100%;">${savedNote}</textarea>
            </div>
        `;

        addWidgetEvents(widget);
        widgetContainer.appendChild(widget);

        document.getElementById(`note-${id}`).addEventListener('input', function() {
            saveWidgets(); // Save note content when it's changed
        });
    }

    // Function to add common events to each widget
    function addWidgetEvents(widget) {
        widget.querySelector('.remove-widget').onclick = () => {
            widget.remove();
            saveWidgets();
        };
        widget.addEventListener('dragstart', handleDragStart);
        widget.addEventListener('dragover', handleDragOver);
        widget.addEventListener('drop', handleDrop);
        widget.addEventListener('dragenter', handleDragEnter);
        widget.addEventListener('dragleave', handleDragLeave);
        widget.addEventListener('dragend', handleDragEnd); // Reset after dragging
    }

    // Handle adding new widgets
    addWidgetBtn.addEventListener('click', () => {
        const widgetType = prompt("Enter widget type: weather, clock, or notes");
        const widgetCount = document.querySelectorAll('.widget').length + 1;
        switch (widgetType) {
            case 'weather':
                createWeatherWidget(widgetCount);
                break;
            case 'clock':
                createClockWidget(widgetCount);
                break;
            case 'notes':
                createNotesWidget(widgetCount);
                break;
            default:
                alert("Unknown widget type!");
        }
        saveWidgets();
    });

    // Drag-and-drop functions
    function handleDragStart(e) {
        draggedWidget = e.target;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', draggedWidget.outerHTML);
        draggedWidget.classList.add('dragging');
    }

    function handleDragEnter(e) {
        e.preventDefault();
        if (e.target !== draggedWidget && e.target.classList.contains('widget')) {
            e.target.classList.add('drag-over');
        }
    }

    function handleDragLeave(e) {
        if (e.target.classList.contains('widget')) {
            e.target.classList.remove('drag-over');
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDrop(e) {
        e.preventDefault();
        if (e.target !== draggedWidget && e.target.classList.contains('widget')) {
            e.target.classList.remove('drag-over');
            widgetContainer.insertBefore(draggedWidget, e.target.nextSibling);
            saveWidgets();
        }
    }

    function handleDragEnd(e) {
        draggedWidget.classList.remove('dragging');
        draggedWidget = null;
        saveWidgets(); // Save the new order
    }

    // Function to save widget order and content to localStorage
    function saveWidgets() {
        const widgetData = [];
        document.querySelectorAll('.widget').forEach(widget => {
            const id = widget.id;
            const type = widget.querySelector('h3').innerText.toLowerCase();
            let content = "";
            if (type === "weather") {
                content = widget.querySelector('p').innerText;
            } else if (type === "notes") {
                content = widget.querySelector('textarea').value;
            }
            widgetData.push({ id, type, content });
        });
        localStorage.setItem('widgets', JSON.stringify(widgetData));
    }

    // Function to load widgets from localStorage
    function loadWidgets() {
        const savedWidgets = JSON.parse(localStorage.getItem('widgets'));
        if (savedWidgets) {
            savedWidgets.forEach(widget => {
                const { id, type, content } = widget;
                if (type === "weather") {
                    createWeatherWidget(id, content);
                } else if (type === "clock") {
                    createClockWidget(id);
                } else if (type === "notes") {
                    createNotesWidget(id, content);
                }
            });
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const modal = document.getElementById('taskModal');
    const addTaskBtn = document.querySelector('.add-task');
    const closeModalBtn = document.querySelector('.close-modal');
    const taskForm = document.getElementById('taskForm');
    const taskList = document.querySelector('.task-list');
    const tasksSection = document.querySelector('.tasks-section');
    const calendarSection = document.querySelector('.calendar-section');
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    let currentDisplayDate = new Date();

    // Update current time and date
    function updateDateTime() {
        const now = new Date();
        
        // Update day
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        document.querySelector('.day').textContent = days[now.getDay()];
        
        // Update date
        const date = now.getDate();
        const month = now.toLocaleString('default', { month: 'short' }).toUpperCase();
        document.querySelector('.date .number').textContent = `${date}.${now.getMonth() + 1}`;
        document.querySelector('.date .month').textContent = month;
        
        // Update times
        const nyTime = new Date().toLocaleString('en-US', {
            timeZone: 'Africa/Freetown',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        const ukTime = new Date().toLocaleString('en-US', {
            timeZone: 'Europe/London',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        
        const timeElements = document.querySelectorAll('.time-zones .time span:first-child');
        timeElements[0].textContent = nyTime;
        timeElements[1].textContent = ukTime;
    }

    // Function to create task card
    function createTaskCard(title, description, priority) {
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${priority}-priority`;
        taskCard.innerHTML = `
            <div class="task-content">
                <div class="task-header">
                    <h3 class="task-title">${title}</h3>
                    <div class="task-actions">
                        <button class="edit-btn">✎</button>
                        <button class="delete-btn">🗑️</button>
                    </div>
                </div>
                <p class="task-description">${description}</p>
                <div class="task-priority">
                    <span class="priority-label ${priority}">${priority}</span>
                </div>
            </div>
        `;

        // Add edit functionality
        const editBtn = taskCard.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            // Get current values
            const titleElement = taskCard.querySelector('.task-title');
            const descriptionElement = taskCard.querySelector('.task-description');
            const currentPriority = taskCard.classList.contains('high-priority') ? 'high' :
                                  taskCard.classList.contains('medium-priority') ? 'medium' : 'low';

            // Create input fields
            const titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.value = titleElement.textContent;
            titleInput.className = 'edit-input';

            const descriptionInput = document.createElement('textarea');
            descriptionInput.value = descriptionElement.textContent;
            descriptionInput.className = 'edit-input';

            // Create priority selector
            const prioritySelect = document.createElement('select');
            prioritySelect.className = 'edit-input';
            prioritySelect.innerHTML = `
                <option value="high" ${currentPriority === 'high' ? 'selected' : ''}>High</option>
                <option value="medium" ${currentPriority === 'medium' ? 'selected' : ''}>Medium</option>
                <option value="low" ${currentPriority === 'low' ? 'selected' : ''}>Low</option>
            `;

            // Replace text with input fields
            titleElement.replaceWith(titleInput);
            descriptionElement.replaceWith(descriptionInput);
            taskCard.querySelector('.task-priority').replaceWith(prioritySelect);

            // Change edit button to save button
            editBtn.textContent = '💾';
            editBtn.onclick = () => {
                // Create new task card with updated values
                const newCard = createTaskCard(
                    titleInput.value,
                    descriptionInput.value,
                    prioritySelect.value
                );
                
                // Replace old card with new one
                taskCard.replaceWith(newCard);
            };
        });

        // Add delete functionality
        const deleteBtn = taskCard.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                taskCard.remove();
            }
        });

        return taskCard;
    }

    // Format time to 12-hour format
    function formatTime(time) {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    }

    // Convert 12-hour time to 24-hour format
    function convertTo24Hour(time12h) {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    }

    // Update form submission handler
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const priority = document.querySelector('input[name="priority"]:checked').value;

        taskList.appendChild(createTaskCard(title, description, priority));
        
        taskForm.reset();
        modal.classList.remove('show');
    });

    // Modal controls
    addTaskBtn.addEventListener('click', () => modal.classList.add('show'));
    closeModalBtn.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
    });

    // Add calendar navigation handlers
    prevMonthBtn.addEventListener('click', () => {
        currentDisplayDate.setMonth(currentDisplayDate.getMonth() - 1);
        generateCalendarDays(currentDisplayDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDisplayDate.setMonth(currentDisplayDate.getMonth() + 1);
        generateCalendarDays(currentDisplayDate);
    });

    // Update the navigation buttons event listener
    const navButtons = document.querySelectorAll('nav button:not(.add-task)');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            if (button.textContent === 'Calendar') {
                tasksSection.style.display = 'none';
                calendarSection.style.display = 'block';
                generateCalendarDays(new Date()); // Generate calendar when switching to calendar view
            } else {
                tasksSection.style.display = 'block';
                calendarSection.style.display = 'none';
            }
        });
    });

    // Initialize time updates
    updateDateTime();
    setInterval(updateDateTime, 60000);

    // Initialize calendar
    generateCalendarDays(new Date());
});

// Add these helper functions at the top of your file
function getMonthName(month) {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return months[month];
}

function getDayName(day) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
}

// Add this function to generate calendar days
function generateCalendarDays(date = new Date()) {
    const calendarDays = document.querySelector('.calendar-days');
    calendarDays.innerHTML = ''; // Clear existing days

    // Get current date info
    const currentDate = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    // Update month navigation
    document.querySelector('.prev-month-label').textContent = getMonthName(currentMonth - 1 < 0 ? 11 : currentMonth - 1);
    document.querySelector('.current-month-label').textContent = getMonthName(currentMonth);
    document.querySelector('.next-month-label').textContent = getMonthName(currentMonth + 1 > 11 ? 0 : currentMonth + 1);

    // Generate 3 days starting from current date
    for (let i = 0; i < 3; i++) {
        const dayDate = new Date(currentYear, currentMonth, currentDate + i);
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        dayElement.innerHTML = `
            <span class="day-label">${getDayName(dayDate.getDay())}</span>
            <span class="date-number">${dayDate.getDate()}</span>
            <span class="month-label">${getMonthName(dayDate.getMonth())}</span>
            <div class="time-slots">
                <div class="time-slot">
                    <span class="time">9 AM</span>
                    <div class="add-event">+</div>
                </div>
                <div class="time-slot">
                    <span class="time">12 PM</span>
                    <div class="add-event">+</div>
                </div>
                <div class="time-slot">
                    <span class="time">3 PM</span>
                    <div class="add-event">+</div>
                </div>
            </div>
        `;

        calendarDays.appendChild(dayElement);
    }
}

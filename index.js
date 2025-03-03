document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const modal = document.getElementById('taskModal');
    const addTaskBtn = document.querySelector('.add-task');
    const closeModalBtn = document.querySelector('.close-modal');
    const taskForm = document.getElementById('taskForm');
    const taskList = document.querySelector('.task-list');
    const tasksSection = document.querySelector('.tasks-section');
    const calendarSection = document.querySelector('.calendar-section');

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
            timeZone: 'America/New_York',
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

    // Modal controls
    addTaskBtn.addEventListener('click', () => {
        modal.classList.add('show');
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Format time to 12-hour format
    function formatTime(time) {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    }

    // Handle form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('taskTitle').value;
        const startTime = document.getElementById('startTime').value;
        const duration = document.getElementById('duration').value;
        const endTime = document.getElementById('endTime').value;

        // Create new task card
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card meeting';
        taskCard.innerHTML = `
            <div class="task-content">
                <h3>${title}</h3>
                <div class="time-details">
                    <div class="start">
                        <span class="time">${formatTime(startTime)}</span>
                        <span class="label">Start</span>
                    </div>
                    <div class="duration">${duration} Min</div>
                    <div class="end">
                        <span class="time">${formatTime(endTime)}</span>
                        <span class="label">End</span>
                    </div>
                </div>
            </div>
        `;

        // Add task to list
        taskList.appendChild(taskCard);
        
        // Reset form and close modal
        taskForm.reset();
        modal.classList.remove('show');
    });

    // Navigation buttons
    const navButtons = document.querySelectorAll('nav button:not(.add-task)');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Toggle view based on button clicked
            if (button.textContent === 'Calendar') {
                tasksSection.style.display = 'none';
                calendarSection.style.display = 'block';
            } else {
                tasksSection.style.display = 'block';
                calendarSection.style.display = 'none';
            }
        });
    });

    // Initialize time updates
    updateDateTime();
    setInterval(updateDateTime, 60000);
});

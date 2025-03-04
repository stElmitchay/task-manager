# Task Manager Workshop

A modern task management application built with vanilla JavaScript, designed for teaching JavaScript fundamentals through hands-on learning.

## Project Overview

This task manager features:
- Task creation with priority levels
- Dynamic calendar view
- Task editing and deletion
- Modern, responsive design

## Project structure
  ```
task-manager/
├── index.html # Main HTML structure
├── styles.css # Styling
├── index.js # Application logic
└── README.md # Documentation
```

## Step-by-Step Implementation

### 1. HTML Structure (index.html)

```[<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Task Manager</title>
<link rel="stylesheet" href="styles.css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body>
<!-- Main container -->
<div class="container">
<!-- Navigation -->
<header>
<nav>
<button class="active">Today</button>
<button>Calendar</button>
<button class="add-task">+</button>
</nav>
</header>
<main>
<!-- Date Display Section -->
<div class="date-display">
<!-- Date details here -->
</div>
<!-- Tasks Section -->
<div class="tasks-section">
<div class="section-header">
<h2>Today's tasks</h2>
</div>
<div class="task-list">
<!-- Tasks will be added here dynamically -->
</div>
</div>
<!-- Calendar Section -->
<div class="calendar-section" style="display: none;">
<!-- Calendar content -->
</div>
</main>
</div>
<!-- Task Modal -->
<div class="modal" id="taskModal">
<!-- Modal content -->
</div>
</body>
</html>](url)
```

### 2. Styling (styles.css)

Key CSS concepts covered:
- CSS Variables
- Flexbox
- Grid
- Transitions
- Responsive Design

```
css
:root {
--primary-bg: #ffffff;
--task-yellow: #E7B75F;
--task-gray: #D9D9D9;
--text-primary: #1A1A1A;
}
/ Base styles /
{
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: 'Inter', sans-serif;
}
/ Container styles /
.container {
width: 100%;
max-width: 480px;
background: var(--primary-bg);
border-radius: 32px;
padding: 1.5rem;
}
/ Task card styles /
.task-card {
border-radius: 16px;
padding: 1.5rem;
margin-bottom: 1rem;
}
/ Priority styles /
.high-priority { background: #FFE2E2; }
.medium-priority { background: #FFF4E2; }
.low-priority { background: #E2FFE2; }
/ More styles... /
```


### 3. JavaScript Implementation (index.js)

Key JavaScript concepts:
1. DOM Manipulation
2. Event Handling
3. Date Operations
4. Dynamic UI Updates

```
javascript
document.addEventListener('DOMContentLoaded', () => {
// DOM Elements
const modal = document.getElementById('taskModal');
const addTaskBtn = document.querySelector('.add-task');
const taskList = document.querySelector('.task-list');
// Task Creation
function createTaskCard(title, description, priority) {
const taskCard = document.createElement('div');
taskCard.className = task-card ${priority}-priority;
// Task card implementation...
}
// Form Handling
taskForm.addEventListener('submit', (e) => {
e.preventDefault();
// Form submission logic...
});
// Calendar Functions
function generateCalendarDays(date = new Date()) {
// Calendar generation logic...
}
// Initialize
updateDateTime();
setInterval(updateDateTime, 60000);
generateCalendarDays(new Date());
});
```


## Workshop Instructions

### Part 1: Setting Up (30 minutes)
1. Create project structure
2. Set up HTML boilerplate
3. Link CSS and JavaScript files

### Part 2: Building the UI (45 minutes)
1. Implement navigation
2. Create task list structure
3. Style task cards
4. Add modal form

### Part 3: Core Functionality (60 minutes)
1. Task creation
2. Task editing
3. Task deletion
4. Priority system

### Part 4: Calendar View (45 minutes)
1. Calendar structure
2. Dynamic date generation
3. Month navigation
4. Time slots

## Learning Objectives

After completing this workshop, participants will understand:
- DOM manipulation
- Event handling
- Form processing
- Date operations
- State management
- UI/UX principles

## Extensions

Participants can enhance the application by:
1. Adding local storage
2. Implementing task categories
3. Adding due dates
4. Creating task filters
5. Adding user authentication

## Resources

- [MDN Web Docs](https://developer.mozilla.org)
- [JavaScript.info](https://javascript.info)
- [CSS-Tricks](https://css-tricks.com)

## Notes

- Code is commented for learning purposes
- Focus on JavaScript fundamentals
- Encourage experimentation
- Built for hands-on learning

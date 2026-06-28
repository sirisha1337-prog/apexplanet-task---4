/* =========================================================
   TASK 4 — TO-DO APPLICATION — todo.js
   ES6+, modular, event-delegated, LocalStorage-backed.
   ========================================================= */

(() => {
  'use strict';

  const STORAGE_KEY = 'apex-todo-tasks';
  const THEME_KEY   = 'apex-portfolio-theme';

  /* ---------- DOM refs ---------- */
  const form        = document.getElementById('todoForm');
  const input       = document.getElementById('todoInput');
  const list        = document.getElementById('todoList');
  const emptyState  = document.getElementById('todoEmpty');
  const searchInput = document.getElementById('todoSearch');
  const filterBar   = document.getElementById('todoFilters');
  const counter     = document.getElementById('todoCounter');
  const clearBtn    = document.getElementById('clearCompleted');
  const themeBtn    = document.getElementById('themeToggleTodo');
  const toTopBtn    = document.getElementById('toTop');

  /* ---------- State ---------- */
  let tasks      = [];          // [{id, text, completed}]
  let filter     = 'all';       // all | active | completed
  let searchTerm = '';

  /* ---------- Storage helpers (with error handling) ---------- */
  function loadTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error('Failed to load tasks from Local Storage:', err);
      return [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error('Failed to save tasks to Local Storage:', err);
    }
  }

  /* ---------- Utilities ---------- */
  const uid = () => `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---------- Core actions ---------- */
  function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    tasks.unshift({ id: uid(), text: trimmed, completed: false });
    saveTasks();
    render();
  }

  function deleteTask(id) {
    const el = list.querySelector(`[data-id="${id}"]`);
    if (el) {
      el.classList.add('removing');
      setTimeout(() => {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        render();
      }, 220);
    } else {
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      render();
    }
  }

  function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    saveTasks();
    render();
  }

  function startEdit(id) {
    const item = list.querySelector(`[data-id="${id}"]`);
    if (!item) return;
    item.classList.add('editing');
    const textEl = item.querySelector('.todo-text');
    const current = textEl.textContent;
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'todo-edit-input';
    editInput.value = current;
    editInput.maxLength = 120;
    textEl.replaceWith(editInput);
    editInput.focus();
    editInput.setSelectionRange(current.length, current.length);

    const commit = () => saveEdit(id, editInput.value);
    editInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') commit();
      if (e.key === 'Escape') render();
    });
    editInput.addEventListener('blur', commit);
  }

  function saveEdit(id, newText) {
    const trimmed = newText.trim();
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    if (trimmed) task.text = trimmed; // ignore empty edits, keep original
    saveTasks();
    render();
  }

  function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    render();
  }

  /* ---------- Filtering / searching ---------- */
  function getVisibleTasks() {
    return tasks.filter(t => {
      const matchesFilter =
        filter === 'all' ? true :
        filter === 'active' ? !t.completed :
        t.completed;
      const matchesSearch = t.text.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }

  /* ---------- Render ---------- */
  function render() {
    const visible = getVisibleTasks();

    list.innerHTML = visible.map(task => `
      <li class="todo-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
        <button class="todo-check" data-action="toggle" aria-label="Mark complete">${task.completed ? '✓' : ''}</button>
        <span class="todo-text">${escapeHTML(task.text)}</span>
        <div class="todo-actions">
          <button class="edit-btn" data-action="edit" aria-label="Edit task">✏️</button>
          <button class="save-btn" data-action="save" aria-label="Save task">💾</button>
          <button class="delete-btn" data-action="delete" aria-label="Delete task">🗑️</button>
        </div>
      </li>
    `).join('');

    emptyState.hidden = visible.length !== 0;

    const activeCount = tasks.filter(t => !t.completed).length;
    counter.textContent = `${activeCount} task${activeCount === 1 ? '' : 's'} left`;
  }

  /* ---------- Event wiring (delegation) ---------- */
  function initFormSubmit() {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      try {
        addTask(input.value);
        input.value = '';
        input.focus();
      } catch (err) {
        console.error('Error adding task:', err);
      }
    });
  }

  function initListDelegation() {
    list.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if (!btn) return;
      const item = btn.closest('.todo-item');
      const id = item?.dataset.id;
      if (!id) return;

      switch (btn.dataset.action) {
        case 'toggle': toggleComplete(id); break;
        case 'delete': deleteTask(id); break;
        case 'edit':   startEdit(id); break;
        case 'save': {
          const editInput = item.querySelector('.todo-edit-input');
          if (editInput) saveEdit(id, editInput.value);
          break;
        }
      }
    });
  }

  function initSearch() {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      render();
    });
  }

  function initFilters() {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      filter = btn.dataset.filter;
      [...filterBar.children].forEach(b => b.classList.toggle('active', b === btn));
      render();
    });
  }

  function initClearCompleted() {
    clearBtn.addEventListener('click', clearCompleted);
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.dataset.theme = saved || (prefersDark ? 'dark' : 'light');
    themeBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
      document.body.dataset.theme = next;
      try { localStorage.setItem(THEME_KEY, next); } catch (err) { console.warn(err); }
    });
  }

  function initScrollToTop() {
    if (!toTopBtn) return;
    window.addEventListener('scroll', () => {
      toTopBtn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    tasks = loadTasks();
    initTheme();
    initFormSubmit();
    initListDelegation();
    initSearch();
    initFilters();
    initClearCompleted();
    initScrollToTop();
    render();
  });
})();

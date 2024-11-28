const checkbox = document.getElementById('checkbox');
const theme = localStorage.getItem('theme');

if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    checkbox.checked = true;
}

checkbox.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});
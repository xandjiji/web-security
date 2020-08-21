const element = document.querySelector('h3 span');

element.innerHTML = new URL(location).searchParams.get('search');
// Scrools header
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    window.scrollY > 20 ? header.classList.add('header-rolado') : header.classList.remove('header-rolado');
});

// Menu de tradução
const botaoTraducao = document.getElementById('traducao');
const menuIdiomas = document.querySelector('.menu-idiomas');

botaoTraducao.addEventListener('click', (event) => {
    event.stopPropagation(); 
    botaoTraducao.classList.toggle('ativo');
    menuIdiomas.classList.toggle('ativo');
});

document.addEventListener('click', () => {
    botaoTraducao.classList.remove('ativo');
    menuIdiomas.classList.remove('ativo');
});

const navMenu = document.getElementById('navMenu');
const menuMobile = document.querySelector('.menuMobile');

navMenu.addEventListener('click', (e) => {
    e.stopPropagation(); 
    menuMobile.classList.toggle('ativo');
});

document.addEventListener('click', () => {
    if (menuMobile.classList.contains('ativo')) {
        menuMobile.classList.remove('ativo');
    }
});


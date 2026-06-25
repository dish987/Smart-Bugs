/**
 * 1. SELEÇÃO DE ELEMENTOS
 */

// Header
const header = document.querySelector('header');

// Menus e Botões
const botaoTraducao = document.getElementById('traducao');
const menuIdiomas = document.querySelector('.menu-idiomas');
const navMenu = document.getElementById('navMenu');
const menuMobile = document.querySelector('.menuMobile');

// Imagem Sticky
const container = document.querySelector('.container-imagem');
const imagem = document.querySelector('.imagem-sticky');
const alturaHeader = 100; 


/**
 * 2. COMPORTAMENTOS DE SCROLL
 */

window.addEventListener('scroll', () => {
    // 2.1 Animação do Header
    if (window.scrollY > 20) {
        header.classList.add('header-rolado');
    } else {
        header.classList.remove('header-rolado');
    }

    if (container && imagem) {
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const imagemHeight = imagem.getBoundingClientRect().height;
        const limiteMaximo = containerHeight - imagemHeight;

        if (containerTop < alturaHeader) {
            let deslocamento = Math.abs(containerTop) + alturaHeader;

            if (containerTop >= 0) {
                deslocamento = alturaHeader - containerTop;
            }

            if (deslocamento > limiteMaximo) {
                imagem.style.transform = `translateY(${limiteMaximo}px)`;
            } else {
                imagem.style.transform = `translateY(${deslocamento}px)`;
            }
        } else {
            imagem.style.transform = `translateY(0px)`;
        }
    }
});


/**
 * 3. INTERAÇÃO DOS MENUS
 */

botaoTraducao.addEventListener('click', (event) => {
    event.stopPropagation(); 
    botaoTraducao.classList.toggle('ativo');
    menuIdiomas.classList.toggle('ativo');
});

navMenu.addEventListener('click', (e) => {
    e.stopPropagation(); 
    menuMobile.classList.toggle('ativo');
});

document.addEventListener('click', () => {
    botaoTraducao.classList.remove('ativo');
    menuIdiomas.classList.remove('ativo');
    menuMobile.classList.remove('ativo');
});


/**
 * 4. LÓGICA DE TRADUÇÃO
 */

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    let idiomaAtual = urlParams.get('lang');

    if (!idiomaAtual) {
        idiomaAtual = localStorage.getItem('site_lang');
    }

    if (!idiomaAtual || !traducoes[idiomaAtual]) {
        idiomaAtual = 'pt';
    }

    localStorage.setItem('site_lang', idiomaAtual);

    const pathname = window.location.pathname;
    const precisaVoltarPasta = !pathname.endsWith('index.html') && pathname !== '/';
    const prefixoPasta = precisaVoltarPasta ? '../' : '';

    let iconeSrc = `${prefixoPasta}img/header/traducao.png';`
    
    if (idiomaAtual === 'pt') {
        iconeSrc = `${prefixoPasta}img/header/pt-br.png`;
    } else if (idiomaAtual === 'en') {
        iconeSrc = `${prefixoPasta}img/header/en.png`;
    } else if (idiomaAtual === 'es') {
        iconeSrc = `${prefixoPasta}img/header/es.png`;
    }

    const iconeTraducao = document.querySelector('.icone-traducao');
    if (iconeTraducao) {
        iconeTraducao.src = iconeSrc;
    }

    // Tradução dos Elementos HTML (data-i18n)
    const elementosParaTraduciar = document.querySelectorAll('[data-i18n]');
    
    elementosParaTraduciar.forEach(elemento => {
        const chave = elemento.getAttribute('data-i18n'); 
        if (traducoes[idiomaAtual] && traducoes[idiomaAtual][chave]) {
            elemento.textContent = traducoes[idiomaAtual][chave];
        }
    });
});
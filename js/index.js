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
 * 3. INTERAÇÃO DOS MENUS (Mobile e Tradução)
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

    // Se não tiver idioma na URL, coloca PT como padrão
    if (!idiomaAtual || !traducoes[idiomaAtual]) {
        idiomaAtual = 'pt';
    }

    // Procura elementos com data-i18n e substitui pelo texto traduzido
    const elementosParaTraduzir = document.querySelectorAll('[data-i18n]');
    
    elementosParaTraduzir.forEach(elemento => {
        const chave = elemento.getAttribute('data-i18n'); 
        if (traducoes[idiomaAtual][chave]) {
            elemento.textContent = traducoes[idiomaAtual][chave];
        }
    });
});
'use strict'
const $ = window.$

const smoothScroll = () => {
    $('a[href*="#"]:not([href="#"])').click(function () {
        $('html, body').clearQueue()
        if (
            location.pathname.replace(/^\//, '') ===
            this.pathname.replace(/^\//, '') &&
            location.hostname === this.hostname
        ) {
            let target = $(this.hash)
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
            if (target.length) $('html, body').animate({ scrollTop: target.offset().top }, 1500)
        }
    })
}

const faqQuestions = document.querySelectorAll('section#faq .question')
const collapseFaq = () => {
    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            this.classList.toggle('active')
            const answer = this.nextElementSibling

            if (answer.style.maxHeight) answer.style.maxHeight = null
            else answer.style.maxHeight = answer.scrollHeight + 'px'
        })
    })
}
function resizeFaq () {
    faqQuestions.forEach(question => {
        const answer = question.nextElementSibling
        if (answer.style.maxHeight !== '') answer.style.maxHeight = answer.scrollHeight + 'px'
    })
}

document.querySelectorAll('.popup .overlay, .popup .close-popup').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.popup')
            .forEach(popup => { popup.style.display = 'none' })
    })
})

const FORM = {
    username: document.querySelector('section#contact .form #username'),
    email: document.querySelector('section#contact .form #email'),
    text: document.querySelector('section#contact .form #text')
}
const sendSupport = () => {
    if (!FORM.username.value || !FORM.text.value) alert('Please fill in every field before submitting.')
    else {
        document.getElementById('form-success').style.display = 'block'
        Object.values(FORM).forEach(value => { value.value = '' })
    }
}

window.addEventListener('load', function () {
    smoothScroll()
    collapseFaq()
})
window.addEventListener('resize', () => resizeFaq())

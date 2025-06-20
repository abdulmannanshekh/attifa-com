/*
==============================================================================
    প্রজেক্ট: আত-তিফা চিকিৎসালয় - অনলাইন শপ
    ফাইল: main.js (প্রধান ক্লায়েন্ট-সাইড জাভাস্ক্রিপ্ট)
    বর্ণনা: ওয়েবসাইটের সকল সাধারণ ইন্টারঅ্যাক্টিভিটি ও DOM ম্যানিপুলেশন।
    সংস্করণ: 1.0
==============================================================================
*/

// কঠোর মোড (Strict Mode) ব্যবহার করা, যা সাধারণ ভুলগুলো ধরতে সাহায্য করে।
'use strict';

/**
 * এই ফাংশনটি DOM সম্পূর্ণরূপে লোড হওয়ার পর কার্যকর হবে।
 * এটি নিশ্চিত করে যে সকল HTML এলিমেন্ট জাভাস্ক্রিপ্টের জন্য উপলব্ধ।
 */
document.addEventListener('DOMContentLoaded', function() {

    console.log('DOM সম্পূর্ণরূপে লোড হয়েছে। main.js কার্যকর হচ্ছে...');

    // --------------------------------------------------
    // ১. স্টিকি নেভিগেশন বার (Sticky Navigation Bar)
    // --------------------------------------------------
    const header = document.querySelector('.main-header');
    if (header) {
        const stickyPoint = header.offsetTop; // হেডারটি কখন স্টিকি হবে তার পজিশন

        window.onscroll = function() {
            if (window.pageYOffset > stickyPoint) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        };
    }
    
    // (এই ফিচারের জন্য style.css ফাইলে কিছু CSS যোগ করতে হবে)
    /*
    .main-header.sticky {
        position: fixed;
        top: 0;
        width: 100%;
        animation: slideDown 0.5s ease-out;
    }
    @keyframes slideDown {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
    }
    */


    // --------------------------------------------------
    // ২. মোবাইল মেন্যু টগল (বা হ্যামবার্গার মেন্যু)
    // --------------------------------------------------
    // (এর জন্য HTML এ একটি টগল বাটন যোগ করতে হবে)
    const navToggle = document.querySelector('.nav-toggle'); // যেমন: <button class="nav-toggle">☰</button>
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // (এর জন্য CSS প্রয়োজন হবে)
    /*
    .nav-toggle { display: none; }
    @media (max-width: 768px) {
        .nav-toggle { display: block; }
        .main-nav { display: none; }
        .main-nav.active { display: block; }
    }
    */
    

    // --------------------------------------------------
    // ৩. 'উপরে যান' বা 'Back to Top' বাটন
    // --------------------------------------------------
    // (HTML এ বাটনটি যোগ করতে হবে: <a href="#" id="backToTopBtn">↑</a>)
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) { // ৩০০ পিক্সেল স্ক্রল করার পর বাটনটি দেখাবে
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', function(event) {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' }); // স্মুথ স্ক্রলিং ইফেক্ট
        });
    }
    
    // --------------------------------------------------
    // ৪. ফর্ম ভ্যালিডেশন (উদাহরণ: কন্টাক্ট ফর্ম)
    // --------------------------------------------------
    const contactForm = document.getElementById('contactForm'); // যেমন: <form id="contactForm">

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name === '' || email === '' || message === '') {
                event.preventDefault(); // ফর্ম সাবমিট করা থেকে বিরত রাখা
                alert('অনুগ্রহ করে সকল ঘর পূরণ করুন।');
            } else if (!validateEmail(email)) {
                event.preventDefault();
                alert('অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা দিন।');
            }
        });
    }
    
    /**
     * একটি সহজ ইমেইল ভ্যালিডেশন ফাংশন (Regex ব্যবহার করে)
     * @param {string} email 
     * @returns {boolean}
     */
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // এখানে আরও অনেক ফাংশন যুক্ত করা যেতে পারে...

});
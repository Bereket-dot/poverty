// script.js
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link, .footer-column a[data-target]');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            
            if (!target) return;
            
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === target) {
                    page.classList.add('active');
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        });
    });
    
    const loanAmount = document.getElementById('loanAmount');
    const repaymentPeriod = document.getElementById('repaymentPeriod');
    const amountValue = document.getElementById('amountValue');
    const periodValue = document.getElementById('periodValue');
    const monthlyPayment = document.getElementById('monthlyPayment');
    const totalRepayment = document.getElementById('totalRepayment');
    
    function updateCalculator() {
        const amount = loanAmount.value;
        const period = repaymentPeriod.value;
        
        amountValue.textContent = `$${amount}`;
        periodValue.textContent = `${period} months`;
        
        const monthly = (amount / period).toFixed(2);
        monthlyPayment.textContent = `$${monthly}`;
        totalRepayment.textContent = `$${amount}`;
    }
    
    loanAmount.addEventListener('input', updateCalculator);
    repaymentPeriod.addEventListener('input', updateCalculator);
    
    updateCalculator();
    
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
    
    document.getElementById('findGroups').addEventListener('click', function() {
        const location = document.getElementById('location').value;
        if (!location) {
            alert('Please enter your location');
            return;
        }
        
        const mapPlaceholder = document.querySelector('.map-placeholder');
        mapPlaceholder.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <h3>Searching for VSLA groups near ${location}</h3>
            <p>Finding community savings groups in your area...</p>
        `;
        
        setTimeout(() => {
            mapPlaceholder.innerHTML = `
                <i class="fas fa-map-marker-alt"></i>
                <h3>VSLA Groups Found Near You</h3>
                <p>We found 4 active Village Savings and Loan Associations within 10km of ${location}</p>
                <div style="margin-top: 20px; text-align: left; width: 100%;">
                    <div style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee;">
                        <div>
                            <h4>Community Savers Group</h4>
                            <p>Meets every Tuesday at 6pm</p>
                        </div>
                        <a href="#" class="btn btn-primary" style="padding: 5px 10px;">
                            <i class="fas fa-info-circle"></i> Details
                        </a>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee;">
                        <div>
                            <h4>New Horizon VSLA</h4>
                            <p>Meets every Saturday at 10am</p>
                        </div>
                        <a href="#" class="btn btn-primary" style="padding: 5px 10px;">
                            <i class="fas fa-info-circle"></i> Details
                        </a>
                    </div>
                </div>
            `;
        }, 2000);
    });
    
    document.getElementById('startJourney').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.nav-link[data-target="jobs"]').click();
    });
    
    document.getElementById('joinCommunity').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.nav-link[data-target="community"]').click();
    });
    
    document.getElementById('helpFab').addEventListener('click', function() {
        alert("How can we help you today? Contact our support team at help@pathfinder.org or call +1 (800) 123-4567");
    });
    
    const signInModal = document.getElementById('signInModal');
    const registerModal = document.getElementById('registerModal');
    const signInBtn = document.getElementById('signInBtn');
    const registerBtn = document.getElementById('registerBtn');
    const closeModal = document.querySelectorAll('.close-modal');
    const showRegister = document.getElementById('showRegister');
    const showSignIn = document.getElementById('showSignIn');
    const signInForm = document.getElementById('signInForm');
    const registerForm = document.getElementById('registerForm');
    
    signInBtn.addEventListener('click', function() {
        signInModal.style.display = 'flex';
    });
    
    registerBtn.addEventListener('click', function() {
        registerModal.style.display = 'flex';
    });
    
    closeModal.forEach(btn => {
        btn.addEventListener('click', function() {
            signInModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });
    
    showRegister.addEventListener('click', function() {
        signInModal.style.display = 'none';
        registerModal.style.display = 'flex';
    });
    
    showSignIn.addEventListener('click', function() {
        registerModal.style.display = 'none';
        signInModal.style.display = 'flex';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === signInModal) {
            signInModal.style.display = 'none';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });
    
    signInForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real application, you would send this to a server
        alert('Sign in successful! Welcome back.');
        signInModal.style.display = 'none';
        
        // Reset form
        this.reset();
    });
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
        
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // In a real application, you would send this to a server
        alert('Registration successful! Welcome to Pathfinder.');
        registerModal.style.display = 'none';
        
        // Reset form
        this.reset();
    });
});
function toggleForm(formType) {
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');
    
    // Remove any existing transition classes
    signupForm.classList.remove('hidden', 'visible');
    signinForm.classList.remove('hidden', 'visible');
    
    // Force a reflow
    void signupForm.offsetWidth;
    void signinForm.offsetWidth;
    
    if (formType === 'signin') {
        signupForm.classList.add('hidden');
        signinForm.classList.add('visible');
    } else {
        signinForm.classList.add('hidden');
        signupForm.classList.add('visible');
    }
}

// Handle form submissions
document.getElementById('signup').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your signup logic here
    console.log('Sign up submitted');
});

document.getElementById('signin').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your signin logic here
    console.log('Sign in submitted');
}); 
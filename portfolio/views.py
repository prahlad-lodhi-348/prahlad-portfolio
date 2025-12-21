from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Feedback
from .forms import FeedbackForm

def home(request):
    feedbacks = Feedback.objects.all()[:6]  # Latest 6
    return render(request, 'home.html', {'feedbacks': feedbacks})

def contact(request):
    if request.method == 'POST':
        form = FeedbackForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, '✅ Thank you! Your message has been sent successfully!')
            return redirect('home')
    else:
        form = FeedbackForm()
    return render(request, 'contact.html', {'form': form})

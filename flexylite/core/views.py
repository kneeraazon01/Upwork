from django.shortcuts import render

# Create your views here.
def landingPageView(request):
    return render(request, "base.html")


def aboutView(request):
    return render(request, "core/about.html")

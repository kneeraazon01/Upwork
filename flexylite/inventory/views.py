from django.shortcuts import render

# Create your views here.
def productListView(request):
    return render(request, "base.html")

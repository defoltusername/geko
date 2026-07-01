from django.shortcuts import render
from django.http import HttpResponse

def get_products(request):
    return HttpResponse("Products")



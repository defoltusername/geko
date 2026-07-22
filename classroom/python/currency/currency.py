amount = float(input("Mutqagreq gumari chapy: "))
currency = input("Mutqagreq Arjuyty (AMD kan USD): ")

rate = 366

if currency == "AMD":
    print(amount / rate, "USD")
elif currency == "USD":
    print(amount * rate, "AMD")
else:
    print("anhayt arjuyt")
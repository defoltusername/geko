amount = float(input("Введите сумму: "))
currency = input("Введите валюту (AMD или USD): ")

rate = 385

if currency == "AMD":
    print(amount / rate, "USD")
elif currency == "USD":
    print(amount * rate, "AMD")
else:
    print("Неизвестная валюта")
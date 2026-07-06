class BankAccount:
    def __init__(self, owner):
        self.owner = owner
        self.balance = 0

    def deposit(self, amount):
        if amount <= 0:
            print("Սխալ գումար։")
        else:
            self.balance += amount
            print("Գումարը հաջողությամբ մուտքագրվեց։")

    def withdraw(self, amount):
        if amount <= 0:
            print("Սխալ գումար։")
        elif amount > self.balance:
            print("Բավարար գումար չկա։")
        else:
            self.balance -= amount
            print("Գումարը հաջողությամբ հանվեց։")

    def transfer(self, other_account, amount):
        if amount <= 0:
            print("Սխալ գումար։")
        elif amount > self.balance:
            print("Բավարար գումար չկա։")
        else:
            self.balance -= amount
            other_account.balance += amount
            print("Փոխանցումը կատարվեց։")

    def show_info(self):
        print(f"Անուն: {self.owner}")
        print(f"Մնացորդ: {self.balance}")


accounts = {}

while True:
    print("\n1 - Ստեղծել հաշիվ")
    print("2 - Մուտքագրել գումար")
    print("3 - Հանել գումար")
    print("4 - Փոխանցել գումար")
    print("5 - Ցույց տալ մեկ հաշիվ")
    print("6 - Ցույց տալ բոլոր հաշիվները")
    print("7 - Ջնջել հաշիվ")
    print("8 - Ցույց տալ ամենահարուստ հաճախորդին")
    print("9 - Ցույց տալ վիճակագրությունը")
    print("0 - Ելք")

    choice = input("Ընտրեք գործողությունը: ")

    if choice == "1":
        owner = input("Մուտքագրեք անունը: ")

        if owner in accounts:
            print("Այս անունով հաշիվ արդեն գոյություն ունի։")
        else:
            accounts[owner] = BankAccount(owner)
            print("Հաշիվը ստեղծվեց։")

    elif choice == "2":
        owner = input("Անուն: ")

        if owner not in accounts:
            print("Հաշիվը գոյություն չունի։")
        else:
            amount = float(input("Գումար: "))
            accounts[owner].deposit(amount)

    elif choice == "3":
        owner = input("Անուն: ")

        if owner not in accounts:
            print("Հաշիվը գոյություն չունի։")
        else:
            amount = float(input("Գումար: "))
            accounts[owner].withdraw(amount)

    elif choice == "4":
        sender = input("Ում հաշվից: ")
        receiver = input("Ում հաշվին: ")

        if sender not in accounts or receiver not in accounts:
            print("Հաշիվներից մեկը գոյություն չունի։")
        else:
            amount = float(input("Գումար: "))
            accounts[sender].transfer(accounts[receiver], amount)

    elif choice == "5":
        owner = input("Անուն: ")

        if owner in accounts:
            accounts[owner].show_info()
        else:
            print("Հաշիվը գոյություն չունի։")

    elif choice == "6":
        if len(accounts) == 0:
            print("Հաշիվներ չկան։")
        else:
            for account in accounts.values():
                print("-" * 20)
                account.show_info()

    elif choice == "7":
        owner = input("Անուն: ")

        if owner in accounts:
            del accounts[owner]
            print("Հաշիվը ջնջվեց։")
        else:
            print("Հաշիվը գոյություն չունի։")

    elif choice == "8":
        if len(accounts) == 0:
            print("Հաշիվներ չկան։")
        else:
            richest = max(accounts.values(), key=lambda x: x.balance)
            print("Ամենահարուստ հաճախորդը")
            richest.show_info()

    elif choice == "9":
        if len(accounts) == 0:
            print("Հաշիվներ չկան։")
        else:
            total = sum(acc.balance for acc in accounts.values())
            average = total / len(accounts)

            print(f"Հաշիվների քանակը: {len(accounts)}")
            print(f"Ընդհանուր գումարը: {total}")
            print(f"Միջին մնացորդը: {average:.2f}")

    elif choice == "0":
        print("Ծրագիրն ավարտվեց։")
        break

    else:
        print("Սխալ ընտրություն։")
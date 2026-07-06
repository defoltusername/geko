def average(grades):
    if len(grades) == 0:
        return None
    return sum(grades) / len(grades)


students = {}

while True:
    print("\n1 - Ավելացնել ուսանող")
    print("2 - Ավելացնել գնահատական")
    print("3 - Ցույց տալ բոլոր ուսանողներին")
    print("4 - Ցույց տալ վիճակագրությունը")
    print("5 - Նշել լավագույն ուսանողին")
    print("6 - Ջնջել ուսանող")
    print("7 - Ջնջել գնահատական")
    print("8 - Սորտավորել ուսանողներին ըստ միջինի")
    print("9 - Փնտրել միջինը ցածր ուսանողներ")
    print("0 - Ելք")

    choice = input("Ընտրեք գործողությունը: ")

    if choice == "1":
        name = input("Մուտքագրեք ուսանողի անունը: ")

        if name in students:
            print(f"{name} արդեն կա։")
        else:
            students[name] = []
            print(f"Նոր ուսանող {name} ավելացվեց։")

    elif choice == "2":
        name = input("Ուսանողի անունը: ")

        if name not in students:
            print("Ուսանողը չի գտնվել։")
        else:
            grade = int(input("Գնահատական: "))

            if 0 <= grade <= 100:
                students[name].append(grade)
                print(f"{name}-ին ավելացվեց գնահատական {grade}")
            else:
                print("Գնահատականը պետք է լինի 0-100։")

    elif choice == "3":
        if len(students) == 0:
            print("Ուսանողներ չկան։")
        else:
            for name, grades in students.items():
                avg = average(grades)

                if avg is None:
                    print(f"{name} -> {grades} -> Միջին: N/A")
                else:
                    print(f"{name} -> {grades} -> Միջին: {avg:.1f}")

    elif choice == "4":
        total_students = len(students)

        averages = [average(g) for g in students.values() if average(g) is not None]

        if len(averages) > 0:
            group_average = sum(averages) / len(averages)
        else:
            group_average = 0

        excellent = 0
        no_grades = 0

        for grades in students.values():
            avg = average(grades)

            if avg is None:
                no_grades += 1
            elif avg > 90:
                excellent += 1

        print("Ընդհանուր ուսանողներ:", total_students)
        print(f"Խմբի միջին գնահատականը: {group_average:.1f}")
        print("Գերազանցիկներ:", excellent)
        print("Ուսանողներ առանց գնահատականի:", no_grades)

    elif choice == "5":
        best_avg = -1
        best_students = []

        for name, grades in students.items():
            avg = average(grades)

            if avg is None:
                continue

            if avg > best_avg:
                best_avg = avg
                best_students = [name]
            elif avg == best_avg:
                best_students.append(name)

        if best_avg == -1:
            print("Գնահատականներ չկան։")
        else:
            print("Լավագույն ուսանող(ներ):")
            for name in best_students:
                print(f"{name} -> Միջին {best_avg:.1f}")

    elif choice == "6":
        name = input("Ուսանողի անունը: ")

        if name in students:
            del students[name]
            print(f"{name} ջնջվեց։")
        else:
            print("Ուսանողը չի գտնվել։")

    elif choice == "7":
        name = input("Ուսանողի անունը: ")

        if name not in students:
            print("Ուսանողը չի գտնվել։")
        elif len(students[name]) == 0:
            print(f"{name}-ը չունի գնահատականներ։")
        else:
            print(students[name])

            index = int(input("Մուտքագրեք ջնջվող գնահատականի համարը (1-ից): "))

            if 1 <= index <= len(students[name]):
                removed = students[name].pop(index - 1)
                print(f"{name}-ից ջնջվեց գնահատական {removed}")
            else:
                print("Սխալ համար։")

    elif choice == "8":
        sorted_students = sorted(
            students.items(),
            key=lambda x: average(x[1]) if average(x[1]) is not None else -1,
            reverse=True
        )

        print("Սորտավորված ցուցակ")

        i = 1
        for name, grades in sorted_students:
            avg = average(grades)

            if avg is None:
                print(f"{i}. {name} -> Միջին N/A")
            else:
                print(f"{i}. {name} -> Միջին {avg:.1f}")

            i += 1

    elif choice == "9":
        limit = float(input("Մուտքագրեք շեմը: "))

        print(f"Ուսանողներ միջին < {limit}:")

        found = False

        for name, grades in students.items():
            avg = average(grades)

            if avg is None:
                print(f"- {name} -> Միջին N/A")
                found = True
            elif avg < limit:
                print(f"- {name} -> Միջին {avg:.1f}")
                found = True

        if not found:
            print("Չգտնվեց։")

    elif choice == "0":
        print("Ծրագիրն ավարտվեց։")
        break

    else:
        print("Սխալ ընտրություն։")
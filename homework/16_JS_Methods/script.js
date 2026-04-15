const result = transactions
    .map(t => {
        const info = t.info.trim().toLowerCase();
        const [valueStr, currency] = t.amount.split(" ");

        return {
            ...t,
            info,
            amount: {
                value: parseFloat(valueStr),
                currency
            }
        };
    })
    .filter((t, index, arr) =>
        index === arr.findIndex(el =>
            el.info === t.info &&
            el.amount.value === t.amount.value &&
            el.amount.currency === t.amount.currency &&
            el.date === t.date
        )
    )
    .map(t => {
        let { value, currency } = t.amount;

        if (currency === "RUB") {
            value = +(value / 90).toFixed(2);
            currency = "USD";
        }

        return {
            ...t,
            amount: { value, currency }
        };
    });

const grouped = result.reduce((acc, t) => {
    (acc[t.info] = acc[t.info] || []).push(t);
    return acc;
}, {});

const totalUSD = +result
    .reduce((sum, t) => sum + t.amount.value, 0)
    .toFixed(2);

console.log("Grouped:", grouped);
console.log("Total USD:", totalUSD);
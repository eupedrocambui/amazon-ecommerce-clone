// formats 2095 to 20.95
export function formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2);
}

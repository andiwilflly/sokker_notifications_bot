
export default async function(page) {
    await page.goto('https://sokker.org/api/transfer/observed?filter[includeEnded]=false&filter[limit]=200&filter[offset]=0');

    const transfers = await page.evaluate(() => JSON.parse(window.document.querySelector('pre').innerHTML));
    return transfers.transfers
        .filter(transfer => transfer.deadline.secondsLeft <= 300) // 5 minutes
        .map(transfer => {
        return `
${transfer.player.info.name.full}
https://sokker.org/player/PID/${transfer.player.id}
buyer:     https://sokker.org/team/teamID/${transfer.buyer.id} (${transfer.buyer.name})
time left: ${Math.round(transfer.deadline.secondsLeft/ 60)} minutes
bid:       ${transfer.price.bid.value} ${transfer.price.bid.currency}
        `;
    });

    // return {
    //     link: `https://sokker.org/player/PID/${transfer.player.id}`,
    //     timeLeft: transfer.deadline.secondsLeft,
    //     buyer: `https://sokker.org/team/teamID/${transfer.buyer.id}`,
    //     buyerName: transfer.buyer.name,
    //     playerName: transfer.player.info.name.full,
    //     playerValue: `${transfer.player.info.value.value} ${transfer.player.info.value.currency}`,
    //     bid: `${transfer.price.bid.value} ${transfer.price.bid.currency}`,
    // };
};
const processPayment = async (paymentDetails, amount) => {
    return new Promise((resolve, reject) => {
        // Simulate delay
        setTimeout(() => {
            const { cardNumber, expiry, cvv } = paymentDetails;

            // Basic validation
            if (!cardNumber || !expiry || !cvv) {
                return reject(new Error('Invalid payment details'));
            }

            // Simulate failure for specific card number
            if (cardNumber === '0000 0000 0000 0000') {
                return reject(new Error('Payment declined'));
            }

            // Success
            resolve({
                id: 'txn_' + Math.random().toString(36).substr(2, 9),
                status: 'succeeded',
            });
        }, 1000);
    });
};

module.exports = { processPayment };

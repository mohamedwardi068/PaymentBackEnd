/**
 * Service to manage Order lifecycle and transitions
 */

const VALID_TRANSITIONS = {
    'created': ['paid', 'failed'],
    'paid': ['refunded'],
    // 'failed' and 'refunded' are terminal states for this logic
};

/**
 * Validates if a transition from currentStatus to nextStatus is allowed.
 * @param {string} currentStatus 
 * @param {string} nextStatus 
 * @returns {boolean}
 * @throws {Error} if transition is invalid
 */
const validateTransition = (currentStatus, nextStatus) => {
    if (currentStatus === nextStatus) {
        return true;
    }

    const aloudNextStatuses = VALID_TRANSITIONS[currentStatus] || [];

    if (!aloudNextStatuses.includes(nextStatus)) {
        throw new Error(`Invalid status transition from "${currentStatus}" to "${nextStatus}"`);
    }

    return true;
};

module.exports = {
    validateTransition,
    STATUSES: {
        CREATED: 'created',
        PAID: 'paid',
        FAILED: 'failed',
        REFUNDED: 'refunded'
    }
};

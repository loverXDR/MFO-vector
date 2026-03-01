/**
 * SOLID principles applied in V2 functionality:
 * 
 * 1. OCP & DIP: Added `PromoInterestStrategy` without modifying the core `LoanModel`. 
 *    The system now dynamically applies 0% interest if the term is <= 7 days.
 */

class InterestStrategy {
    getDailyRate() { throw new Error("Must be implemented"); }
}

class StandardInterestStrategy extends InterestStrategy {
    getDailyRate() { return 0.008; } // 0.8%
}

class PromoInterestStrategy extends InterestStrategy {
    getDailyRate() { return 0.008; } // Base rate is 0.8%

    // Extends the strategy idea to handle the promo context
    calculateTotalInterest(amount, term) {
        if (term <= 7) {
            return 0; // 0% up to 7 days
        } else {
            // After 7 days, standard rate applies for all days, or just the remainder? 
            // Typical MFO promo: if you breach 7 days, you pay for the whole period. 
            // Let's implement that logic as it's common.
            return amount * this.getDailyRate() * term;
        }
    }
}

// --- MODEL ---
class LoanModel {
    /** @param {PromoInterestStrategy} interestStrategy */
    constructor(interestStrategy) {
        this.interestStrategy = interestStrategy;
        this.amount = 10000;
        this.term = 7;
    }

    setAmount(value) { this.amount = parseInt(value, 10); }
    setTerm(value) { this.term = parseInt(value, 10); }

    getAmount() { return this.amount; }
    getTerm() { return this.term; }

    getTotalRepayment() {
        const totalInterest = this.interestStrategy.calculateTotalInterest(this.amount, this.term);
        return this.amount + totalInterest;
    }

    getPromoSaving() {
        if (this.term <= 7) {
            // Return how much they are saving due to 0% promo
            return this.amount * this.interestStrategy.getDailyRate() * this.term;
        }
        return 0;
    }

    getReturnDate() {
        const date = new Date();
        date.setDate(date.getDate() + this.term);
        return date.toLocaleDateString('ru-RU');
    }
}

// --- VIEW ---
class LoanView {
    constructor() {
        this.amountInput = document.getElementById('amount');
        this.termInput = document.getElementById('term');

        this.amountValDisplay = document.getElementById('amount-val');
        this.termValDisplay = document.getElementById('term-val');

        this.resAmount = document.getElementById('res-amount');
        this.resDate = document.getElementById('res-date');
        this.resTotal = document.getElementById('res-total');

        this.promoNotice = document.getElementById('promo-notice');
        this.promoSaving = document.getElementById('promo-saving');

        this.submitBtn = document.getElementById('submit-loan');
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('ru-RU').format(Math.round(value)) + ' ₽';
    }

    bindEvents(amountHandler, termHandler, submitHandler) {
        if (this.amountInput) {
            this.amountInput.addEventListener('input', (e) => {
                amountHandler(e.target.value);
                this.updateSliderTrack(e.target);
            });
            this.termInput.addEventListener('input', (e) => {
                termHandler(e.target.value);
                this.updateSliderTrack(e.target);
            });
            this.submitBtn.addEventListener('click', () => submitHandler());
        }
    }

    updateSliderTrack(slider) {
        const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, var(--accent-orange) ${percentage}%, rgba(0,0,0,0.05) ${percentage}%)`;
    }

    render(amount, term, totalRepayment, returnDate, promoSaving) {
        if (!this.amountInput) return; // Guard for pages without calculator

        this.amountValDisplay.textContent = new Intl.NumberFormat('ru-RU').format(amount);
        this.termValDisplay.textContent = term;

        this.resAmount.textContent = this.formatCurrency(amount);
        this.resDate.textContent = returnDate;
        this.resTotal.textContent = this.formatCurrency(totalRepayment);

        if (promoSaving > 0) {
            this.promoNotice.classList.add('visible');
            this.promoSaving.textContent = this.formatCurrency(promoSaving);
            this.resTotal.style.color = '#4CAF50'; // Green text when promo is active
        } else {
            this.promoNotice.classList.remove('visible');
            this.resTotal.style.color = 'var(--accent-orange)';
        }
    }

    initSliders() {
        if (this.amountInput) {
            this.updateSliderTrack(this.amountInput);
            this.updateSliderTrack(this.termInput);
        }
    }

    initAnimations() {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }
}

// --- CONTROLLER ---
class LoanController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindEvents(
            this.handleAmountChange.bind(this),
            this.handleTermChange.bind(this),
            this.handleSubmit.bind(this)
        );

        this.view.initAnimations();
        this.view.initSliders();
        this.updateView();
    }

    handleAmountChange(value) { this.model.setAmount(value); this.updateView(); }
    handleTermChange(value) { this.model.setTerm(value); this.updateView(); }

    handleSubmit() {
        const originalText = this.view.submitBtn.textContent;
        this.view.submitBtn.textContent = "AI анализирует...";
        setTimeout(() => {
            this.view.submitBtn.textContent = "Одобрено!";
            this.view.submitBtn.style.background = "#4CAF50";
            setTimeout(() => {
                this.view.submitBtn.textContent = originalText;
                this.view.submitBtn.style.background = "";
            }, 3000);
        }, 1500);
    }

    updateView() {
        this.view.render(
            this.model.getAmount(),
            this.model.getTerm(),
            this.model.getTotalRepayment(),
            this.model.getReturnDate(),
            this.model.getPromoSaving()
        );
    }
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    const promoStrategy = new PromoInterestStrategy();
    const model = new LoanModel(promoStrategy);
    const view = new LoanView();
    const controller = new LoanController(model, view);
});

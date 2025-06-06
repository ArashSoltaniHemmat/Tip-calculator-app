 const billInput = document.getElementById('bill');
    const peopleInput = document.getElementById('people');
    const customTip = document.getElementById('customTip');
    const tipButtons = document.querySelectorAll('.tip-btn');
    const tipAmountEl = document.getElementById('tipAmount');
    const totalEl = document.getElementById('total');
    const resetBtn = document.getElementById('resetBtn');

    let tipPercent = 0;

    function calculate() {
      const bill = parseFloat(billInput.value);
      const people = parseInt(peopleInput.value);

      if (bill > 0 && people > 0) {
        const tipTotal = bill * tipPercent / 100;
        const tipPerPerson = tipTotal / people;
        const totalPerPerson = (bill + tipTotal) / people;

        tipAmountEl.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalEl.textContent = `$${totalPerPerson.toFixed(2)}`;
        resetBtn.disabled = false;
      }
    }

    tipButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tipButtons.forEach(b => b.classList.remove('bg-teal-600'));
        btn.classList.add('bg-teal-600');
        tipPercent = parseInt(btn.textContent);
        customTip.value = '';
        calculate();
      });
    });

    customTip.addEventListener('input', () => {
      tipButtons.forEach(b => b.classList.remove('bg-teal-600'));
      tipPercent = parseFloat(customTip.value);
      calculate();
    });

    billInput.addEventListener('input', calculate);
    peopleInput.addEventListener('input', calculate);

    resetBtn.addEventListener('click', () => {
      billInput.value = '';
      peopleInput.value = '';
      customTip.value = '';
      tipAmountEl.textContent = '$0.00';
      totalEl.textContent = '$0.00';
      tipPercent = 0;
      tipButtons.forEach(b => b.classList.remove('bg-teal-600'));
      resetBtn.disabled = true;
    });
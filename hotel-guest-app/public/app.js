const guestForm = document.querySelector('#guest-form');
const checkInInput = document.querySelector('#check-in');
const checkOutInput = document.querySelector('#check-out');
const successMessage = document.querySelector('#success-message');

const fields = {
	fullName: {
		input: document.querySelector('#full-name'),
		message: document.querySelector('#full-name-error'),
		empty: 'Informe o nome completo.'
	},
	email: {
		input: document.querySelector('#email'),
		message: document.querySelector('#email-error'),
		empty: 'Informe o e-mail.'
	},
	phone: {
		input: document.querySelector('#phone'),
		message: document.querySelector('#phone-error'),
		empty: 'Informe o telefone.'
	},
	checkIn: {
		input: checkInInput,
		message: document.querySelector('#check-in-error'),
		empty: 'Informe a data de check-in.'
	},
	checkOut: {
		input: checkOutInput,
		message: document.querySelector('#check-out-error'),
		empty: 'Informe a data de check-out.'
	},
	guests: {
		input: document.querySelector('#guests'),
		message: document.querySelector('#guests-error'),
		empty: 'Informe o número de hóspedes.'
	}
};

function formatDateAsInputValue(date) {
	return date.toISOString().split('T')[0];
}

function showError(field, message) {
	field.input.classList.toggle('invalid', Boolean(message));
	field.input.setAttribute('aria-invalid', String(Boolean(message)));
	field.message.textContent = message;
}

function validateForm() {
	let isValid = true;

	Object.values(fields).forEach((field) => showError(field, ''));

	Object.values(fields).forEach((field) => {
		if (!field.input.value.trim()) {
			showError(field, field.empty);
			isValid = false;
		}
	});

	if (fields.email.input.value && !fields.email.input.validity.valid) {
		showError(fields.email, 'Digite um e-mail válido.');
		isValid = false;
	}

	if (fields.phone.input.value && fields.phone.input.value.replace(/\D/g, '').length < 10) {
		showError(fields.phone, 'Digite um telefone válido.');
		isValid = false;
	}

	if (fields.guests.input.value && (fields.guests.input.value < 1 || fields.guests.input.value > 20)) {
		showError(fields.guests, 'O número deve estar entre 1 e 20.');
		isValid = false;
	}

	if (checkInInput.value && checkOutInput.value && checkOutInput.value <= checkInInput.value) {
		showError(fields.checkOut, 'O check-out deve ser posterior ao check-in.');
		isValid = false;
	}

	return isValid;
}

const today = formatDateAsInputValue(new Date());
checkInInput.min = today;
checkOutInput.min = today;

checkInInput.addEventListener('change', () => {
	checkOutInput.min = checkInInput.value || today;
	if (checkOutInput.value && checkOutInput.value <= checkInInput.value) {
		checkOutInput.value = '';
	}
});

guestForm.addEventListener('submit', (event) => {
	event.preventDefault();
	successMessage.textContent = '';

	if (!validateForm()) {
		const firstInvalidField = guestForm.querySelector('.invalid');
		firstInvalidField?.focus();
		return;
	}

	successMessage.textContent = 'Hóspede registrado com sucesso!';
	guestForm.reset();
	checkInInput.min = today;
	checkOutInput.min = today;
});

Object.values(fields).forEach((field) => {
	field.input.addEventListener('input', () => {
		showError(field, '');
		successMessage.textContent = '';
	});
});

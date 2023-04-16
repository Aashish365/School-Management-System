export function isValidEmail(email) {
	let reason = "";
	// Regular expression to match valid email address
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	// Test the email against the regex\
	const status = emailRegex.test(email);

	if (!status) {
		reason = "Invalid email address";
	}
	return { status: status, reason: reason };
}

export function isValidPassword(password, confirm_password) {
	// Check if the password is a non-empty string
	let result = {};

	if (!password) {
		result.reason = "Password cannot be empty";
		result.status = 0;
	} else {
		// Check if the password length is at least 8 characters
		if (password === confirm_password) {
			if (password.length < 8) {
				result.reason = "Password should be at least 8 characters long";
				result.status = 0;
			} else {
				// Check if the password contains at least one lowercase letter, one uppercase letter, one digit, and one special character
				const hasLowercase = /[a-z]/.test(password);
				const hasUppercase = /[A-Z]/.test(password);
				const hasDigit = /\d/.test(password);
				const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
					password
				);

				if (!hasLowercase || !hasUppercase || !hasDigit || !hasSpecialChar) {
					result.reason =
						"Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character";
					result.status = 0;
				} else {
					// If all checks pass, the password is valid
					result.reason = "";
					result.status = 1;
				}
			}
		} else {
			result.status = 0;
			result.reason = "Password and Confirm Password is not Matching";
		}
	}

	return result;
}

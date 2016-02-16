function Fraction (numerator, denominat) {
	var s = this;

	s.n = numerator;
	s.d = denominat || 1;

	s.resolve();
}

Fraction.getCommonDivisor = function (n1, n2) {
	var r = n2, n2 = n1;

	do {
		n1 = n2;
		n2 = r;
		
		r = n1 % n2;
	} while (r != 0);

	return n2;
};

Fraction.prototype.resolve = function () {
	var s = this, cd = Fraction.getCommonDivisor(s.n, s.d);

	if (cd != 0) {
		s.n /= cd;
		s.d /= cd;
	}
	
	if (s.d < 0) {
		s.n *= -1;
		s.d *= -1;
	}
};

Fraction.prototype.add = function (f) {
	var s = this;

	if (s.d == f.d) {
		s.n += f.n
	} else {
		s.n = s.n * f.d + f.n * s.d;
		s.d *= f.d;
	}

	s.resolve();

	return s;
};

Fraction.prototype.subtract = function (f) {
	var s = this;

	if (s.d == f.d) {
		s.n -= f.n
	} else {
		s.n = s.n * f.d - f.n * s.d;
		s.d *= f.d;
	}

	s.resolve();

	return s;
};

Fraction.prototype.multiply = function (f) {
	var s = this;
	
	s.n *= f.n;
	s.d *= f.d;

	s.resolve();

	return s;
};

Fraction.prototype.divide = function (f) {
	var s = this;

	s.n *= f.d;
	s.d *= f.n;

	s.resolve();

	return s;
};

Fraction.prototype.toString = function () {
	var s = this, result = s.n;

	if (s.d != 1) {
		result += " / " + s.d;
	}

	return result.toString();
};

Fraction.prototype.clone = function () {
	return new Fraction(this.n, this.d);
};

Fraction.prototype.is = function (f) {
	return (this.n == f.n && this.d == f.d);
};
var levelData = [
	{
		n : [1, 500],
		d : [1, 1],
		formularTxt : "Y = X + X",
		getResult : function (x) {
			return x.add(x);
		}
	},
	
	{
		n : [3, 30],
		d : [1, 4],
		formularTxt : "Y = X + X + X",
		getResult : function (x) {
			return x.multiply(new Fraction(3));
		}
	},

	{
		n : [5, 50],
		d : [1, 1],
		formularTxt : "Y = X × X",
		getResult : function (x) {
			return x.multiply(x);
		}
	},
	
	{
		n : [3, 20],
		d : [2, 4],
		formularTxt : "Y = X × X + (3 / 4) × X",
		getResult : function (x) {
			return x.clone().multiply(x).add((new Fraction(3, 4)).multiply(x));
		}
	},

	{
		n : [1, 50],
		d : [1, 1],
		formularTxt : "Y = (2 × X × X) + (X / 2)",
		getResult : function (x) {
			return (new Fraction(2)).multiply(x).multiply(x).add(x.divide(new Fraction(2)));
		}
	},

	{
		n : [1, 20],
		d : [1, 10],
		formularTxt : "Y = 5 × X + X × (X / 4)",
		getResult : function (x) {
			return (new Fraction(5)).multiply(x).add(x.clone().multiply(x.clone().divide(new Fraction(4))));
		}
	},
	
	{
		n : [1, 10],
		d : [1, 4],
		formularTxt : "Y = X × X × X + 3 / 4",
		getResult : function (x) {
		 	return x.clone().multiply(x).multiply(x).add(new Fraction(3, 4));
		}
	},
	
	{
		n : [-5, 5],
		d : [-5, 4],
		formularTxt : "Y = X × X + X × (1 / 2) + 2",
		getResult : function (x) {
			return x.clone().multiply(x).add(x.multiply(new Fraction(1, 2))).add(new Fraction(2));
		}
	},
	
	{
		n : [-10, -5],
		d : [-5, 2],
		formularTxt : "2 × Y = X × X + 10 / 11",
		getResult : function (x) {
			return x.multiply(x).add(new Fraction(10, 11)).divide(new Fraction(2));
		}
	}
];

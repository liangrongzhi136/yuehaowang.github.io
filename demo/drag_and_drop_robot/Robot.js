function Robot () {
	var s = this;
	LExtends(s, LSprite, []);

	s.body = null;
	s.head = null;
	s.leftArm = null;
	s.rightArm = null;
	s.leftLeg = null;
	s.rightLeg = null;

	s.addBody();
	s.addHead();
	s.addArms();
	s.addLegs();

	partList = [
		{
			exec : s.body,
			part : [s.body.bodyLayer]
		},
		{
			exec : s.head,
			part : [s.head.faceLayer]
		},
		{
			exec : s.leftArm,
			part : [s.leftArm.part1, s.leftArm.part2]
		},
		{
			exec : s.rightArm,
			part : [s.rightArm.part1, s.rightArm.part2]
		},
		{
			exec : s.leftLeg,
			part : [s.leftLeg.part1, s.leftLeg.part2]
		},
		{
			exec : s.rightLeg,
			part : [s.rightLeg.part1, s.rightLeg.part2]
		}
	];
}

Robot.prototype.addBody = function () {
	var s = this;

	s.body = new Body(80, 100, 15);
	s.addChild(s.body);
};

Robot.prototype.addHead = function () {
	var s = this;

	s.head = new Head(40, 50);
	s.head.x = s.body.getWidth() / 2;
	s.body.addChild(s.head);
};

Robot.prototype.addArms = function () {
	var s = this, l = 60, r = 7.5;

	s.leftArm = new Limb(l, r, 90, 90, 60, 5);
	s.leftArm.x = r + 4;
	s.leftArm.y = r + 4;
	s.body.addChild(s.leftArm);

	s.rightArm = new Limb(l, r, -140, -140, -30, -5);
	s.rightArm.x = 76 - r;
	s.rightArm.y = r + 4;
	s.body.addChild(s.rightArm);
};

Robot.prototype.addLegs = function () {
	var s = this, l = 70, r = 7.5;

	s.leftLeg = new Limb(l, r, 70, -40, 80, 0);
	s.leftLeg.x = r + 3;
	s.leftLeg.y = 96 -r;
	s.body.addChild(s.leftLeg);

	s.rightLeg = new Limb(l, r, -60, 30, 0, 60);
	s.rightLeg.x = 76 - r;
	s.rightLeg.y = 96 -r;
	s.body.addChild(s.rightLeg);
};
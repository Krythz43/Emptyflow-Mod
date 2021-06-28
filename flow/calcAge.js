exports.id = 'calage';
exports.title = 'Calculate Age';
exports.version = '1.2.1';
exports.group = 'DATAX Test 1';
exports.author = 'Krithick';
exports.color = '#D770AD';
exports.icon = 'code';
exports.input = true;
exports.output = 1;
exports.options = {};
exports.readme = `# Specify the Date of Birth to calculate Age
`;

exports.html = `
<div class="padding">
	<div data-jc="textbox" data-jc-path="dob_column" class="m mt10">Name Column containing Date Of Birth</div>
</div>`;

exports.install = function(instance) {

	instance.on('data', function(flowdata, next) {
		var options = instance.options;
	});
};
